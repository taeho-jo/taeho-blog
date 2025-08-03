import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // URL에서 모든 쿼리 파라미터 추출
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')

  // 모든 파라미터들을 객체로 변환해서 로깅
  const allParams = Object.fromEntries(searchParams.entries())

  // 에러가 있는 경우
  if (error) {
    console.error('❌ GitHub OAuth 에러 발생!')
    return NextResponse.json(
      {
        success: false,
        error: error,
        error_description: errorDescription,
        message: 'GitHub OAuth 인증 중 에러가 발생했습니다.'
      },
      { status: 400 }
    )
  }

  // code가 없는 경우
  if (!code) {
    console.error('❌ GitHub에서 code를 받지 못했습니다!')
    return NextResponse.json(
      {
        success: false,
        message: 'GitHub에서 인증 코드를 받지 못했습니다.',
        received_params: allParams
      },
      { status: 400 }
    )
  }

  // 환경 변수 확인
  const clientId = process.env.OAUTH_CLIENT_ID
  const clientSecret = process.env.OAUTH_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    console.error('❌ GitHub OAuth 환경 변수가 설정되지 않았습니다!')
    return NextResponse.json(
      {
        success: false,
        message: 'GitHub OAuth 환경 변수가 설정되지 않았습니다.',
        missing: {
          client_id: !clientId,
          client_secret: !clientSecret
        }
      },
      { status: 500 }
    )
  }

  // GitHub에서 access_token 요청
  try {
    const tokenResponse = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          code: code
        })
      }
    )

    const tokenData = await tokenResponse.json()

    if (tokenData.error) {
      console.error('❌ GitHub 토큰 교환 실패!')
      return NextResponse.json(
        {
          success: false,
          github_error: tokenData.error,
          github_error_description: tokenData.error_description,
          message: 'GitHub에서 토큰 교환에 실패했습니다.'
        },
        { status: 400 }
      )
    }

    const accessToken: string = tokenData.access_token
    const tokenType: string = tokenData.token_type || 'bearer'

    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `${tokenType} ${accessToken}`
      }
    })

    const userData = await userResponse.json()

    if (userData.message === 'Bad credentials' || !userData.login) {
      console.error(
        'GitHub user data fetch error: Bad credentials or user data missing.'
      )
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid Access Token or user data.'
        },
        { status: 401 }
      )
    }

    const content = {
      token: accessToken,
      provider: 'github'
    }

    const responseBody = renderBody('success', content)

    // HTML 응답으로 결과 표시
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Login</title>
              ${responseBody}
      </head>
      <body></body>
      </html>
    `

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8'
      }
    })
  } catch (error) {
    console.error('❌ GitHub OAuth 처리 중 오류:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'GitHub OAuth 처리 중 서버 오류가 발생했습니다.',
        error: error instanceof Error ? error.message : '알 수 없는 오류'
      },
      { status: 500 }
    )
  }
}

function renderBody(
  status: string,
  content: {
    token: string
    provider: string
  }
) {
  return `
    <script>
      const receiveMessage = (message) => {
        window.opener.postMessage(
          'authorization:${content.provider}:${status}:${JSON.stringify(
            content
          )}',
          message.origin
        );

        window.removeEventListener("message", receiveMessage, false);
      }
      window.addEventListener("message", receiveMessage, false);

      window.opener.postMessage("authorizing:${content.provider}", "*");
    </script>
  `
}

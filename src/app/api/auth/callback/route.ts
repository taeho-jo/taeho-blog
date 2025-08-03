import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  if (!code) {
    return NextResponse.json({ error: 'No authorization code' }, { status: 400 })
  }

  try {
    // GitHub OAuth 토큰 교환
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.OAUTH_CLIENT_ID!,
        client_secret: process.env.OAUTH_CLIENT_SECRET!,
        code,
        state: state || '',
      }),
    })

    const tokenData = await tokenResponse.json()

    if (tokenData.error) {
      return NextResponse.json({ error: tokenData.error }, { status: 400 })
    }

    // Decap CMS로 토큰 전달하는 HTML 페이지
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Authorization Success</title>
        </head>
        <body>
          <script>
            // Decap CMS가 기다리고 있는 메시지 형식
            const receiveMessage = {
              token: '${tokenData.access_token}',
              provider: 'github'
            };
            
            // 부모 창(CMS)에 메시지 전달
            if (window.opener) {
              window.opener.postMessage(
                'authorization:github:success:' + JSON.stringify(receiveMessage), 
                window.location.origin
              );
              window.close();
            } else {
              // 팝업이 아닌 경우 리다이렉트
              window.location.href = '/admin';
            }
          </script>
          <p>Authorization successful. Redirecting...</p>
        </body>
      </html>
    `
    
    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    })
  } catch (error) {
    console.error('OAuth callback error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}
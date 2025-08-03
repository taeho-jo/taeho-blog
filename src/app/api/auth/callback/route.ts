import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  if (!code) {
    return NextResponse.json(
      { error: 'No authorization code' },
      { status: 400 }
    )
  }

  try {
    // GitHub OAuth 토큰 교환
    const tokenResponse = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          client_id: process.env.OAUTH_CLIENT_ID!,
          client_secret: process.env.OAUTH_CLIENT_SECRET!,
          code,
          state: state || ''
        })
      }
    )

    const tokenData = await tokenResponse.json()

    if (tokenData.error) {
      return NextResponse.json({ error: tokenData.error }, { status: 400 })
    }

    // Decap CMS로 토큰 전달하는 HTML 페이지
    const html = `<!DOCTYPE html>
<html>
<head>
  <title>Authorization Success</title>
</head>
<body>
  <script>
    console.log('Callback received, token:', '${tokenData.access_token}');
    
    // Decap CMS 표준 메시지 형식
    const authData = {
      token: '${tokenData.access_token}',
      provider: 'github'
    };
    
    function sendMessage() {
      if (window.opener) {
        console.log('Sending message to opener:', authData);
        
        // Decap CMS가 기대하는 정확한 메시지 형식
        const message = 'authorization:github:success:' + JSON.stringify(authData);
        window.opener.postMessage(message, '*');
        
        // 백업용 메시지들
        window.opener.postMessage(authData, '*');
        window.opener.postMessage({
          type: 'authorization',
          provider: 'github',
          token: '${tokenData.access_token}'
        }, '*');
        
        setTimeout(function() {
          window.close();
        }, 1000);
      } else {
        console.log('No opener window, redirecting...');
        window.location.href = '/admin';
      }
    }
    
    // DOM 로드 확인 및 메시지 전송
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', sendMessage);
    } else {
      sendMessage();
    }
  </script>
  <p>Authorization successful. Processing...</p>
</body>
</html>`

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' }
    })
  } catch (error) {
    console.error('OAuth callback error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}

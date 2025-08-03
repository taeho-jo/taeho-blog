import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  
  if (!code) {
    // 인증 시작: GitHub OAuth로 리다이렉트
    const clientId = process.env.OAUTH_CLIENT_ID
    const redirectUri = `${request.nextUrl.origin}/api/auth`
    const scope = 'repo,user'
    
    const authUrl = new URL('https://github.com/login/oauth/authorize')
    authUrl.searchParams.set('client_id', clientId!)
    authUrl.searchParams.set('redirect_uri', redirectUri)
    authUrl.searchParams.set('scope', scope)
    
    return NextResponse.redirect(authUrl.toString())
  }
  
  // 토큰 교환 및 postMessage로 CMS에 전달
  try {
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
      }),
    })

    const tokenData = await tokenResponse.json()
    
    if (tokenData.error) {
      return NextResponse.json({ error: tokenData.error }, { status: 400 })
    }

    // Decap CMS로 토큰 전달하는 HTML
    const html = `<!DOCTYPE html>
<html>
<head>
  <title>Authentication Success</title>
</head>
<body>
  <script>
    const authData = {
      token: '${tokenData.access_token}',
      provider: 'github'
    };
    
    // 부모 창(CMS)에 메시지 전달
    if (window.opener) {
      window.opener.postMessage(
        'authorization:github:success:' + JSON.stringify(authData), 
        window.location.origin
      );
      window.close();
    } else {
      // 직접 접근시 CMS로 리다이렉트
      window.location.href = '/admin/index.html#/collections/posts';
    }
  </script>
  <p>Authentication successful. Redirecting...</p>
</body>
</html>`
    
    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' }
    })
    
  } catch (error) {
    console.error('OAuth error:', error)
    return NextResponse.redirect(`${request.nextUrl.origin}/admin?error=auth_failed`)
  }
}
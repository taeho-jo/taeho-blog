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
  
  // 토큰 교환 및 응답
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

    // Decap CMS가 기대하는 응답 형식
    return NextResponse.json({
      token: tokenData.access_token,
      provider: 'github'
    })
    
  } catch (error) {
    console.error('OAuth error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}
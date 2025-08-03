import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  // GitHub OAuth 파라미터
  const clientId = process.env.OAUTH_CLIENT_ID
  const redirectUri = `${request.nextUrl.origin}/api/auth/callback`
  const scope = 'repo,user'
  const state = searchParams.get('state') || Math.random().toString(36).substring(2, 15)

  if (!clientId) {
    return NextResponse.json({ error: 'OAuth not configured' }, { status: 500 })
  }

  // GitHub 인증 URL 생성
  const authUrl = new URL('https://github.com/login/oauth/authorize')
  authUrl.searchParams.set('client_id', clientId)
  authUrl.searchParams.set('redirect_uri', redirectUri)
  authUrl.searchParams.set('scope', scope)
  authUrl.searchParams.set('state', state)

  return NextResponse.redirect(authUrl.toString())
}
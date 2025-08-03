import { NextResponse } from 'next/server'

export async function GET() {
  // 환경 변수 확인
  const clientId = process.env.OAUTH_CLIENT_ID

  if (!clientId) {
    console.error('❌ OAUTH_CLIENT_ID 환경 변수가 설정되지 않았습니다.')
    return NextResponse.json(
      { error: 'Server configuration error: Missing GitHub Client ID' },
      { status: 500 }
    )
  }

  // OAuth 파라미터 설정
  const redirectUri = `https://jogak-jogak.vercel.app/api/auth/callback`
  const scope = 'repo, user, email'

  // GitHub OAuth URL 생성
  const authUrl = new URL('https://github.com/login/oauth/authorize')
  authUrl.searchParams.set('client_id', clientId)
  authUrl.searchParams.set('redirect_uri', redirectUri)
  authUrl.searchParams.set('scope', scope)

  return NextResponse.redirect(authUrl.toString())
}

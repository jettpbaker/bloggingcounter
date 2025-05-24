import { createClient } from '@openauthjs/openauth/client'

export async function onRequest(context) {
  const { request, env } = context
  const client = createClient({
    clientID: 'cloudflare-api',
    issuer: env.OPENAUTH_ISSUER,
    fetch: (input, init) => env.CloudflareAuth.fetch(input, init),
  })
  const url = new URL(request.url)
  const redirectURI = url.origin + '/auth/callback'
  console.log('redirectURI', redirectURI)

  try {
    const code = url.searchParams.get('code')
    const exchanged = await client.exchange(code, redirectURI)
    if (exchanged.err) throw new Error('Invalid code')
    const response = new Response(null, { status: 302, headers: {} })
    response.headers.set('Location', url.origin)
    setSession(response, {
      access: exchanged.tokens.access,
      refresh: exchanged.tokens.refresh,
    })
    return response
  } catch (e) {
    return new Response(e.toString())
  }
}

function setSession(response, { access, refresh }) {
  if (access) {
    response.headers.append(
      'Set-Cookie',
      `access_token=${access}; HttpOnly; SameSite=Strict; Path=/; Max-Age=2147483647`
    )
  }
  if (refresh) {
    response.headers.append(
      'Set-Cookie',
      `refresh_token=${refresh}; HttpOnly; SameSite=Strict; Path=/; Max-Age=2147483647`
    )
  }
}

import { createClient } from '@openauthjs/openauth/client'
import { subjects } from '@/lib/subjects'

export async function onRequest(context) {
  console.log('Running Auth')
  const { request, env } = context
  const client = createClient({
    clientID: 'cloudflare-api',
    issuer: env.OPENAUTH_ISSUER,
    fetch: (input, init) => env.CloudflareAuth.fetch(input, init),
  })
  const url = new URL(request.url)

  const cookies = new URLSearchParams(request.headers.get('cookie')?.replaceAll('; ', '&'))
  console.log('Cookies', cookies.get('access_token'), cookies.get('refresh_token'))
  console.log('All cookies', cookies)
  const verified = await client.verify(subjects, cookies.get('access_token'), {
    refresh: cookies.get('refresh_token') || undefined,
  })
  if (verified) {
    console.log(
      verified?.subject?.type,
      verified?.subject?.properties,
      verified?.refresh,
      verified?.access,
      verified
    )
  }
  if (verified.err) return Response.redirect(url.origin + '/auth/authorize', 302)
  const response = Response.json(verified.subject)
  if (verified.tokens)
    setSession(response, { access: verified.tokens.access, refresh: verified.tokens.refresh })
  return response
}

function setSession(response, { access, refresh }) {
  console.log('Setting session', access, refresh)
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

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

  console.log('Triggering authorize')
  return Response.redirect(await client.authorize(redirectURI, 'code').then((v) => v.url), 302)
}

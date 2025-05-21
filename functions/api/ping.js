export function onRequest(context) {
  return new Response(JSON.stringify({ message: 'pong' }), {
    headers: { 'Content-Type': 'application/json' },
  })
}

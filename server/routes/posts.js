import { Hono } from 'hono'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import DB from '../db/queries.js'

const posts = new Hono()

// Inject secrets into Clerk middleware
posts.use('*', (c, next) => {
  const secretKey = c.env.CLERK_SECRET_KEY
  const publishableKey = c.env.PUBLIC_CLERK_PUBLISHABLE_KEY
  return clerkMiddleware({ secretKey, publishableKey })(c, next)
})

// Add userId to context
posts.use('*', (c, next) => {
  const { userId } = getAuth(c)
  if (!userId) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  c.set('userId', userId)
  return next()
})

posts.get('/', async (c) => {
  const posts = await DB.QUERIES.getPosts(c.env)
  return c.json({ posts })
})

posts.get('/:id', (c) => {
  return c.json({ message: `Post ${c.req.param('id')}` })
})

posts.post('/', (c) => {
  return c.json({ message: 'Create post' })
})

posts.delete('/:id', (c) => {
  const userId = c.get('userId')
  // you now know who is deleting
  return c.json({
    message: `Delete post ${c.req.param('id')}`,
  })
})

posts.put('/:id', (c) => {
  return c.json({ message: `Update post ${c.req.param('id')}` })
})

posts.patch('/:id', (c) => {
  return c.json({ message: `Publish post ${c.req.param('id')}` })
})

// May not do this:
posts.post('/description', (c) => {
  return c.json({ message: 'Generate description' })
})

export default posts

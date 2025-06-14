import { Hono } from 'hono'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import DB from '../db/db.js'

const postsRouter = new Hono()

// Inject secrets into Clerk middleware
postsRouter.use('*', (c, next) => {
  const secretKey = c.env.CLERK_SECRET_KEY
  const publishableKey = c.env.PUBLIC_CLERK_PUBLISHABLE_KEY
  return clerkMiddleware({ secretKey, publishableKey })(c, next)
})

// Add userId to context
postsRouter.use('*', (c, next) => {
  const { userId } = getAuth(c)
  c.set('userId', userId)
  return next()
})

postsRouter.get('/', async (c) => {
  const posts = await DB.QUERIES.getPosts(c.env)
  return c.json(posts)
})

postsRouter.get('/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const post = await DB.QUERIES.getPostById(c.env, id)
  if (!post) {
    return c.json({ message: 'Post not found' }, 404)
  }
  return c.json(post)
})

postsRouter.post('/', async (c) => {
  const auth = getAuth(c)
  const postData = await c.req.json()

  if (!postData.title || !postData.content) {
    return c.json({ message: 'Title and content are required' }, 400)
  }

  const newPost = await DB.MUTATIONS.createPost(c.env, {
    ...postData,
    authorID: auth.userId,
    authorFullName: auth.user?.fullName || auth.user?.firstName || 'Anonymous',
  })

  return c.json(newPost, 201)
})

postsRouter.delete('/:id', async (c) => {
  const userId = c.get('userId')
  const id = Number(c.req.param('id'))

  const result = await DB.MUTATIONS.deletePost(c.env, { id, userId })

  if (!result) {
    return c.json({ message: 'Post not found or you are not authorized' }, 404)
  }
  return c.json({ message: `Post ${result.deletedId} deleted successfully.` })
})

postsRouter.put('/:id', async (c) => {
  const userId = c.get('userId')
  const id = Number(c.req.param('id'))
  const postData = await c.req.json()

  const updatedPost = await DB.MUTATIONS.updatePost(c.env, { id, userId, postData })

  if (!updatedPost) {
    return c.json({ message: 'Post not found or you are not authorized' }, 404)
  }

  return c.json(updatedPost)
})

postsRouter.patch('/:id', async (c) => {
  const userId = c.get('userId')
  const id = Number(c.req.param('id'))
  const { published } = await c.req.json()

  if (typeof published !== 'boolean') {
    return c.json({ message: 'The "published" field must be a boolean.' }, 400)
  }

  const updatedPost = await DB.MUTATIONS.updatePostStatus(c.env, { id, userId, published })

  if (!updatedPost) {
    return c.json({ message: 'Post not found or you are not authorized' }, 404)
  }

  return c.json(updatedPost)
})

// May not do this:
postsRouter.post('/description', (c) => {
  return c.json({ message: 'Generate description' })
})

export default postsRouter

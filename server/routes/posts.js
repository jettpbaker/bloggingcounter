import { Hono } from 'hono'
import { clerkMiddleware, getAuth } from '@hono/clerk-auth'
import DB from '../db/db.js'

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
  const allPosts = await DB.QUERIES.getPosts(c.env)
  return c.json({ posts: allPosts })
})

posts.get('/:id', async (c) => {
  const id = Number(c.req.param('id'))
  const post = await DB.QUERIES.getPostById(c.env, id)
  if (!post) {
    return c.json({ message: 'Post not found' }, 404)
  }
  return c.json(post)
})

posts.post('/', async (c) => {
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

posts.delete('/:id', async (c) => {
  const userId = c.get('userId')
  const id = Number(c.req.param('id'))

  const result = await DB.MUTATIONS.deletePost(c.env, { id, userId })

  if (!result) {
    return c.json({ message: 'Post not found or you are not authorized' }, 404)
  }
  return c.json({ message: `Post ${result.deletedId} deleted successfully.` })
})

posts.put('/:id', async (c) => {
  const userId = c.get('userId')
  const id = Number(c.req.param('id'))
  const postData = await c.req.json()

  const updatedPost = await DB.MUTATIONS.updatePost(c.env, { id, userId, postData })

  if (!updatedPost) {
    return c.json({ message: 'Post not found or you are not authorized' }, 404)
  }

  return c.json(updatedPost)
})

posts.patch('/:id', async (c) => {
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
posts.post('/description', (c) => {
  return c.json({ message: 'Generate description' })
})

export default posts

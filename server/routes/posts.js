import { Hono } from 'hono'

const posts = new Hono()

posts.get('/', (c) => {
  return c.json({ message: 'All posts' })
})

posts.get('/:id', (c) => {
  return c.json({ message: `Post ${c.req.param('id')}` })
})

posts.post('/', (c) => {
  return c.json({ message: 'Create post' })
})

posts.delete('/:id', (c) => {
  return c.json({ message: `Delete post ${c.req.param('id')}` })
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

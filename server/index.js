import { Hono } from 'hono'
import pong from './routes/pong'
import posts from './routes/posts'

const app = new Hono()

app.route('/api/pong', pong)
app.route('/api/posts', posts)

app.get('/api/env', (c) => {
  console.log('Logging env')
  console.log(c.env)
  return c.json({ env: c.env })
})

app.get('/api', (c) => {
  console.log('Hello From Hono!')
  return c.json({ message: 'Hello From Hono!!' })
})

export default app

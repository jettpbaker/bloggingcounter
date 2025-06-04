import { Hono } from 'hono'
import pong from './routes/pong'

const app = new Hono()

app.route('/api/pong', pong)

app.get('/api', (c) => {
	console.log('Hello From Hono!')
	return c.json({ message: 'Hello From Hono!!' })
})

export default app

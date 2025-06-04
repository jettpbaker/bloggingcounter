import { Hono } from 'hono'
const app = new Hono()

app.get('/api', (c) => {
	console.log('Hello From Hono!')
	return c.json({ message: 'Hello From Hono!!' })
})

export default app

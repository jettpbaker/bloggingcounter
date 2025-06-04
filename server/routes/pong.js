import { Hono } from 'hono'

const pong = new Hono()

pong.get('/', (c) => {
	return c.json({ message: 'Pong!' })
})

export default pong

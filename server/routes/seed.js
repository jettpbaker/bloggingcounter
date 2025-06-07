import { Hono } from 'hono'
import { seed as drizzleSeed } from 'drizzle-seed'
import { drizzle } from 'drizzle-orm/d1'
import { posts } from '../../schema/schema'

const seed = new Hono()

seed.get('/', async (c) => {
  try {
    const db = drizzle(c.env.DB)
    // Clear existing posts
    await db.delete(posts)
    // Generate seed data manually to avoid schema conflicts
    const postOne = {
      title: 'First Post',
      content: 'This is the content of the first post',
      description: 'Description of the first post',
      authorID: 'author1',
      authorFullName: 'John Doe',
      published: true,
      updatedAt: new Date(),
    }
    const postTwo = {
      title: 'Second Post',
      content: 'This is the content of the second post',
      description: 'Description of the second post',
      authorID: 'author2',
      authorFullName: 'Jane Smith',
      published: true,
      updatedAt: new Date(),
    }
    const postThree = {
      title: 'Third Post',
      content: 'This is the content of the third post',
      description: 'Description of the third post',
      authorID: 'author1',
      authorFullName: 'John Doe',
      published: true,
      updatedAt: new Date(),
    }
    await db.insert(posts).values(postOne)
    await db.insert(posts).values(postTwo)
    await db.insert(posts).values(postThree)
    return c.json({ message: 'Seed successful' })
  } catch (error) {
    console.error(error)
    return c.json({ message: 'Seed failed', error: error.message }, 500)
  }
})

export default seed

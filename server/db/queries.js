import { drizzle } from 'drizzle-orm/d1'
import { posts as postsSchema } from '../../schema/schema.js'

const DB = {
  QUERIES: {
    async getPosts(env) {
      if (!env.DB) {
        throw new Error('Please pass the environment variable to the getPosts function')
      }
      const db = drizzle(env.DB)

      const posts = await db.select().from(postsSchema).all()

      return posts
    },
  },
  MUTATIONS: {},
}

export default DB

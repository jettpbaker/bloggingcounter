import { drizzle } from 'drizzle-orm/d1'
import { eq, and } from 'drizzle-orm'
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

    async getPostById(env, id) {
      if (!env.DB) {
        throw new Error('Please pass the environment variable to the function')
      }
      const db = drizzle(env.DB)
      const post = await db.select().from(postsSchema).where(eq(postsSchema.id, id)).get()
      return post
    },
  },
  MUTATIONS: {
    async createPost(env, { title, content, description, authorID, authorFullName }) {
      if (!env.DB) {
        throw new Error('Please pass the environment variable to the function')
      }
      const db = drizzle(env.DB)
      const result = await db
        .insert(postsSchema)
        .values({
          title,
          content,
          description,
          authorID,
          authorFullName,
          updatedAt: new Date(),
        })
        .returning()
        .get()
      return result
    },

    async updatePost(env, { id, userId, postData }) {
      if (!env.DB) {
        throw new Error('Please pass the environment variable to the function')
      }
      const db = drizzle(env.DB)
      const result = await db
        .update(postsSchema)
        .set({ ...postData, updatedAt: new Date() })
        .where(and(eq(postsSchema.id, id), eq(postsSchema.authorID, userId)))
        .returning()
        .get()
      return result
    },

    async deletePost(env, { id, userId }) {
      if (!env.DB) {
        throw new Error('Please pass the environment variable to the function')
      }
      const db = drizzle(env.DB)
      const result = await db
        .delete(postsSchema)
        .where(and(eq(postsSchema.id, id), eq(postsSchema.authorID, userId)))
        .returning({ deletedId: postsSchema.id })
        .get()
      return result
    },

    async updatePostStatus(env, { id, userId, published }) {
      if (!env.DB) {
        throw new Error('Please pass the environment variable to the function')
      }
      const db = drizzle(env.DB)
      const result = await db
        .update(postsSchema)
        .set({ published, updatedAt: new Date() })
        .where(and(eq(postsSchema.id, id), eq(postsSchema.authorID, userId)))
        .returning()
        .get()
      return result
    },
  },
}

export default DB

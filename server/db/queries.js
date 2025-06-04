import { getDb } from './index.js';
import { posts } from '../../schema/schema.js';

const now = () => {
	return Math.floor(Date.now() / 1000);
};

export default {
	async fetch(request, env) {
		console.log('Trying to query DB...');
		const db = getDb(env);

		const url = new URL(request.url);
		const path = url.pathname;

		// Insert dummy post
		if (path === '/api/posts/seed') {
			try {
				const dummyPost = {
					title: 'My First Blog Post',
					content:
						"This is a sample blog post with a lot of content. It demonstrates how we can store large amounts of text in our SQLite database using Drizzle ORM and Cloudflare D1. The content field can handle very large blog posts with multiple paragraphs, code snippets, and all the rich content you'd expect in a modern blog.",
					description: 'A sample blog post to test our database setup',
					authorID: 1,
					authorFullName: 'John Doe',
					published: true,
					updatedAt: now(),
				};

				const result = await db.insert(posts).values(dummyPost).returning();
				return Response.json({
					success: true,
					message: 'Dummy post created',
					data: result,
				});
			} catch (error) {
				return Response.json(
					{
						success: false,
						error: error.message,
					},
					{ status: 500 }
				);
			}
		}

		// Get all posts
		if (path === '/api/posts' || path === '/') {
			try {
				const result = await db.select().from(posts);
				return Response.json({
					success: true,
					data: result,
				});
			} catch (error) {
				return Response.json(
					{
						success: false,
						error: error.message,
					},
					{ status: 500 }
				);
			}
		}

		return Response.json({ error: 'Route not found' }, { status: 404 });
	},
};

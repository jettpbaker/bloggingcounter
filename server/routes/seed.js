import { Hono } from 'hono'
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
      authorID: 'author3',
      authorFullName: 'Lorenzo Cugliari',
      published: true,
      updatedAt: new Date(),
    }
    const postFour = {
      title: 'Getting Started with Modern Web Development',
      content: `# Getting Started with Modern Web Development

The world of web development has evolved dramatically over the past decade. What once required complex server setups and extensive boilerplate code can now be accomplished with elegant, modern frameworks and tools.

## Why Modern Frameworks Matter

Today's web development landscape is dominated by powerful frameworks that solve common problems:

- **React** - Component-based UI development
- **Vue.js** - Progressive framework with excellent developer experience  
- **Svelte** - Compile-time optimizations for better performance
- **Next.js** - Full-stack React framework with built-in optimizations

### Setting Up Your Development Environment

Getting started is easier than ever. Here's a simple setup process:

\`\`\`bash
# Create a new project
npm create vite@latest my-app
cd my-app
npm install
npm run dev
\`\`\`

## Key Concepts to Master

### 1. Component Architecture
Modern web apps are built using reusable components. Think of them as LEGO blocks that you can combine to create complex interfaces.

### 2. State Management
Understanding how data flows through your application is crucial. Whether you're using React's useState or Pinia for Vue, proper state management keeps your app predictable.

### 3. API Integration
Most applications need to communicate with servers. The modern approach uses:

- **REST APIs** for traditional data exchange
- **GraphQL** for more flexible queries
- **Server-sent events** for real-time updates

## Best Practices

> "Code is read more often than it's written" - Always prioritize readability

Here are some guidelines I follow:

1. **Write descriptive variable names** - \`userProfileData\` is better than \`data\`
2. **Keep components small** - If it's over 200 lines, consider splitting it
3. **Test your code** - Even simple unit tests catch surprising bugs
4. **Use TypeScript** - The initial setup time pays dividends

## Looking Forward

Web development continues to evolve rapidly. Keep an eye on emerging trends like:

- **WebAssembly** for performance-critical applications
- **Edge computing** for faster global delivery
- **AI-powered development tools** changing how we write code

The future is exciting, and there's never been a better time to be a web developer!

---

*Happy coding! 🚀*`,
      description: 'A comprehensive guide to modern web development practices and tools',
      authorID: 'author4',
      authorFullName: 'Jett Baker',
      published: true,
      updatedAt: new Date(),
    }

    await db.insert(posts).values(postOne)
    await db.insert(posts).values(postTwo)
    await db.insert(posts).values(postThree)
    await db.insert(posts).values(postFour)
    return c.json({ message: 'Seed successful' })
  } catch (error) {
    console.error(error)
    return c.json({ message: 'Seed failed', error: error.message }, 500)
  }
})

export default seed

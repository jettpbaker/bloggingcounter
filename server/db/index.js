import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../../schema/schema.js';

export function createDbClient(D1Database) {
	return drizzle(D1Database, { schema });
}

// For use in Cloudflare Workers
export function getDb(env) {
	return createDbClient(env.DB);
}

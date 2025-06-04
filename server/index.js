import query from './db/queries';

export default {
	fetch(request, env) {
		const url = new URL(request.url);

		// Route all posts-related endpoints to our queries handler
		if (url.pathname.startsWith('/api/posts') || url.pathname.startsWith('/api/query')) {
			return query.fetch(request, env);
		}

		if (url.pathname.startsWith('/api/')) {
			return Response.json({
				name: 'Cloudflare',
			});
		}

		return new Response(null, { status: 404 });
	},
};

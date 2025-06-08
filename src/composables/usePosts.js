import { useQuery } from '@tanstack/vue-query'

const fetchPosts = async () => {
  const response = await fetch('/api/posts')
  if (!response.ok) {
    throw new Error('Failed to fetch posts')
  }
  return response.json()
}

const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })
}

export default usePosts

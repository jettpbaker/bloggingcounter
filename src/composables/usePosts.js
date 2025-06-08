import { useQuery } from '@tanstack/vue-query'

const fetchPosts = async () => {
  const response = await fetch('/api/posts')
  const data = await response.json()
  return data
}

const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  })
}

export default usePosts

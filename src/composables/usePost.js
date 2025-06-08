import { useQuery, useQueryClient } from '@tanstack/vue-query'

const fetchPost = async (id) => {
  const response = await fetch(`/api/posts/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch post')
  }
  return response.json()
}

const usePost = (id) => {
  const qc = useQueryClient()

  return useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPost(id),
    initialData: () => {
      const posts = qc.getQueryData(['posts'])
      return posts.find((post) => post.id === id)
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

export default usePost

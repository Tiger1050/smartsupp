import { useEffect } from 'react'
import { useGet } from 'restful-react'
import { IPost, IUser } from '../../interfaces'

export const useUser = (id: number | string | undefined) => {
  const user = useGet<IUser>(`/users/${id}`, { lazy: true })
  const posts = useGet<IPost[]>(`/users/${id}/posts`, { lazy: true })

  useEffect(() => {
    if (id !== undefined && !user.data && !user.loading && !user.error) {
      user.refetch()
    }
  }, [id, user])

  useEffect(() => {
    if (id !== undefined && !posts.data && !posts.loading) {
      posts.refetch()
    }
  }, [id, posts])

  return { user, posts }
}

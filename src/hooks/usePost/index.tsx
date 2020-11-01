import React from 'react'
import { useGet } from 'restful-react'
import { IComment, IPost, IUser } from '../../interfaces'
import { IPostContext } from './types'

const defaultPostContext: IPostContext = {
  author: {
    loading: false,
    data: null,
    error: null,
  },
  comments: {
    loading: false,
    data: null,
    error: null,
  },
  post: {
    id: '',
    loading: false,
    data: null,
    error: null,
  },
}

const PostContext = React.createContext(defaultPostContext)

const PostContextProvider: React.FC<{ postId: string }> = ({
  postId,
  children,
}) => {
  const comments = useGet<IComment[]>(`/posts/${postId}/comments`)
  const post = useGet<IPost>(`/posts/${postId}`)
  const author = useGet<IUser>(`/users/${post.data?.userId}`, { lazy: true })

  React.useEffect(() => {
    if (post.data && (!author.data || author.data.id !== post.data.userId)) {
      author.refetch()
    }
  }, [author, post])

  return (
    <PostContext.Provider
      value={{
        author: {
          loading: author.loading,
          data: author.data,
          error: author.error,
        },
        comments: {
          loading: comments.loading,
          data: comments.data,
          error: comments.error,
        },
        post: {
          id: postId,
          loading: post.loading,
          data: post.data,
          error: post.error,
        },
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export const usePost = () => React.useContext(PostContext)

export default PostContextProvider

import { GetDataError } from 'restful-react'
import { IComment, IPost, IUser } from '../../interfaces'

export type TError = GetDataError<any> | null

export interface IPostContext {
  author: {
    loading: boolean
    data: IUser | null
    error: TError
  }
  comments: {
    loading: boolean
    data: IComment[] | null
    error: TError
  }
  post: {
    id: string
    loading: boolean
    data: IPost | null
    error: TError
  }
}

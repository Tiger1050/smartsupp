import Typography from '@material-ui/core/Typography'
import React from 'react'
import List from '../../../components/List'
import { IComment } from '../../../interfaces'

interface ICommentsProps {
  comments: IComment[]
  loading?: boolean
}

const Comments: React.FC<ICommentsProps> = ({ comments, loading }) => {
  return (
    <List
      divider
      loading={loading}
      renderPrimary={({ index, primary }) => (
        <>
          #{index + 1} - {primary}
        </>
      )}
      data={comments.map((comment) => ({
        primary: comment.email,
        secondary: (
          <>
            <Typography component="span" variant="body2" color="textPrimary">
              {comment.name}
            </Typography>
            {` - ${comment.body}`}
          </>
        ),
      }))}
    />
  )
}

export default Comments

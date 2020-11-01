import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import MuiLink from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Alert from '@material-ui/lab/Alert'
import React from 'react'
import { Link, useParams, useRouteMatch } from 'react-router-dom'
import Layout from '../../../components/Layout'
import { usePost } from '../../../hooks'
import PostProvider from '../../../hooks/usePost'
import Comments from './Comments'

const PostDetail: React.FC = () => {
  const { url } = useRouteMatch()
  const { author, comments, post } = usePost()

  const mainLoading = author.loading || post.loading

  return (
    <Layout
      startButton={{ to: '/' }}
      loading={mainLoading}
      heading={`Post #${post.id}`}
    >
      {post.error ? (
        <Alert severity="error">{post.error.message}</Alert>
      ) : (
        <Card>
          <CardHeader
            title={post.data?.title}
            {...(author.data?.name && {
              subheader: (
                <MuiLink
                  to={{
                    pathname: `/user/${author.data?.id}`,
                    state: { backTo: url },
                  }}
                  component={Link}
                >
                  {author.data.name}
                </MuiLink>
              ),
            })}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {post.data?.body}
            </Typography>
            <Comments
              comments={comments.data || []}
              loading={comments.loading}
            />
          </CardContent>
        </Card>
      )}
    </Layout>
  )
}

const PostDetailWithContext: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <PostProvider postId={id}>
      <PostDetail />
    </PostProvider>
  )
}

export default PostDetailWithContext

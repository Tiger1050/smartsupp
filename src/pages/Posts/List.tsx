import MuiLink from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { useGet } from 'restful-react'
import Layout from '../../components/Layout'
import List from '../../components/List'
import { IPost } from '../../interfaces'

const ListPage: React.FC = () => {
  const { path } = useRouteMatch()
  const { data, loading } = useGet<IPost[]>('/posts')

  return (
    <Layout loading={loading} heading="Posts">
      {data && (
        <Paper>
          <List
            dense
            data={data.map((post) => ({
              primary: (
                <MuiLink to={`${path}/${post.id}`} component={Link}>
                  {post.title}
                </MuiLink>
              ),
            }))}
          />
        </Paper>
      )}
    </Layout>
  )
}

export default ListPage

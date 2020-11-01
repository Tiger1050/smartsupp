import Divider from '@material-ui/core/Divider'
import MuiLink from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Alert from '@material-ui/lab/Alert'
import upperFirst from 'lodash/upperFirst'
import React from 'react'
import { Link, useParams, useRouteMatch } from 'react-router-dom'
import Layout from '../../components/Layout'
import List, { IListProps } from '../../components/List'
import { useUser } from '../../hooks'

const parseData = (
  data: ReturnType<typeof useUser>['user']['data'],
  subheader?: string,
): IListProps['data'] => {
  const result: IListProps['data'] = []
  if (data) {
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value !== 'object') {
        result.push({ primary: value, secondary: upperFirst(key), subheader })
      } else {
        result.push(parseData(value, upperFirst(key)).flat())
      }
    })
  }
  return result
}

const User: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { url } = useRouteMatch()
  const { user, posts } = useUser(id)

  const data = parseData(user.data)

  return (
    <Layout loading={user.loading} heading="User" startButton={{ to: '/' }}>
      {user.error ? (
        <Alert severity="error">{user.error.message}</Alert>
      ) : (
        <Paper>
          <List data={data} subheader="Data" dense divider />
          <Divider />
          <List
            data={(posts.data || []).map((post) => ({
              primary: (
                <MuiLink
                  to={{ pathname: `/posts/${post.id}`, state: { backTo: url } }}
                  component={Link}
                >
                  {post.title}
                </MuiLink>
              ),
            }))}
            subheader="Posts"
            dense
            divider
          />
        </Paper>
      )}
    </Layout>
  )
}

export default User

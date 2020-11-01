import React from 'react'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import Detail from './Detail'
import List from './List'

const Posts: React.FC = () => {
  const { path } = useRouteMatch()

  return (
    <Switch>
      <Route path={`${path}/:id`} component={Detail} />
      <Route path={path} component={List} />
      <Redirect to={path} />
    </Switch>
  )
}

export default Posts

import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Posts from './pages/Posts'
import User from './pages/User'

const App: React.FC = () => {
  return (
    <Switch>
      <Route path="/posts" component={Posts} />
      <Route path="/user/:id" component={User} />
      <Redirect to="/posts" />
    </Switch>
  )
}

export default App

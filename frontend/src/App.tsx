import React from 'react';
import Login from './pages/Login'
import Chat from './pages/Chat'
import Register from './pages/Register'
import { PrivateRoute, AuthRoute } from './providers'


export default class App extends React.Component<{}, {}> {
  render() {
    return <>
      <AuthRoute path='/login'>
        <Login />
      </AuthRoute>
      <AuthRoute path='/register'>
        <Register />
      </AuthRoute>

      <PrivateRoute path='/chat'>
        <Chat />
      </PrivateRoute>

    </>
  };
}


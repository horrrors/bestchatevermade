import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { useOvermind } from './store/index'


export function PrivateRoute({ children, ...rest }: any) {
  const { state: { auth: { isAuthUser } } } = useOvermind()
  return (
    <Route
      {...rest}
      render={() =>
        isAuthUser ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          )
      }
    />
  );
}


export function AuthRoute({ children, ...rest }: any) {
  const { state: { auth: { isAuthUser } } } = useOvermind()

  return (
    <Route
      {...rest}
      render={() =>
        !isAuthUser ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/chat",
              }}
            />
          )
      }
    />
  );
}

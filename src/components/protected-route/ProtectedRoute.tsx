import React from 'react';
import { useSelector } from 'react-redux';
// @ts-ignore
import { Redirect, Route } from 'react-router-dom';

import { State } from '../../types/states';

export function ProtectedRoute(props: {
  children: React.ReactNode,
  path: string
  exact?: boolean,
}) {
  const {children, ...rest} = props;
  const user = useSelector((state: State) => state.user.user);

  return (
    <Route
      {...rest}
      // @ts-ignore
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: location }
          }}  />
        )
      }
    />
  );
}

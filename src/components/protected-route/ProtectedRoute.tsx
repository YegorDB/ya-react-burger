import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// @ts-ignore
import { Redirect, Route } from 'react-router-dom';

import { getUser } from '../../services/actions';

import { State } from '../../types/states';

export function ProtectedRoute(props: {
  children: React.ReactNode,
  path: string
  exact?: boolean,
}) {
  const {children, ...rest} = props;

  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    await getUser();
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  const user = useSelector((state: State) => state.user.user);

  if (!isUserLoaded) {
    return null;
  }

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

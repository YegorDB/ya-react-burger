import React, { FC, useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { useSelector } from '../../hooks';
import { getUser } from '../../services/actions';
import { TProtectedRouteProps } from '../../types/props';

export const ProtectedRoute: FC<TProtectedRouteProps> = ({ children, fromOverride, ...rest }) => {
  const [isUserLoaded, setUserLoaded] = useState<boolean>(false);

  useEffect(() => {
    let cleanup = false;

    const init = async () => {
      await getUser();
      if (!cleanup) {
        setUserLoaded(true);
      }
    };

    init();
    return () => { cleanup = true; };
  }, []);

  const user = useSelector(state => state.user.user);

  if (!isUserLoaded) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: fromOverride || location }
          }}  />
        )
      }
    />
  );
}

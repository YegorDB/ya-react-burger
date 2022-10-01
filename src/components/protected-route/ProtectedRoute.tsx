import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// @ts-ignore
import { Redirect, Route } from 'react-router-dom';

import { getUser } from '../../services/actions';
import { TProtectedRouteProps } from '../../types/props';
import { State } from '../../types/states';

export const ProtectedRoute: FC<TProtectedRouteProps> = ({ children, ...rest }) => {
  const [isUserLoaded, setUserLoaded] = useState<boolean>(false);

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

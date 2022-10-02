import cn from 'classnames';
import React, { FC, ChangeEventHandler, FormEventHandler, useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';

import {
  Button, Input,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { getUser, postLogout, patchUser } from '../../services/actions';
import { TState } from '../../types/states';

import styles from './Profile.module.css';

export const ProfilePage: FC = () => {
  const matchRoot = useRouteMatch('/profile');
  const matchOrders = useRouteMatch('/profile/orders');

  const dispatch = useDispatch();
  const { user, userLoaded } = useSelector((state: TState) => state.user);
  const [name, setName] = useState<string>(user ? user.name : '');
  const [login, setLogin] = useState<string>(user ? user.email : '');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    // @ts-ignore
    dispatch(getUser());
  }, [dispatch]);

  const changeName = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => setName(e.target.value),
    []
  );
  const changeLogin = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => setLogin(e.target.value),
    []
  );
  const changePassword = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => setPassword(e.target.value),
    []
  );

  const changeUserData = useCallback<FormEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault();
      // @ts-ignore
      dispatch(patchUser(name, login, password));
    },
    [dispatch, name, login, password]
  );

  const resetUserData = useCallback<(...args: any[]) => void>(
    e => {
      setName(user ? user.name : '');
      setLogin(user ? user.email : '');
      setPassword('');
    },
    [user]
  );

  const logout = useCallback<(...args: any[]) => void>(
    // @ts-ignore
    e => dispatch(postLogout()),
    [dispatch]
  );

  if (!userLoaded) {
    return null;
  }

  return (
    <main>
      <div className={ styles.Profile }>
        <div className={ styles.ProfileMain }>
          <Switch>
            <Route path="/profile" exact={true}>
              <form onSubmit={ changeUserData }>
                <div className={ styles.ProfileInputWrapper }>
                  <Input
                    type="text"
                    placeholder="Имя"
                    onChange={ changeName }
                    value={ name }
                    name="name"
                    size="default"
                    icon="EditIcon"
                  />
                </div>
                <div className={ styles.ProfileInputWrapper }>
                  <Input
                    type="text"
                    placeholder="Логин"
                    onChange={ changeLogin }
                    value={ login }
                    name="login"
                    size="default"
                    icon="EditIcon"
                  />
                </div>
                <div className={ styles.ProfileInputWrapper }>
                  <Input
                    type="text"
                    placeholder="Пароль"
                    onChange={ changePassword }
                    value={ password }
                    name="password"
                    size="default"
                    icon="EditIcon"
                  />
                </div>
                <input type="submit" id="submit-form" className={ styles.ProfileFormSubmit }/>
                <div className={ styles.ProfileButtons }>
                  <label htmlFor="submit-form">
                    <Button type="primary" size="medium">
                      Сохранить
                    </Button>
                  </label>
                  <Button type="primary" size="medium" onClick={ resetUserData }>
                    Отмена
                  </Button>
                </div>
              </form>
            </Route>
            <Route path="/profile/orders">
              ORDERS
            </Route>
          </Switch>
        </div>
        <div className={ styles.ProfileMenu }>
          <Link to='/profile' className="undecorated-link">
            <p className={cn('text text_type_main-medium mb-5', !matchRoot?.isExact && 'text_color_inactive')}>
              Профиль
            </p>
          </Link>
          <Link to='/profile/orders' className="undecorated-link">
            <p className={cn('text text_type_main-medium mb-5', !matchOrders && 'text_color_inactive')}>
              История заказов
            </p>
          </Link>
          <p className={cn('text text_type_main-medium text_color_inactive', styles.ProfileLogout)} onClick={ logout }>
            Выход
          </p>
          <p className="text text_type_main-default text_color_inactive mt-20">
            В этом разделе Вы можете изменить свои персональные данные
          </p>
        </div>
      </div>
    </main>
  );
}

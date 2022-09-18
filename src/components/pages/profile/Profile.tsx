import cn from 'classnames';
import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// @ts-ignore
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';

import {
  Button, Input,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { postLogout, patchUser } from '../../../services/actions';
import { State } from '../../../types/states';

import styles from './Profile.module.css';

export function ProfilePage() {
  const matchRoot = useRouteMatch('/profile');
  const matchOrders = useRouteMatch('/profile/orders');

  const dispatch = useDispatch();
  const user = useSelector((state: State) => state.user.user);

  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const changeName = useCallback(
    e => setName(e.target.value),
    []
  );
  const changeLogin = useCallback(
    e => setLogin(e.target.value),
    []
  );
  const changePassword = useCallback(
    e => setPassword(e.target.value),
    []
  );

  const changeUserData = useCallback(
    // @ts-ignore
    e => dispatch(patchUser(name, login, password)),
    [dispatch, name, login, password]
  );

  const resetUserData = useCallback(
    e => {
      setName(user ? user.name : '');
      setLogin(user ? user.email : '');
      setPassword('');
    },
    [user]
  );

  const logout = useCallback(
    // @ts-ignore
    e => dispatch(postLogout()),
    [dispatch]
  );

  return (
    <main>
      <div className={ styles.Profile }>
        <div className={ styles.ProfileMain }>
          <Switch>
            <Route path="/profile" exact={true}>
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
              <div className={ styles.ProfileButtons }>
                <Button type="primary" size="medium" onClick={ changeUserData }>
                  Сохранить
                </Button>
                <Button type="primary" size="medium" onClick={ resetUserData }>
                  Отмена
                </Button>
              </div>
            </Route>
            <Route path="/profile/orders">
              ORDERS
            </Route>
          </Switch>
        </div>
        <div className={ styles.ProfileMenu }>
          <Link to='/profile' className="undecorated-link">
            <p className={cn('text text_type_main-medium mb-5', !matchRoot.isExact && 'text_color_inactive')}>
              Профиль
            </p>
          </Link>
          <Link to='/profile/orders' className="undecorated-link">
            <p className={cn('text text_type_main-medium mb-5', !matchOrders && 'text_color_inactive')}>
              История заказов
            </p>
          </Link>
          <p className="text text_type_main-medium text_color_inactive" onClick={ logout }>
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

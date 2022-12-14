import React, { FC, ChangeEventHandler, FormEventHandler, useCallback, useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import {
  Button, Input, PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { useSelector, useDispatch } from '../../hooks';
import { getUser, postLogin } from '../../services/actions';
import { TBaseLocationState } from '../../types/router';

import styles from './Login.module.css';

export const LoginPage: FC = () => {
  const location = useLocation<TBaseLocationState>();
  const dispatch = useDispatch();
  const { user, userLoaded } = useSelector(state => state.user);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const changeEmail = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => setEmail(e.target.value),
    []
  );
  const changePassword = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => setPassword(e.target.value),
    []
  );
  const loginHandle = useCallback<FormEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault();
      dispatch(postLogin(email, password));
    },
    [dispatch, email, password]
  );

  if (!userLoaded) {
    return null;
  }

  if (user) {
    return (
      <Redirect
        to={ location.state?.from || '/' }
      />
    );
  }

  return (
    <main>
      <div className={ styles.Login }>
        <p className="text text_type_main-medium mb-6">
          Вход
        </p>
        <form onSubmit={ loginHandle }>
          <div className={ styles.LoginInputWrapper }>
            <Input
              type="email"
              placeholder="E-mail"
              onChange={ changeEmail }
              value={ email }
              name="email"
              size="default"
            />
          </div>
          <div className={ styles.LoginInputWrapper }>
            <PasswordInput
              onChange={ changePassword }
              value={ password }
              name="password"
            />
          </div>
          <input type="submit" id="submit-form" className={ styles.LoginFormSubmit }/>
          <div className="mb-20">
            <label htmlFor="submit-form">
              <Button type="primary" size="medium">
                Войти
              </Button>
            </label>
          </div>
        </form>
        <p className="text text_type_main-default mb-4">
          Вы - новый пользователь?
          <Link to='/register' className="ml-2">
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default">
          Забыли пароль?
          <Link to='/forgot-password' className="ml-2">
            Восстановить пароль
          </Link>
        </p>
      </div>
    </main>
  );
}

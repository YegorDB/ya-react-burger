import React, { FC, ChangeEventHandler, FormEventHandler, useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';

import {
  Button, Input, PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { getUser, passwordReset } from '../../services/actions';
import { TState } from '../../types/states';

import styles from './ResetPassword.module.css';

export const ResetPasswordPage: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, userLoaded, forgotPasswordUsed } = useSelector((state: TState) => ({
    user: state.user.user,
    userLoaded: state.user.userLoaded,
    forgotPasswordUsed: state.forgotPassword.forgotPasswordUsed,
  }));
  const [password, setPassword] = useState<string>('');
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    // @ts-ignore
    dispatch(getUser());
  }, [dispatch]);

  const changePassword = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => setPassword(e.target.value),
    []
  );
  const changeToken = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => setToken(e.target.value),
    []
  );

  const resetHandle = useCallback<FormEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault();
      // @ts-ignore
      dispatch(passwordReset(password, token, () => {
        history.push('/login');
      }));
    },
    [password, token, history, dispatch]
  );

  if (!userLoaded) {
    return null;
  }

  if (user) {
    return (
      <Redirect to='/' />
    );
  }

  if (!forgotPasswordUsed) {
    return (
      <Redirect to='/forgot-password' />
    );
  }

  return (
    <main>
      <div className={ styles.ResetPassword }>
        <p className="text text_type_main-medium mb-6">
          Восстановление пароля
        </p>
        <form onSubmit={ resetHandle }>
          <div className={ styles.ResetPasswordInputWrapper }>
            <PasswordInput
              onChange={ changePassword }
              value={ password }
              name="password"
            />
          </div>
          <div className={ styles.ResetPasswordInputWrapper }>
            <Input
              type="text"
              placeholder="Введите код из письма"
              onChange={ changeToken }
              value={ token }
              name="token"
              size="default"
            />
          </div>
          <input type="submit" id="submit-form" className={ styles.ResetPasswordFormSubmit }/>
          <div className="mb-20">
            <label htmlFor="submit-form">
              <Button type="primary" size="medium">
                Сохранить
              </Button>
            </label>
          </div>
        </form>
        <p className="text text_type_main-default">
          Вспомнили пароль?
          <Link to='/login' className="ml-2">
            Войти
          </Link>
        </p>
      </div>
    </main>
  );
}

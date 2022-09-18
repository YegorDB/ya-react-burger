import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// @ts-ignore
import { Link, Redirect } from 'react-router-dom';

import {
  Button, Input, PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { API_ROOT } from '../../../consts/api';
import { getUser } from '../../../services/actions';
import { State } from '../../../types/states';
import { checkResponse, handleResponse, handleResponseError } from '../../../utils/fetch';

import styles from './ResetPassword.module.css';

export function ResetPasswordPage() {
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    await getUser();
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  const user = useSelector((state: State) => state.user.user);

  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const changePassword = useCallback(
    e => setPassword(e.target.value),
    []
  );
  const changeToken = useCallback(
    e => setToken(e.target.value),
    []
  );
  const resetHandle = useCallback(
    e => {
      fetch(`${API_ROOT}/password-reset/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "password": password,
          "token": token,
        })
      })
      .then(checkResponse)
      .then(handleResponse<{success: boolean, message: string}>(res => {
        localStorage.removeItem('forgotPasswordUsed');
        // redirect to /login
      }))
      .catch(handleResponseError('Reset password', () => {}));
    },
    [password, token]
  );

  if (!isUserLoaded) {
    return null;
  }

  if (user) {
    return (
      <Redirect to='/' />
    );
  }

  const forgotPasswordUsed = localStorage.getItem('forgotPasswordUsed') === '1';
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
        <div className="mb-20">
          <Button type="primary" size="medium" onClick={ resetHandle }>
            Сохранить
          </Button>
        </div>
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

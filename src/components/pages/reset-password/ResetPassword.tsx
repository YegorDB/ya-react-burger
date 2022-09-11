import React, { useCallback, useState } from 'react';
// @ts-ignore
import { Link } from 'react-router-dom';

import {
  Button, Input, PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { API_ROOT } from '../../../consts/api';
import { checkResponse, handleResponse, handleResponseError } from '../../../utils/fetch';

import styles from './ResetPassword.module.css';

export function ResetPasswordPage() {
  const [password, setPassword] = React.useState('')
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
        console.log('move to /login ?');
      }))
      .catch(handleResponseError('Forgot password', () => {}));
    },
    [password, token]
  );

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

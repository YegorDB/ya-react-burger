import React, { useCallback, useState } from 'react';
// @ts-ignore
import { Link } from 'react-router-dom';

import {
  Button, Input,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { API_ROOT } from '../../../consts/api';
import { checkResponse, handleResponse, handleResponseError } from '../../../utils/fetch';

import styles from './ForgotPassword.module.css';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

  const changeEmail = useCallback(
    e => setEmail(e.target.value),
    []
  );
  const repareHandle = useCallback(
    e => {
      fetch(`${API_ROOT}/password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "email": email,
        })
      })
      .then(checkResponse)
      .then(handleResponse<{success: boolean, message: string}>(res => {
        console.log('move to /reset-password');
      }))
      .catch(handleResponseError('Forgot password', () => {}));
    },
    [email]
  );

  return (
    <main>
      <div className={ styles.ForgotPassword }>
        <p className="text text_type_main-medium mb-6">
          Восстановление пароля
        </p>
        <div className={ styles.ForgotPasswordInputWrapper }>
          <Input
            type="email"
            placeholder="Укажите e-mail"
            onChange={ changeEmail }
            value={ email }
            name="email"
            size="default"
          />
        </div>
        <div className="mb-20">
          <Button type="primary" size="medium" onClick={ repareHandle }>
            Восстановить
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

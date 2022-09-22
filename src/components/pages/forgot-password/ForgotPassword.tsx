import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// @ts-ignore
import { Link, Redirect, useHistory } from 'react-router-dom';

import {
  Button, Input,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { State } from '../../../types/states';

import { API_ROOT } from '../../../consts/api';
import { getUser } from '../../../services/actions';
import { checkResponse, handleResponse, handleResponseError } from '../../../utils/fetch';

import styles from './ForgotPassword.module.css';

export function ForgotPasswordPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, userLoaded } = useSelector((state: State) => state.user);
  const [email, setEmail] = useState('');

  useEffect(() => {
    // @ts-ignore
    dispatch(getUser());
  }, [dispatch]);

  const changeEmail = useCallback(
    e => setEmail(e.target.value),
    []
  );
  const repareHandle = useCallback(
    e => {
      e.preventDefault();
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
        localStorage.setItem('forgotPasswordUsed', '1');
        history.push('/reset-password');
      }))
      .catch(handleResponseError('Forgot password', () => {}));
    },
    [email, history]
  );

  if (!userLoaded) {
    return null;
  }

  if (user) {
    return (
      <Redirect to='/' />
    );
  }

  return (
    <main>
      <div className={ styles.ForgotPassword }>
        <p className="text text_type_main-medium mb-6">
          Восстановление пароля
        </p>
        <form onSubmit={ repareHandle }>
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
          <input type="submit" id="submit-form" className={ styles.ForgotPasswordFormSubmit }/>
          <div className="mb-20">
            <label htmlFor="submit-form">
              <Button type="primary" size="medium">
                Восстановить
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

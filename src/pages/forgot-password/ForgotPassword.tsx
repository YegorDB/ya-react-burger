import React, { FC, ChangeEventHandler, FormEventHandler, useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// @ts-ignore
import { Link, Redirect, useHistory } from 'react-router-dom';

import {
  Button, Input,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { TState } from '../../types/states';

import { getUser, forgotPassword } from '../../services/actions';

import styles from './ForgotPassword.module.css';

export const ForgotPasswordPage: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, userLoaded } = useSelector((state: TState) => state.user);
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    // @ts-ignore
    dispatch(getUser());
  }, [dispatch]);

  const changeEmail = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => setEmail(e.target.value),
    []
  );
  const repareHandle = useCallback<FormEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault();
      // @ts-ignore
      dispatch(forgotPassword(email, () => {
        history.push('/reset-password');
      }));
    },
    [email, history, dispatch]
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

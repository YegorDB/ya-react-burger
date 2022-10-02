import React, { FC, ChangeEventHandler, FormEventHandler, useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// @ts-ignore
import { Link, Redirect } from 'react-router-dom';

import {
  Button, Input, PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { getUser, postRegister } from '../../services/actions';
import { TState } from '../../types/states';

import styles from './Register.module.css';

export const RegisterPage: FC = () => {
  const dispatch = useDispatch();
  const { user, userLoaded } = useSelector((state: TState) => state.user);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    // @ts-ignore
    dispatch(getUser());
  }, [dispatch]);

  const changeName = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => setName(e.target.value),
    []
  );
  const changeEmail = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => setEmail(e.target.value),
    []
  );
  const changePassword = useCallback<ChangeEventHandler<HTMLInputElement>>(
    e => setPassword(e.target.value),
    []
  );

  const registerHandle = useCallback<FormEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault();
      // @ts-ignore
      dispatch(postRegister(email, password, name));
    },
    [dispatch, name, email, password]
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
      <div className={ styles.Register }>
        <p className="text text_type_main-medium mb-6">
          Регистрация
        </p>
        <form onSubmit={ registerHandle }>
          <div className={ styles.RegisterInputWrapper }>
            <Input
              type="text"
              placeholder="Name"
              onChange={ changeName }
              value={ name }
              name="name"
              size="default"
            />
          </div>
          <div className={ styles.RegisterInputWrapper }>
            <Input
              type="email"
              placeholder="E-mail"
              onChange={ changeEmail }
              value={ email }
              name="email"
              size="default"
            />
          </div>
          <div className={ styles.RegisterInputWrapper }>
            <PasswordInput
              onChange={ changePassword }
              value={ password }
              name="password"
            />
          </div>
          <input type="submit" id="submit-form" className={ styles.RegisterFormSubmit }/>
          <div className="mb-20">
            <label htmlFor="submit-form">
              <Button type="primary" size="medium">
                Зарегистрироваться
              </Button>
            </label>
          </div>
        </form>
        <p className="text text_type_main-default">
          Уже зарегистрированы?
          <Link to='/login' className="ml-2">
            Войти
          </Link>
        </p>
      </div>
    </main>
  );
}

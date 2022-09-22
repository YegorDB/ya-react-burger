import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// @ts-ignore
import { Link, Redirect } from 'react-router-dom';

import {
  Button, Input, PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { getUser, postRegister } from '../../../services/actions';
import { State } from '../../../types/states';

import styles from './Register.module.css';

export function RegisterPage() {
  const dispatch = useDispatch();
  const { user, userLoaded } = useSelector((state: State) => state.user);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // @ts-ignore
    dispatch(getUser());
  }, [dispatch]);

  const changeName = useCallback(
    e => setName(e.target.value),
    []
  );
  const changeEmail = useCallback(
    e => setEmail(e.target.value),
    []
  );
  const changePassword = useCallback(
    e => setPassword(e.target.value),
    []
  );
  const registerHandle = useCallback(
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

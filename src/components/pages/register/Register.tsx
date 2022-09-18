import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
// @ts-ignore
import { Link, Redirect } from 'react-router-dom';

import {
  Button, Input, PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { State } from '../../../types/states';

import styles from './Register.module.css';

export function RegisterPage() {
  const user = useSelector((state: State) => state.user.user);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      console.log('name', name);
      console.log('email', email);
      console.log('password', password);
    },
    [name, email, password]
  );

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
        <div className="mb-20">
          <Button type="primary" size="medium" onClick={ registerHandle }>
            Зарегистрироваться
          </Button>
        </div>
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

import React from 'react';
// @ts-ignore
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AppHeader from '../app-header/AppHeader';
import { ForgotPasswordPage } from '../pages/forgot-password/ForgotPassword';
import { LoginPage } from '../pages/login/Login';
import { MainPage } from '../pages/main/Main';
import { RegisterPage } from '../pages/register/Register';
import { ResetPasswordPage } from '../pages/reset-password/ResetPassword';

function App() {
  return (
    <>
      <AppHeader />
      <Router>
        <Switch>
          <Route path="/" exact={true}>
            <MainPage />
          </Route>
          <Route path="/login" exact={true}>
            <LoginPage />
          </Route>
          <Route path="/register" exact={true}>
            <RegisterPage />
          </Route>
          <Route path="/forgot-password" exact={true}>
            <ForgotPasswordPage />
          </Route>
          <Route path="/reset-password" exact={true}>
            <ResetPasswordPage />
          </Route>
          <Route path="/profile" exact={true}>
            <div>страница с настройками профиля пользователя</div>
          </Route>
          <Route path="/ingredients/:id" exact={true}>
            <div>страница ингредиента</div>
          </Route>
          <Route>
            <div>404</div>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;

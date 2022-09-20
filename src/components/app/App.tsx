import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// @ts-ignore
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AppHeader from '../app-header/AppHeader';
import { ForgotPasswordPage } from '../pages/forgot-password/ForgotPassword';
import { IngredientPage } from '../pages/ingredient/Ingredient';
import { LoginPage } from '../pages/login/Login';
import { MainPage } from '../pages/main/Main';
import { ProfilePage } from '../pages/profile/Profile';
import { RegisterPage } from '../pages/register/Register';
import { ResetPasswordPage } from '../pages/reset-password/ResetPassword';
import { ProtectedRoute } from '../protected-route/ProtectedRoute';
import { getIngredients } from '../../services/actions';

function App() {
  const dispatch = useDispatch();

  useEffect(()=> {
    // @ts-ignore
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <Router>
        <AppHeader />
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
          <ProtectedRoute path="/profile">
            <ProfilePage />
          </ProtectedRoute>
          <Route path="/ingredients/:id" exact={true}>
            <IngredientPage />
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

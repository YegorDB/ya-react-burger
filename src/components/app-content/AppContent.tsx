import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import { BurgerIngredientsItemModal } from '../burger-ingredients/BurgerIngredients';
import { ProtectedRoute } from '../protected-route/ProtectedRoute';
import { ForgotPasswordPage } from '../../pages/forgot-password/ForgotPassword';
import { IngredientPage } from '../../pages/ingredient/Ingredient';
import { LoginPage } from '../../pages/login/Login';
import { MainPage } from '../../pages/main/Main';
import { ProfilePage } from '../../pages/profile/Profile';
import { RegisterPage } from '../../pages/register/Register';
import { ResetPasswordPage } from '../../pages/reset-password/ResetPassword';
import { TAppContentLocationState } from '../../types/router';

function AppContent() {
  const location = useLocation<TAppContentLocationState>();

  const ingredientLocation = location.state && location.state.ingredientLocation;

  return (
    <>
      <Switch location={ingredientLocation || location}>
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

      {ingredientLocation && (
        <Route path="/ingredients/:id" >
          <BurgerIngredientsItemModal />
        </Route>
      )}
    </>
  )
}

export default AppContent;

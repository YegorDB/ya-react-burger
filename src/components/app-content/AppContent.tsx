import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import { BurgerIngredientsItemModal } from '../burger-ingredients/BurgerIngredients';
import { FeedItemModal } from '../feed-item-modal/FeedItemModal';
import { ProtectedRoute } from '../protected-route/ProtectedRoute';
import { Feed } from '../../pages/feed/Feed';
import { FeedItem } from '../../pages/feed-item/FeedItem';
import { ForgotPasswordPage } from '../../pages/forgot-password/ForgotPassword';
import { IngredientPage } from '../../pages/ingredient/Ingredient';
import { LoginPage } from '../../pages/login/Login';
import { MainPage } from '../../pages/main/Main';
import { ProfilePage } from '../../pages/profile/Profile';
import { ProfileOrdersItem } from '../../pages/profile-orders-item/ProfileOrdersItem';
import { RegisterPage } from '../../pages/register/Register';
import { ResetPasswordPage } from '../../pages/reset-password/ResetPassword';
import { TAppContentLocationState } from '../../types/router';

function AppContent() {
  const location = useLocation<TAppContentLocationState>();

  const ingredientLocation = location.state && location.state.ingredientLocation;
  const feedItemLocation = location.state && location.state.feedItemLocation;
  const profileOrderLocation = location.state && location.state.profileOrderLocation;

  if (profileOrderLocation) {
    profileOrderLocation.state = {
      profileOrderId: location.state && location.state.profileOrderId
    };
  }

  return (
    <>
      <Switch location={ingredientLocation || feedItemLocation || profileOrderLocation || location}>
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
        <ProtectedRoute path="/profile/orders/:id" exact={true}>
          <ProfileOrdersItem />
        </ProtectedRoute>
        <ProtectedRoute path="/profile">
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/ingredients/:id" exact={true}>
          <IngredientPage />
        </Route>
        <Route path="/feed" exact={true}>
          <Feed />
        </Route>
        <Route path="/feed/:id" exact={true}>
          <FeedItem />
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

      {feedItemLocation && (
        <Route path="/feed/:id" >
          <FeedItemModal />
        </Route>
      )}

      {profileOrderLocation && (
        <Route path="/profile/orders/:id" >
          <FeedItemModal />
        </Route>
      )}
    </>
  )
}

export default AppContent;

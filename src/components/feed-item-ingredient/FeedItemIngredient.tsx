import React, { FC } from 'react';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { IngredientIcon } from '../ingredient-icon/IngredientIcon';
import { TFeedItemIngredientProps } from '../../types/props';

import styles from './FeedItemIngredient.module.css';

export const FeedItemIngredient: FC<TFeedItemIngredientProps> = ({ icon, name, price, count }) => {
  return (
    <div className={styles.FeedItemIngredient}>
      <IngredientIcon icon={icon} />
      <div className="ml-5">{ name }</div>
      <div className={styles.FeedItemPrice}>
        <p className="mr-2 text text_type_digits-default">{count} x {price}</p>
        <CurrencyIcon type="primary"/>
      </div>
    </div>
  );
}

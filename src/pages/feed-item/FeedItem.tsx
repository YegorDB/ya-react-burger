import cn from 'classnames';
import React, { FC } from 'react';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { FeedItemIngredient } from '../../components/feed-item-ingredient/FeedItemIngredient';
import { FeedItemStatus } from '../../components/feed-item-status/FeedItemStatus';

import styles from './FeedItem.module.css';

const FeedItemIngredients: FC = () => {
  const ingredientsData = [
    {
      name: 'Name 1',
      price: 1,
      count: 2,
    },
    {
      name: 'Name 2',
      price: 2,
      count: 1,
    },
    {
      name: 'Name 3',
      price: 3,
      count: 1,
    },
    {
      name: 'Name 4',
      price: 4,
      count: 1,
    },
    {
      name: 'Name 5',
      price: 5,
      count: 1,
    },
    {
      name: 'Name 6',
      price: 6,
      count: 1,
    },
  ];

  return (
    <div className={cn('custom-scroll', styles.FeedItemIngredients)}>
      {ingredientsData.map(data => (
        <FeedItemIngredient {...data} key={data.name} />
      ))}
    </div>
  );
}

export const FeedItem: FC = () => {
  const id = '0123456';
  const status = 'done';

  return (
    <main>
      <div className={ styles.FeedItem }>
        <p className={cn('mb-6 text text_type_digits-default', styles.FeedItemId)}>#{ id }</p>
        <p className="mb-2 text text_type_main-medium">
          Name
        </p>
        <FeedItemStatus mode={ status } />
        <p className="mb-2 text text_type_main-medium">
          Состав:
        </p>
        <FeedItemIngredients />
        <div className={cn('mt-4', styles.FeedItemBottom)}>
          <p className="text text_type_main-default text_color_inactive">0000-00-00</p>
          <div className={styles.FeedItemPrice}>
            <p className="mr-2 text text_type_digits-default">{123}</p>
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      </div>
    </main>
  );
}
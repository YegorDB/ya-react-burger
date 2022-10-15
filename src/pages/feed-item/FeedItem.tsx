import cn from 'classnames';
import React, { FC } from 'react';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { IngredientIcon } from '../../components/ingredient-icon/IngredientIcon';

import styles from './FeedItem.module.css';

type FeedItemIngredient = {
  name: string,
  price: number,
  count: number,
}

const FeedItemIngredient: FC<FeedItemIngredient> = ({ name, price, count}) => {
  return (
    <div className={styles.FeedItemIngredient}>
      <IngredientIcon />
      <div className="ml-5">{ name }</div>
      <div className={styles.FeedItemPrice}>
        <p className="mr-2 text text_type_digits-default">{count} x {price}</p>
        <CurrencyIcon type="primary"/>
      </div>
    </div>
  );
}

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

type TFeedItemStatusProps = {
  mode: 'done' | 'inProgress' | 'canceled',
}

const FeedItemStatus: FC<TFeedItemStatusProps> = ({ mode }) => {
  const textByMode = {
    done: 'Выполнен',
    inProgress: 'Исполняется',
    canceled: 'Отменен',
  }

  return (
    <p className={ cn('mb-6 text text_type_main-default', styles[`FeedStatus-${mode}`]) }>
      { textByMode[mode] }
    </p>
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

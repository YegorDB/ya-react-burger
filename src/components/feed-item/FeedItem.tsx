import cn from 'classnames';
import React, { FC, useMemo } from 'react';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { FeedItemIngredient } from '../feed-item-ingredient/FeedItemIngredient';
import { FeedItemStatus } from '../feed-item-status/FeedItemStatus';
import { useSelector } from '../../hooks';
import { TIngredient } from '../../types/ingredient';
import { TFeedItemComponentProps, TFeedItemIngredientsProps } from '../../types/props';
import { parseIngredientsById } from '../../utils/parseIngredients';

import styles from './FeedItem.module.css';


const FeedItemIngredients: FC<TFeedItemIngredientsProps> = ({ ingredients }) => {
  const ingredientsData: Record<string, {item: TIngredient, count: number}> = {};
  for (const i of ingredients) {
    if (i._id in ingredientsData) {
      ingredientsData[i._id].count++;
    } else {
      ingredientsData[i._id] = {
        item: i,
        count: 1,
      };
    }
  }

  return (
    <div className={cn('custom-scroll', styles.FeedItemIngredients)}>
      {Object.values(ingredientsData).map(({item, count}) => {
        return (
          <FeedItemIngredient
            icon={item.image_mobile}
            name={item.name}
            price={item.price}
            count={count}
            key={item._id} />
        )
      })}
    </div>
  );
}

export const FeedItem: FC<TFeedItemComponentProps> = ({ feedOrder }) => {
  const { ingredients } = useSelector(state => ({
    ingredients: state.ingredients.items,
  }));

  const parsedIngredients = useMemo(
    () => parseIngredientsById(ingredients),
    [ingredients]
  )

  const orderIngredients: TIngredient[] = useMemo(
    () => {
      if (!feedOrder) return [];
      return feedOrder.ingredients.map(id => parsedIngredients[id]);
    },
    [feedOrder, parsedIngredients]
  )

  const price: number = useMemo(
    () => {
      if (!feedOrder) return 0;
      return orderIngredients.map(i => i.price).reduce((prev, curr) => prev + curr);
    },
    [feedOrder, orderIngredients]
  )

  if (!feedOrder) return null;

  const dateValue = (new Date(feedOrder.updatedAt)).toLocaleString();

  return (
    <>
      <p className="mb-2 text text_type_main-medium">
        { feedOrder.name }
      </p>
      <FeedItemStatus mode={ feedOrder.status } />
      <p className="mb-2 text text_type_main-medium">
        Состав:
      </p>
      <FeedItemIngredients ingredients={orderIngredients}/>
      <div className={cn('mt-4', styles.FeedItemBottom)}>
        <p className="text text_type_main-default text_color_inactive">{dateValue}</p>
        <div className={styles.FeedItemPrice}>
          <p className="mr-2 text text_type_digits-default">{price}</p>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </>
  );
}

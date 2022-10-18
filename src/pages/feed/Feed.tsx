import cn from 'classnames';
import React, { FC, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { FeedItemShort } from '../../components/feed-item-short/FeedItemShort';
import { useSelector, useDispatch } from '../../hooks';
import { WS_CONNECTION_FEED_START, SET_CURRENT_FEED_ORDER } from '../../services/actions';
import { TFeedInfoMainItemProps } from '../../types/props';
import { createFeedItemShortProps } from '../../utils/feed';
import { parseIngredientsById } from '../../utils/parseIngredients';

import styles from './Feed.module.css';


const FeedItems: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: WS_CONNECTION_FEED_START});
  }, [dispatch]);

  const { orders, ingredients } = useSelector(state => ({
    orders: state.feedWS.orders,
    ingredients: state.ingredients.items,
  }));

  const parsedIngredients = useMemo(
    () => parseIngredientsById(ingredients),
    [ingredients]
  )

  const itemsData = useMemo(
    () => orders.map(i => {
      return {
        ...createFeedItemShortProps(i, parsedIngredients),
        order: i,
      };
    }),
    [orders, parsedIngredients]
  );

  return (
    <div className={cn('custom-scroll', styles.FeedItems)}>
      {itemsData.map(data => {
        const handleOpenModal = () => {
          dispatch({
            type: SET_CURRENT_FEED_ORDER,
            feedOrder: data.order,
          });
        }

        return (
          <Link
            to={{
              pathname: `/feed/${data.id}`,
              state: { feedItemLocation: location }
            }}
            key={data.id}
            className="undecorated-link"
            onClick={handleOpenModal}
          >
            <FeedItemShort {...data} />
          </Link>
        );
      })}
    </div>
  );
}

const FeedInfoMainItem: FC<TFeedInfoMainItemProps> = ({title, orderIds, highlighted}) => {
  return (
    <div className={styles.FeedInfoMainItem}>
      <p className="mb-4 text text_type_main-medium">{ title }</p>
      <div className={styles.FeedInfoMainItemList}>
        {orderIds.map(id => (
          <p
            className={cn(
              'mb-1 text text_type_digits-default',
              {[styles.FeedInfoMainItemHighlighted]: highlighted}
            )}
            key={ id }
          >
            { id }
          </p>
        ))}
      </div>
    </div>
  );
}

const FeedInfoMain: FC = () => {
  const { orders } = useSelector(state => state.feedWS);

  const pendingOrders = useMemo(
    () => orders.filter(i => i.status === 'pending').map(i => i.number).slice(0, 10),
    [orders]
  );
  const doneOrders = useMemo(
    () => orders.filter(i => i.status === 'done').map(i => i.number).slice(0, 10),
    [orders]
  );

  return (
    <div className={styles.FeedInfoMain}>
      <FeedInfoMainItem title="Готовы:" orderIds={doneOrders} highlighted />
      <FeedInfoMainItem title="В работе:" orderIds={pendingOrders}/>
    </div>
  );
}

const FeedInfo: FC = () => {
  const { total, totalToday } = useSelector(state => state.feedWS);

  return (
    <div className="mt-25 pl-4 pr-4">
      <FeedInfoMain />
      <p className="mt-8 text text_type_main-medium">Выполнено за все время</p>
      <p className="text text_type_digits-large">{total}</p>
      <p className="mt-8 text text_type_main-medium">Выполнено за сегодня</p>
      <p className="text text_type_digits-large">{totalToday}</p>
    </div>
  );
}

export const Feed: FC = () => {
  return (
    <main className={styles.Feed}>
      <div className={styles.FeedHalf}>
        <p className="mt-10 mb-5 text text_type_main-large">
          Лента заказов
        </p>
        <FeedItems />
      </div>
      <div className={styles.FeedHalf}>
        <FeedInfo />
      </div>
    </main>
  );
}

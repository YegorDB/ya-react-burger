import cn from 'classnames';
import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { FeedItem as FeedItemComponent} from '../../components/feed-item/FeedItem';
import { useSelector, useDispatch } from '../../hooks';
import { WS_CONNECTION_FEED_START, WS_CONNECTION_FEED_END } from '../../services/actions';
import { TFeedItemComponentProps } from '../../types/props';
import { TFeedItemParams } from '../../types/router';

import styles from './FeedItem.module.css';

export const FeedItemContent: FC<TFeedItemComponentProps> = ({ feedOrder }) => {
  if (!feedOrder) return null;

  return (
    <div className={ styles.FeedItem }>
      <p className={cn('mb-6 text text_type_digits-default', styles.FeedItemId)}>#{feedOrder.number}</p>
      <FeedItemComponent feedOrder={feedOrder}/>
    </div>
  );
}

export const FeedItem: FC = () => {
  const dispatch = useDispatch();
  const { id: feedItemId } = useParams<TFeedItemParams>();
  const { orders } = useSelector(state => state.feedWS);

  useEffect(() => {
    dispatch({type: WS_CONNECTION_FEED_START});
    return () => {dispatch({type: WS_CONNECTION_FEED_END})};
  }, [dispatch]);

  const feedOrder = orders.find(order => order._id === feedItemId);

  return (
    <main>
      <FeedItemContent feedOrder={feedOrder} />
    </main>
  );
}

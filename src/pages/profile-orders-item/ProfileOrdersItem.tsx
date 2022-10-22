import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { FeedItemContent } from '../feed-item/FeedItem'
import { useSelector, useDispatch } from '../../hooks';
import { WS_CONNECTION_PROFILE_ORDERS_START, WS_CONNECTION_PROFILE_ORDERS_END } from '../../services/actions';
import { TProfileOrderItemParams } from '../../types/router';

export const ProfileOrdersItem: FC = () => {
  const dispatch = useDispatch();
  const { id: feedItemId } = useParams<TProfileOrderItemParams>();
  const { orders } = useSelector(state => state.profileOrdersWS);

  useEffect(() => {
    dispatch({type: WS_CONNECTION_PROFILE_ORDERS_START});
    return () => {dispatch({type: WS_CONNECTION_PROFILE_ORDERS_END})};
  }, [dispatch]);

  const feedOrder = orders.find(order => order._id === feedItemId);

  return (
    <main>
      <FeedItemContent feedOrder={feedOrder} />
    </main>
  );
}

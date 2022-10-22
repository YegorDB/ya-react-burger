import React, { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Modal from '../modal/Modal';
import { FeedItem } from '../feed-item/FeedItem';
import { useSelector, useDispatch } from '../../hooks';
import { SET_CURRENT_FEED_ORDER } from '../../services/actions';
import { TFeedItemParams } from '../../types/router';

import styles from './FeedItemModal.module.css';

export const FeedItemModal: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id: feedItemId } = useParams<TFeedItemParams>();

  let { feedOrder, orders } = useSelector(state => ({
    feedOrder: state.currentFeedOrder.feedOrder,
    orders: [
      ...state.feedWS.orders,
      ...state.profileOrdersWS.orders,
    ],
  }));

  if (!feedOrder) {
    feedOrder = orders.find(order => order._id === feedItemId) || null;
  }

  const handleCloseModal = () => {
    dispatch({
      type: SET_CURRENT_FEED_ORDER,
      feedOrder: null,
    });
    history.goBack();
  }

  return (feedOrder && (
    <Modal handleClose={handleCloseModal} title={`#${feedOrder.number}`}>
      <div className={styles.FeedItemModal}>
        <FeedItem feedOrder={feedOrder} />
      </div>
    </Modal>
  ));
}

import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import Modal from '../modal/Modal';
import { FeedItem } from '../feed-item/FeedItem';
import { useSelector, useDispatch } from '../../hooks';
import { SET_CURRENT_FEED_ORDER } from '../../services/actions';

import styles from './FeedItemModal.module.css';

export const FeedItemModal: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { feedOrder } = useSelector(state => state.currentFeedOrder);

  const handleCloseModal = () => {
    dispatch({
      type: SET_CURRENT_FEED_ORDER,
      feedOrder: null,
    });
    history.goBack();
  }

  return (
    <Modal handleClose={handleCloseModal} title={`#${feedOrder?.number}`}>
      {feedOrder && (
        <div className={styles.FeedItemModal}>
          <FeedItem feedOrder={feedOrder} />
        </div>
      )}
    </Modal>
  );
}

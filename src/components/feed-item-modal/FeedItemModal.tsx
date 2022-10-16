import React, { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Modal from '../modal/Modal';
import { FeedItem } from '../feed-item/FeedItem';
import { TFeedItemParams } from '../../types/router';

export const FeedItemModal: FC = () => {
  const history = useHistory();
  const { id: feedItemId } = useParams<TFeedItemParams>();

  const handleCloseModal = () => {
    history.goBack();
  }

  return (
    <Modal handleClose={handleCloseModal} title={`#${feedItemId}`}>
      <div style={{width: 600}}>
        <FeedItem />
      </div>
    </Modal>
  );
}

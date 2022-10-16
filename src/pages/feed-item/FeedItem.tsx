import cn from 'classnames';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { FeedItem as FeedItemComponent} from '../../components/feed-item/FeedItem';
import { TFeedItemParams } from '../../types/router';

import styles from './FeedItem.module.css';

export const FeedItem: FC = () => {
  const { id: feedItemId } = useParams<TFeedItemParams>();

  return (
    <main>
      <div className={ styles.FeedItem }>
        <p className={cn('mb-6 text text_type_digits-default', styles.FeedItemId)}>#{feedItemId}</p>
        <FeedItemComponent />
      </div>
    </main>
  );
}

import React, { FC } from 'react';

import { FeedItem as FeedItemComponent} from '../../components/feed-item/FeedItem';

import styles from './FeedItem.module.css';

export const FeedItem: FC = () => {
  return (
    <main>
      <div className={ styles.FeedItem }>
        <FeedItemComponent />
      </div>
    </main>
  );
}

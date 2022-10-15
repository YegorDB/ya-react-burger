import cn from 'classnames';
import React, { FC } from 'react';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { IngredientIcon } from '..//ingredient-icon/IngredientIcon';
import { FeedItemStatus } from '..//feed-item-status/FeedItemStatus';
import { TFeedItemProps, TFeedItemIconsProps } from '../../types/props';

import styles from './FeedItem.module.css';


const FeedItemIcons: FC<TFeedItemIconsProps> = ({icons}) => {
  return (
    <div className={styles.FeedItemIcons}>
      {icons.map((icon, i) => (
        <div style={{zIndex: 100 - i}} key={icon} className={styles.FeedItemIconWrapper}>
          <IngredientIcon />
        </div>
      ))}
    </div>
  );
}

export const FeedItem: FC<TFeedItemProps> = ({ id, name, price, date, icons, status }) => {
  return (
    <div className={styles.FeedItem}>
      <div>
        <div className={styles.FeedItemRow}>
          <p className="mb-4 text text_type_digits-default">#{ id }</p>
          <p className={cn('text text_type_main-default text_color_inactive', styles.FeedItemDate)}>{ date }</p>
        </div>
        <p className="mb-4 text text_type_main-medium">{ name }</p>
        {status && <FeedItemStatus mode={ status } />}
        <div className={styles.FeedItemRow}>
          <FeedItemIcons icons={icons} />
          <div className={styles.FeedItemPrice}>
            <p className="mr-2 text text_type_digits-default">{price}</p>
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      </div>
    </div>
  );
}

import cn from 'classnames';
import React, { FC } from 'react';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { IngredientIcon } from '../ingredient-icon/IngredientIcon';
import { FeedItemStatus } from '../feed-item-status/FeedItemStatus';
import { TFeedItemShortProps, TFeedItemShortIconsProps } from '../../types/props';

import styles from './FeedItemShort.module.css';


const FeedItemShortIcons: FC<TFeedItemShortIconsProps> = ({icons}) => {
  return (
    <div className={styles.FeedItemShortIcons}>
      {icons.map((icon, i) => (
        <div style={{zIndex: 100 - i}} key={icon} className={styles.FeedItemShortIconWrapper}>
          <IngredientIcon />
        </div>
      ))}
    </div>
  );
}

export const FeedItemShort: FC<TFeedItemShortProps> = ({ id, name, price, date, icons, status }) => {
  return (
    <div className={styles.FeedItemShort}>
      <div>
        <div className={styles.FeedItemShortRow}>
          <p className="mb-4 text text_type_digits-default">#{ id }</p>
          <p className={cn('text text_type_main-default text_color_inactive', styles.FeedItemShortDate)}>{ date }</p>
        </div>
        <p className="mb-4 text text_type_main-medium">{ name }</p>
        {status && <FeedItemStatus mode={ status } />}
        <div className={styles.FeedItemShortRow}>
          <FeedItemShortIcons icons={icons} />
          <div className={styles.FeedItemShortPrice}>
            <p className="mr-2 text text_type_digits-default">{price}</p>
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      </div>
    </div>
  );
}

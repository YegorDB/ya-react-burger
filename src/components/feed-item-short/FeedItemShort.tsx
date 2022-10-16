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
        <div style={{zIndex: 100 - i}} key={`${icon}-${i}`} className={styles.FeedItemShortIconWrapper}>
          <IngredientIcon icon={icon} />
        </div>
      ))}
    </div>
  );
}

export const FeedItemShort: FC<TFeedItemShortProps> = ({ number, name, price, date, icons, status }) => {
  const dateValue = (new Date(date)).toLocaleString();

  return (
    <div className={styles.FeedItemShort}>
      <div>
        <div className={styles.FeedItemShortRow}>
          <p className="mb-4 text text_type_digits-default">#{ number }</p>
          <p className={cn('text text_type_main-default text_color_inactive', styles.FeedItemShortDate)}>{ dateValue }</p>
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

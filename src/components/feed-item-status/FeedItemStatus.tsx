import cn from 'classnames';
import React, { FC } from 'react';

import { TFeedItemStatusProps } from '../../types/props';

import styles from './FeedItemStatus.module.css';

export const FeedItemStatus: FC<TFeedItemStatusProps> = ({ mode }) => {
  const textByMode = {
    created: 'Создан',
    done: 'Выполнен',
    pending: 'Исполняется',
    canceled: 'Отменен',
  }

  return (
    <p className={ cn('mb-6 text text_type_main-default', styles[`FeedStatus-${mode}`]) }>
      { textByMode[mode] }
    </p>
  );
}

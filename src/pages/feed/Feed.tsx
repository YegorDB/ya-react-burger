import cn from 'classnames';
import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { FeedItemShort } from '../../components/feed-item-short/FeedItemShort';

import styles from './Feed.module.css';


const FeedItems: FC = () => {
  const location = useLocation();

  const itemsData = [
    {
      id: '000001',
      name: 'Name 1',
      price: 1,
      date: '0000-00-00',
      icons: ['1', '2', '3', '4', '5'],
    },
    {
      id: '000002',
      name: 'Name 2',
      price: 2,
      date: '0000-00-00',
      icons: ['1', '2', '3', '4', '5'],
    },
    {
      id: '000003',
      name: 'Name 3',
      price: 3,
      date: '0000-00-00',
      icons: ['1', '2', '3', '4', '5'],
    },
    {
      id: '000004',
      name: 'Name 4',
      price: 4,
      date: '0000-00-00',
      icons: ['1', '2', '3', '4', '5'],
    },
    {
      id: '000005',
      name: 'Name 5',
      price: 5,
      date: '0000-00-00',
      icons: ['1', '2', '3', '4', '5'],
    },
    {
      id: '000006',
      name: 'Name 6',
      price: 6,
      date: '0000-00-00',
      icons: ['1', '2', '3', '4', '5'],
    },
  ];

  return (
    <div className={cn('custom-scroll', styles.FeedItems)}>
      {itemsData.map(data => (
        <Link
          to={{
            pathname: `/feed/${data.id}`,
            state: { feedItemLocation: location }
          }}
          key={data.id}
          className="undecorated-link"
        >
          <FeedItemShort {...data} />
        </Link>
      ))}
    </div>
  );
}

type TFeedInfoMainItemProps = {
  title: string,
  orderIds: string[],
  highlighted?: boolean,
}

const FeedInfoMainItem: FC<TFeedInfoMainItemProps> = ({title, orderIds, highlighted}) => {
  return (
    <div className={styles.FeedInfoMainItem}>
      <p className="mb-4 text text_type_main-medium">{ title }</p>
      {orderIds.map(id => (
        <p
          className={cn(
            'mb-1 text text_type_digits-default',
            {[styles.FeedInfoMainItemHighlighted]: highlighted}
          )}
          key={ id }
        >
          { id }
        </p>
      ))}
    </div>
  );
}

const FeedInfoMain: FC = () => {
  return (
    <div className={styles.FeedInfoMain}>
      <FeedInfoMainItem title="Готовы:" orderIds={['000001', '000002', '000003', '000004', '000005']} highlighted />
      <FeedInfoMainItem title="В работе:" orderIds={['000006', '000007', '000008']}/>
    </div>
  );
}

const FeedInfo: FC = () => {
  return (
    <div className="mt-25 pl-4 pr-4">
      <FeedInfoMain />
      <p className="mt-8 text text_type_main-medium">Выполнено за все время</p>
      <p className="text text_type_digits-large">12345</p>
      <p className="mt-8 text text_type_main-medium">Выполнено за сегодня</p>
      <p className="text text_type_digits-large">123</p>
    </div>
  );
}

export const Feed: FC = () => {
  return (
    <main className={styles.Feed}>
      <div className={styles.FeedHalf}>
        <p className="mt-10 mb-5 text text_type_main-large">
          Лента заказов
        </p>
        <FeedItems />
      </div>
      <div className={styles.FeedHalf}>
        <FeedInfo />
      </div>
    </main>
  );
}

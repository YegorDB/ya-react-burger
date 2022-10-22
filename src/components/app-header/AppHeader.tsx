import cn from 'classnames';
import React, { FC } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { TAppHeaderItemProps } from '../../types/props';

import styles from './AppHeader.module.css';

const AppHeaderItem: FC<TAppHeaderItemProps> = ({
  icon: Icon,
  text,
  highlighted,
}) => {
  return (
    <div className={cn('mr-2 mb-3 mt-3 pl-5 pr-5 pb-4 pt-4', styles.AppHeaderItem, !highlighted && 'text_color_inactive')}>
      <Icon type="primary" />
      <p className="ml-2 text text_type_main-default">
        { text }
      </p>
    </div>
  );
}

const AppHeader: FC = () => {
  const matchRoot = useRouteMatch('/');
  const matchFeed = useRouteMatch('/feed');
  const matchProfile = useRouteMatch('/profile');

  return (
    <header className={styles.AppHeader}>
      <div className={styles.AppHeaderLinks}>
        <Link to='/' className="undecorated-link">
          <AppHeaderItem icon={BurgerIcon} text="Конструктор" highlighted={matchRoot?.isExact}/>
        </Link>
        <Link to='/feed' className="undecorated-link">
          <AppHeaderItem icon={ListIcon} text="Лента заказов" highlighted={!!matchFeed}/>
        </Link>
      </div>
      <div className="pt-4">
        <Link to='/' className="undecorated-link">
          <Logo />
        </Link>
      </div>
      <div className={styles.AppHeaderProfile}>
        <Link to='/profile' className="undecorated-link">
          <AppHeaderItem icon={ProfileIcon} text="Личный кабинет" highlighted={!!matchProfile}/>
        </Link>
      </div>
    </header>
  );
}

export default AppHeader;

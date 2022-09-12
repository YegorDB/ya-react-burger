import cn from 'classnames';
import React from 'react';
// @ts-ignore
import { Link, useRouteMatch } from 'react-router-dom';

import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './AppHeader.module.css';

function AppHeaderItem(props: {
  icon: Function,
  text: String,
  highlighted?: boolean
}) {
  return (
    <div className={cn('mr-2 mb-3 mt-3 pl-5 pr-5 pb-4 pt-4', styles.AppHeaderItem, !props.highlighted && 'text_color_inactive')}>
      <props.icon type="primary" />
      <p className="ml-2 text text_type_main-default">
        {props.text}
      </p>
    </div>
  );
}

function AppHeader() {
  const matchRoot = useRouteMatch('/');
  const matchProfile = useRouteMatch('/profile');

  return (
    <header className={styles.AppHeader}>
      <div className={styles.AppHeaderLinks}>
        <Link to='/' className="undecorated-link">
          <AppHeaderItem icon={BurgerIcon} text="Конструктор" highlighted={matchRoot.isExact}/>
        </Link>
        <AppHeaderItem icon={ListIcon} text="Лента заказов"/>
      </div>
      <div className="pt-4">
        <Logo />
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

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

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
}) {
  const className = classNames('mr-2 mb-3 mt-3 pl-5 pr-5 pb-4 pt-4', styles.AppHeaderItem);

  return (
    <div className={className}>
      <props.icon type="primary" />
      <p className="ml-2 text text_type_main-default">
        {props.text}
      </p>
    </div>
  );
}

AppHeaderItem.propTypes = {
  icon: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

function AppHeader() {
  return (
    <header className={styles.AppHeader}>
      <div className={styles.AppHeaderLinks}>
        <AppHeaderItem icon={BurgerIcon} text="Конструктор"/>
        <AppHeaderItem icon={ListIcon} text="Лента заказов"/>
      </div>
      <div className="pt-4">
        <Logo />
      </div>
      <div className={styles.AppHeaderProfile}>
        <AppHeaderItem icon={ProfileIcon} text="Личный кабинет"/>
      </div>
    </header>
  );
}

export default AppHeader;

import React, { FC } from 'react';

import styles from './IngredientIcon.module.css';

type TIngredientIconProps = {
  icon?: string,
}

export const IngredientIcon: FC<TIngredientIconProps> = ({ icon }) => {
  return (
    <div style={{backgroundImage: `url(${icon})`}} className={styles.IngredientIcon} />
  );
}

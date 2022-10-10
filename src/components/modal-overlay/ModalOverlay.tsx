import React, { FC } from 'react';

import { TModalOverlayProps } from '../../types/props';

import styles from './ModalOverlay.module.css';

const ModalOverlay: FC<TModalOverlayProps> = ({ closeHandler }) => {
  return (
    <div onClick={closeHandler} className={styles.ModalOverlay}></div>
  );
}

export default ModalOverlay;

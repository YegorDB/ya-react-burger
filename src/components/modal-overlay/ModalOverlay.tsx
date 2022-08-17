import React from 'react';

import styles from './ModalOverlay.module.css';

function ModalOverlay(props: {
  closeHandler: React.MouseEventHandler,
}) {
  const {closeHandler} = props;

  return (
    <div onClick={closeHandler} className={styles.ModalOverlay}></div>
  );
}

export default ModalOverlay;

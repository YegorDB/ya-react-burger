import PropTypes from 'prop-types';
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

ModalOverlay.propTypes = {
  closeHandler: PropTypes.func.isRequired,
};

export default ModalOverlay;

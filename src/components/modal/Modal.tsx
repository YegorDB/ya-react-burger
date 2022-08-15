import cn from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import ModalOverlay from '../modal-overlay/ModalOverlay';

import styles from './Modal.module.css';

const modalRoot = document.getElementById('modals');

function ModalHeader(props: {
  closeHandler: React.MouseEventHandler,
  title?: string,
}) {
  const {closeHandler, title} = props;

  return (
    <div className={styles.ModalHeader}>
      <p className="mr-10 text text_type_main-large">{title}</p>
      <div onClick={closeHandler} className={styles.ModalHeaderClose}>
        <CloseIcon type="primary" />
      </div>
    </div>
  );
}

function Modal(props: {
  handleClose: Function,
  children: React.ReactNode,
  title?: string,
}) {
  const {handleClose, children, title} = props;

  const closeHandler = React.useCallback(() => handleClose(), [handleClose]);

  React.useEffect(() => {
    const handler = (e: {keyCode: number}) => {
      if (e.keyCode !== 27) return;
      handleClose();
    };

    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [handleClose]);

  return (modalRoot && (
    ReactDOM.createPortal(
      <>
        <ModalOverlay closeHandler={closeHandler} />
        <div className={cn('p-10', styles.Modal)}>
          <ModalHeader closeHandler={closeHandler} title={title} />
          {children}
        </div>
      </>,
      modalRoot
    )
  ));
}

export default Modal;

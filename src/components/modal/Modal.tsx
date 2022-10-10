import cn from 'classnames';
import React, { FC } from 'react';
import ReactDOM from 'react-dom';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import ModalOverlay from '../modal-overlay/ModalOverlay';
import { TModalHeaderProps, TModalProps } from '../../types/props';

import styles from './Modal.module.css';

const modalRoot = document.getElementById('modals');

const ModalHeader: FC<TModalHeaderProps> = ({
  closeHandler,
  title,
}) => {
  return (
    <div className={styles.ModalHeader}>
      <p className="mr-10 text text_type_main-large">{title}</p>
      <div onClick={closeHandler} className={styles.ModalHeaderClose}>
        <CloseIcon type="primary" />
      </div>
    </div>
  );
}

const Modal: FC<TModalProps> = ({
  handleClose,
  children,
  title,
}) => {
  const closeHandler = React.useCallback(() => handleClose(), [handleClose]);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      handleClose();
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
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

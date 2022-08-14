import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './Modal.module.css';

const modalRoot = document.getElementById('modals');

function ModalOverlay(props: {
  closeHandler: React.MouseEventHandler,
}) {
  const {closeHandler} = props;

  return <div onClick={closeHandler} className={styles.ModalOverlay}></div>;
}

ModalOverlay.propTypes = {
  closeHandler: PropTypes.func.isRequired,
};

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

ModalHeader.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  title: PropTypes.string,
};

function Modal(props: {
  closeHandler: React.MouseEventHandler,
  children: React.ReactNode,
  title?: string,
}) {
  const {closeHandler, children, title} = props;

  return (
    <div className={cn('p-10', styles.Modal)}>
      <ModalHeader closeHandler={closeHandler} title={title} />
      {children}
    </div>
  );
}

Modal.propTypes = {
  closeHandler: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

function ModalWrapper(props: {
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
        <Modal closeHandler={closeHandler} title={title}>
          {children}
        </Modal>
      </>,
      modalRoot
    )
  ));
}

ModalWrapper.propTypes = {
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default ModalWrapper;

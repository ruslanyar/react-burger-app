import { FC, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverlay from '../modal-overlay/modal-overlay';

import { ESC_KEY } from '../../utils/constants';
import { IModalProps } from './modal.types';

import styles from './modal.module.css';

const Modal: FC<IModalProps> = ({ children, close }) => {
  const handleEscClose = useCallback(
    (evt: KeyboardEvent) => {
      if (evt.key === ESC_KEY) {
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);

    return () => document.removeEventListener('keydown', handleEscClose);
  }, [handleEscClose]);

  return createPortal(
    <ModalOverlay close={close}>
      <div className={clsx(styles.container, 'pt-10', 'pb-15', 'pl-10', 'pr-10')}>
        <div onClick={close} className={styles.close}>
          <CloseIcon type='primary' />
        </div>
        {children}
      </div>
    </ModalOverlay>,
    document.querySelector('#modal')!
  );
}

export default Modal;

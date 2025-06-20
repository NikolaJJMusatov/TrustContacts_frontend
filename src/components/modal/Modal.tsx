import { createPortal } from 'react-dom';
import "./Modal.css"
import { memo, useEffect, type FC, type ReactNode, type SyntheticEvent } from 'react';
import { ModalOverlay } from '../modal-overlay/Modal-overlay';

type TModalProps = {
  onClose: () => void;
  children?: ReactNode;
  visible: boolean;
};

const modalRoot = document.getElementById('modals');

export const Modal: FC<TModalProps> =  memo(({ onClose, children, visible }) => {
  const stopPropagation = (e: SyntheticEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [visible, onClose]);

  if (!visible) return null;
  
  return createPortal(
    <>
      <div className="modal" onClick={stopPropagation}>
        <button className="button" type="button" onClick={onClose}>
          X
        </button>
        <div className="content">{children}</div>
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalRoot as HTMLDivElement
  );
})

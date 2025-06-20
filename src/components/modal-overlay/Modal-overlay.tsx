import type { FC, SyntheticEvent } from 'react';
import './Modal-overlay.css'

type TModalOverlayProps = {
  onClick?: (e: SyntheticEvent) => void;
};

export const ModalOverlay: FC<TModalOverlayProps> = ({ onClick }) => (
  <div className='overlay' onClick={onClick} data-cy={'modal_overlay'} />
);

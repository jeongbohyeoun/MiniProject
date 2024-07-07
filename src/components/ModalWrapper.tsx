import React, { ReactNode } from 'react';

interface ModalWrapperProps {
  onOverlayClick: () => void;
  children: ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ onOverlayClick, children }) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget !== e.target) {
      onOverlayClick();
    }
  };

  return <div onClick={handleOverlayClick}>{children}</div>;
};

export default ModalWrapper;

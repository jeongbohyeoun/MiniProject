import { useEffect, useRef } from 'react';

interface ModalType {
  setModalOpen: (open: boolean) => void;
}

const SuccessModal = ({ setModalOpen }: ModalType): JSX.Element => {
  const modalRef = useRef<HTMLDivElement>(null);

  const clickOutSide = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', clickOutSide);
    return () => {
      document.removeEventListener('mousedown', clickOutSide);
    };
  });

  const closeModal = () => {
    setModalOpen(false);
    window.location.href = '/';
  };

  return (
    <>
      <div className="backdrop">
        <div className="successModal">
          <div className="successModal__inner">
            <div className="successModal__image">
              <svg xmlns="http://www.w3.org/2000/svg" width="62" height="62" viewBox="0 0 62 62" fill="none">
                <path
                  d="M41.2557 35.7275C38.9443 37.0761 37.0287 39.0095 35.7015 41.3333L29.8373 30.0442L19.7882 40.0417L20.6665 46.5L17.954 49.2383L13.3815 40.9975L5.1665 36.4508L7.90484 33.7125L14.3115 34.6167L24.3607 24.5417L5.1665 14.5183L8.809 10.8758L32.5757 16.3525L42.6248 6.30334C42.9829 5.94092 43.4093 5.65318 43.8793 5.45679C44.3494 5.2604 44.8537 5.15928 45.3632 5.15928C45.8726 5.15928 46.377 5.2604 46.847 5.45679C47.3171 5.65318 47.7435 5.94092 48.1015 6.30334C49.5998 7.8275 49.5998 10.3333 48.1015 11.78L38.0523 21.8292L41.2557 35.7275ZM55.1282 40.92L45.854 50.1942L41.7465 46.0867L38.7498 49.0833L45.854 56.8333L58.1248 44.5625L55.1282 40.92Z"
                  fill="#0F672A"
                />
              </svg>
            </div>
            <div className="successModal__title">예약이 완료되었습니다</div>
            <div className="successModal__content">즐거운 여행 되세요!</div>
            <button className="successModal__button" onClick={() => closeModal()}>
              확인
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessModal;

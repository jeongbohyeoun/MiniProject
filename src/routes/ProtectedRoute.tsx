import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';
import ModalWrapper from '../components/ModalWrapper';

interface ProtectedRouteProps {
  component: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
  const { user, login, signup } = useAuth();
  const [hasCheckedUser, setHasCheckedUser] = useState(false);
  const prevUserRef = useRef(user);
  const {
    isLoginModalOpen,
    openLoginModal,
    closeLoginModal,
    isSignupModalOpen,
    openSignupModal,
    closeSignupModal,
  } = useModal();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { accommodationId, productId } = useParams<{ accommodationId: string; productId: string }>();
  const checkInDate = searchParams.get('checkInDate') || '';
  const checkOutDate = searchParams.get('checkOutDate') || '';
  const personNumber = searchParams.get('personNumber') || '';

  useEffect(() => {
    if (!hasCheckedUser) {
      if (!user) {
        openLoginModal();
      }
      setHasCheckedUser(true);
    }
  }, [user, openLoginModal, hasCheckedUser]);

  useEffect(() => {
    if (prevUserRef.current && !user) {
      navigate(
        `/accommodations/${accommodationId}/${productId}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&personNumber=${personNumber}`,
      );
    }
    prevUserRef.current = user;
  }, [user, navigate, accommodationId, productId, checkInDate, checkOutDate, personNumber]);

  const handleLoginModalClose = () => {
    closeLoginModal();
  };

  const handleSignupModalClose = () => {
    closeSignupModal();
  };

  const handleOverlayClick = () => {
    closeLoginModal();
    closeSignupModal();
    navigate(
      `/accommodations/${accommodationId}/${productId}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&personNumber=${personNumber}`,
    );
  };

  return user ? (
    <Component />
  ) : (
    <>
      {isLoginModalOpen && (
        <ModalWrapper onOverlayClick={handleOverlayClick}>
          <LoginModal
            handleClose={handleLoginModalClose}
            handleLogin={login}
            openSignupModal={() => {
              closeLoginModal();
              openSignupModal();
            }}
          />
        </ModalWrapper>
      )}
      {isSignupModalOpen && (
        <ModalWrapper onOverlayClick={handleOverlayClick}>
          <SignupModal
            handleClose={handleSignupModalClose}
            handleSignup={signup}
            openLoginModal={() => {
              closeSignupModal();
              openLoginModal();
            }}
          />
        </ModalWrapper>
      )}
    </>
  );
};

export default ProtectedRoute;

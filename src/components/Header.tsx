import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.svg';
import Placeholder from '../assets/profile-loggedout.svg';
import Profile from '../assets/profile-loggedin.svg';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import SignupSuccessModal from './SignupSuccessModal';
import { useAuth } from '../context/AuthContext';
import ReserveConfirm from './ReserveConfirm';
import { getAuthHeaders } from '../../src/api/auth';

const Header = () => {
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignupSuccessModalOpen, setSignupSuccessModalOpen] = useState(false);
  const [isReservationsModalOpen, setReservationsModalOpen] = useState(false);
  const [reservations, setReservations] = useState([]);
  const { user, login, signup, logout } = useAuth();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const headers = new Headers({
          'Content-Type': 'application/json',
        });
        const authHeaders = getAuthHeaders();
        if (authHeaders['access-token']) {
          headers.append('access-token', authHeaders['access-token']);
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL_PROXY}/api/reservation/history`, {
          headers,
        });

        const data = await response.json();
        const transformedData = data.reservation_history_list.map((item: any) => ({
          checkInDate: item.check_in_date,
          checkOutDate: item.check_out_date,
          standardNumber: item.standard_number,
          maximumNumber: item.maximum_number,
          imageUrl: item.image_url,
          personNumber: item.person_number,
          price: item.price,
          night: item.night,
          accommodationName: item.accommodation_name,
          accommodationId: item.id,
          roomType: item.room_type,
          productId: item.id,
          checkInValid: true,
          checkOutValid: true,
        }));
        setReservations(transformedData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (user) {
      fetchReservations();
    }
  }, [user]);

  const openLoginModal = () => {
    setSignupModalOpen(false);
    setLoginModalOpen(true);
  };

  const openSignupModal = () => {
    setLoginModalOpen(false);
    setSignupModalOpen(true);
  };

  const openReservationsModal = () => {
    if (user) {
      if (reservations.length === 0) {
        alert('결제 내역이 없습니다');
      } else {
        setReservationsModalOpen(true);
      }
    } else {
      openLoginModal();
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src={Logo} alt="logo" className="logo" />
        </Link>
        <div className="nav">
          {user ? (
            <>
              <button onClick={openReservationsModal} className="nav-btn">
                결제 내역
              </button>
              <div className="profile">
                <button onClick={logout} className="nav-btn">
                  로그아웃
                </button>
                <img src={Profile} alt="profile" className="profile-img" />
              </div>
            </>
          ) : (
            <>
              <button onClick={() => setSignupModalOpen(true)} className="nav-btn">
                회원가입
              </button>
              <div className="profile">
                <button onClick={openLoginModal} className="nav-btn">
                  로그인
                </button>
                <img src={Placeholder} className="profile-img" alt="placeholder" />
              </div>
            </>
          )}
        </div>
      </div>
      {isLoginModalOpen && (
        <LoginModal
          handleClose={() => setLoginModalOpen(false)}
          openSignupModal={openSignupModal}
          handleLogin={login}
        />
      )}
      {isSignupModalOpen && (
        <SignupModal
          handleClose={() => setSignupModalOpen(false)}
          openLoginModal={openLoginModal}
          handleSignup={signup}
        />
      )}
      {isSignupSuccessModalOpen && (
        <SignupSuccessModal handleClose={() => setSignupSuccessModalOpen(false)} />
      )}
      {isReservationsModalOpen && <ReserveConfirm closeModal={() => setReservationsModalOpen(false)} />}
    </header>
  );
};

export default Header;

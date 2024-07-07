import React, { useState } from 'react';
import Logo from '../assets/Logo.svg';

interface LoginModalProps {
  handleClose: () => void;
  handleLogin: (email: string, password: string) => Promise<void>;
  openSignupModal: () => void;
}

function LoginModal({ handleClose, handleLogin, openSignupModal }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleLogin(email, password);
      handleClose();
    } catch (error) {
      setErrorMessage('로그인 실패했습니다. 다시 시도해주세요.');
      console.error('로그인 실패했습니다', error);
    }
  };

  const handleOverlayClick = () => {
    handleClose();
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={handleContentClick}>
        <img src={Logo} alt="logo" className="logo" />
        <h2>로그인</h2>
        <form onSubmit={onSubmitLogin} className="login-form">
          <input
            type="email"
            placeholder="Email 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span onClick={togglePasswordVisibility} className="toggle-password">
              {showPassword ? '숨기기' : '표시'}
            </span>
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {/* 리팩토링 추가 기능 */}
          {/* <div className="login-actions">
            <span>ID 찾기</span>
            <p>|</p>
            <span>비밀번호 찾기</span>
          </div> */}
          <div className="modal-actions">
            <span onClick={openSignupModal}>회원가입</span>
            <button type="submit">다음</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;

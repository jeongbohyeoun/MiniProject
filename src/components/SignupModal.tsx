import { useState } from 'react';
import Logo from '../assets/Logo.svg';

interface SignupModalProps {
  handleClose: () => void;
  handleSignup: (name: string, email: string, password: string) => Promise<void>;
  openLoginModal: () => void;
}

function SignupModal({ handleClose, handleSignup, openLoginModal }: SignupModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateName = (name: string) => {
    if (!name.match(/^[a-zA-Z가-힣]+$/)) {
      setNameError('이름에는 숫자나 특수 문자를 입력할 수 없습니다.');
      return false;
    }
    setNameError('');
    return true;
  };

  const validateEmail = (email: string) => {
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailError('유효한 이매일 주소를 입력해주세요.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)) {
      setPasswordError('8~20자의 대소문자, 숫자, 특수문자가 포함되어야 합니다.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    if (password !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
      return false;
    }
    setConfirmPasswordError('');
    return true;
  };

  const handleSignupFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);

    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
      try {
        await handleSignup(name, email, password);
        handleClose();
      } catch (error) {
        setErrorMessage('회원가입 실패했습니다. 다시 시도해주세요.');
        console.error('회원가입 실패했습니다', error);
      }
    }
  };

  const handleOverlayClick = () => {
    handleClose();
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const getInputClassNames = (error: string | null) => {
    return error ? 'input-error' : '';
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={handleContentClick}>
        <img src={Logo} alt="logo" className="logo" />
        <h2>회원가입</h2>
        <form className="signup-form" onSubmit={handleSignupFormSubmit}>
          <div className="input-group">
            <input
              type="text"
              id="name"
              className={getInputClassNames(nameError)}
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={(e) => {
                if (e.target.value) {
                  validateName(e.target.value);
                }
                setTouched((prev) => ({ ...prev, name: true }));
              }}
              required
            />
            {(submitted || (touched.name && name)) && nameError && (
              <div className="error-message">{nameError}</div>
            )}
          </div>
          <div className="input-group">
            <input
              type="email"
              id="email"
              className={getInputClassNames(emailError)}
              placeholder="Email 입력해주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => {
                if (e.target.value) {
                  validateEmail(e.target.value);
                }
                setTouched((prev) => ({ ...prev, email: true }));
              }}
              required
            />
            {(submitted || (touched.email && email)) && emailError && (
              <div className="error-message">{emailError}</div>
            )}
          </div>
          <div className="input-group password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className={getInputClassNames(passwordError)}
              placeholder="비밀번호 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={(e) => {
                if (e.target.value) {
                  validatePassword(e.target.value);
                }
                setTouched((prev) => ({ ...prev, password: true }));
              }}
              required
            />
            <span onClick={togglePasswordVisibility} className="toggle-password">
              {showPassword ? '숨기기' : '표시'}
            </span>
            {(submitted || (touched.password && password)) && passwordError && (
              <div className="error-message">{passwordError}</div>
            )}
          </div>
          <div className="input-group password-input-container">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              className={getInputClassNames(confirmPasswordError)}
              placeholder="비밀번호 다시 한번 입력해주세요"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={(e) => {
                if (e.target.value) {
                  validateConfirmPassword(e.target.value);
                }
                setTouched((prev) => ({ ...prev, confirmPassword: true }));
              }}
              required
            />
            <span onClick={toggleConfirmPasswordVisibility} className="toggle-password">
              {showConfirmPassword ? '숨기기' : '표시'}
            </span>
            {(submitted || (touched.confirmPassword && confirmPassword)) &&
              touched.confirmPassword &&
              confirmPasswordError && <div className="error-message">{confirmPasswordError}</div>}
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="modal-actions">
            <span onClick={openLoginModal}>로그인</span>
            <button type="submit">다음</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupModal;

import '../styles/SignupSuccessModal.scss';
import SignupIcon from '../assets/signup-success.svg';

interface SignupSuccessModalProps {
  handleClose: () => void;
}

const SignupSuccessModal: React.FC<SignupSuccessModalProps> = ({ handleClose }) => {
  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="success-content" onClick={(e) => e.stopPropagation()}>
        <img src={SignupIcon} alt="signup-icon" className="signup-icon" />
        <div className="success-text">
          <h2>회원가입 완료되었습니다</h2>
          <span>
            <p>Wanderlust에 환영합니다!</p>
            <p>숙박 예약하려면 로그인 해주세요.</p>
          </span>
        </div>
        <button onClick={handleClose}>확인</button>
      </div>
    </div>
  );
};

export default SignupSuccessModal;

import PaymentForm from '../components/payment/PaymentForm';
import PaymentInfo from '../components/payment/PaymentInfo';
import PaymentButton from '../components/payment/PaymentButton';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();

  const backClick = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="payment">
        <div className="payment__title">
          <div className="payment__title__inner">
            <button className="payment__title__back" onClick={backClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                <path
                  d="M9.99996 14.5L4.34996 8.85C4.25835 8.75654 4.20703 8.63088 4.20703 8.5C4.20703 8.36912 4.25835 8.24346 4.34996 8.15L9.99996 2.5"
                  stroke="#222222"
                  strokeWidth="1.5"
                />
              </svg>
            </button>

            <div className="payment__title__text">확인 및 결제</div>
          </div>
        </div>
        <div className="payment__info">
          <PaymentForm />
          <div className="payment__info__right">
            <PaymentInfo />
            <PaymentButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;

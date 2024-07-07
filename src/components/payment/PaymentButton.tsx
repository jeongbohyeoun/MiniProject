import { useState } from 'react';
import axios from 'axios';
import SuccessModal from './SuccessModal';
import { useParams, useLocation } from 'react-router-dom';
import { getAuthHeaders } from '../../api/auth';

const PaymentButton = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const { accommodationId, productId } = useParams();
  const searchParams = new URLSearchParams(location.search);
  const checkInDate = searchParams.get('checkInDate');
  const checkOutDate = searchParams.get('checkOutDate');
  const personNumber = searchParams.get('personNumber');
  const handleCheckboxChange = (e: { target: { checked: boolean | ((prevState: boolean) => boolean) } }) => {
    setIsChecked(e.target.checked);
  };
  const btnClick = async () => {
    try {
      const reservationData = {
        accommodation_id: accommodationId,
        product_id: productId,
        check_in_date: checkInDate,
        check_out_date: checkOutDate,
        person_number: personNumber,
        check_in_valid: true,
        check_out_valid: true,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL_PROXY}/api/reservation`,
        reservationData,
        {
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
          },
        },
      );
      if (response.status === 200) {
        setModalOpen(true);
      } else {
        alert('예약에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error during reservation:', error);
    }
  };
  return (
    <>
      <div className="paymentButton">
        <div className="paymentButton__title">약관 동의</div>
        <div className="paymentButton__content">
          <input type="checkbox" className="paymentButton__checkbox" onChange={handleCheckboxChange} />
          <span className="paymentButton__text">{'(필수) 만 14세 이상 이용 동의'}</span>
        </div>
        <button
          id="reservationBtn"
          className={`paymentButton__paybutton ${isChecked ? 'active' : ''}`}
          disabled={!isChecked}
          onClick={btnClick}>
          예약 및 결제하기
        </button>
      </div>
      {modalOpen && <SuccessModal setModalOpen={setModalOpen} />}
    </>
  );
};
export default PaymentButton;

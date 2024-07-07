import { useLocation } from 'react-router-dom';

const PaymentInfo = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const checkInDate = searchParams.get('checkInDate');
  const checkOutDate = searchParams.get('checkOutDate');
  const personNumber = searchParams.get('personNumber');

  const startDate = checkInDate
    ? new Date(checkInDate).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  const endDate = checkOutDate
    ? new Date(checkOutDate).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <>
      <div className="paymentInfo">
        <div className="paymentInfo__title">예약 정보</div>
        <div className="paymentInfo__date">
          <div className="paymentInfo__date__title">날짜</div>
          <div className="paymentInfo__date__content">
            {startDate} ~ {endDate}
          </div>
        </div>
        <div className="paymentInfo__traveler">
          <div className="paymentInfo__traveler__title">여행자</div>
          <div className="paymentInfo__traveler__content">인원 {personNumber}명</div>
        </div>
      </div>
    </>
  );
};

export default PaymentInfo;

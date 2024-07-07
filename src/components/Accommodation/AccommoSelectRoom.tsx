import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  accommodationId: string; // 숙박 ID
  productId: string; // 객실 ID
  images: {
    image_url1: string;
    image_url2: string;
  };
  name: string;
  standard_number: number;
  maximum_number: number;
  price_per_night: number;
  count: number;
  checkInDate?: string; // 체크인 날짜 (선택적)
  checkOutDate?: string; // 체크아웃 날짜 (선택적)
  guestNumber?: string; // 인원수 (선택적)
}

const AccommoSelectRoom: React.FC<Props> = ({
  accommodationId,
  productId,
  images,
  name,
  standard_number,
  maximum_number,
  price_per_night,
  count,
  checkInDate,
  checkOutDate,
  guestNumber,
}) => {
  const formattedPrice = price_per_night ? price_per_night.toLocaleString() : '0';
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const defaultCheckInDate = formatDate(today);
  const defaultCheckOutDate = formatDate(tomorrow);
  const defaultGuestNumber = '1';
  const checkIn = new Date(checkInDate || defaultCheckInDate);
  const checkOut = new Date(checkOutDate || defaultCheckOutDate);
  const timeDiff = checkOut.getTime() - checkIn.getTime();
  const NumStay = timeDiff / (1000 * 3600 * 24);

  return (
    <li className="select-room">
      <img className="select-room-image" src={images.image_url2} alt={name}></img>
      <div className="wrapper">
        <div className="room-layout-top">
          <div className="room-title-wrapper">
            <h2 className="room-title">{name}</h2>
            <h3 className="max-guest">
              기준 {standard_number}인 / 최대 {maximum_number}인
            </h3>
          </div>
          <div className="room-price-wrapper">
            <h2 className="room-price">₩{formattedPrice}원 / 박</h2>
            <h3 className="cancel-policy">취소 및 환불 불가</h3>
          </div>
        </div>
        <div className="room-layout-bottom">
          {count ? (
            <Link
              to={`${productId}?checkInDate=${checkInDate || defaultCheckInDate}&checkOutDate=${checkOutDate || defaultCheckOutDate}&personNumber=${guestNumber || defaultGuestNumber}`}>
              <h3 className="room-detail-link">객실 상세보기</h3>
            </Link>
          ) : (
            <div className="leftblank"></div>
          )}
          <div className="room-reservation-wrapper">
            {count === 0 ? (
              <h3 className="reservation-remaining-red">남은 객실 {count}개</h3>
            ) : (
              <h3 className="reservation-remaining">남은 객실 {count}개</h3>
            )}
            {count === 0 ? (
              <button className="reservation-full-button">예약 마감</button>
            ) : (
              <Link
                to={`/payment-page/${accommodationId}/${productId}?checkInDate=${checkInDate || defaultCheckInDate}&checkOutDate=${checkOutDate || defaultCheckOutDate}&personNumber=${guestNumber || defaultGuestNumber}&total_price=${price_per_night * NumStay}&price_per_night=${price_per_night}&number_of_stay=${NumStay}`}>
                <button className="reservation-button">예약하기</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default AccommoSelectRoom;

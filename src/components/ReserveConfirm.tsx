import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { getAuthHeaders } from '../../src/api/auth';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ReservationType {
  checkInDate: string;
  checkOutDate: string;
  standardNumber: number;
  maximumNumber: number;
  imageUrl: string;
  personNumber: number;
  price: number;
  night: number;
  accommodationName: string;
  accommodationId: number;
  roomType: string;
  productId: number;
  checkInValid: boolean;
  checkOutValid: boolean;
}

interface ReserveConfirmProps {
  closeModal: () => void;
}

const ReserveConfirm: React.FC<ReserveConfirmProps> = ({ closeModal }) => {
  const [reservations, setReservations] = useState<ReservationType[]>([]);

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

    fetchReservations();
  }, []);

  return (
    <div className="modal-overlay">
      <div className="reserveConfirm">
        <Swiper
          className="reserveConfirm__swiper"
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          slidesPerView={1}>
          {reservations.map((reservation, index) => (
            <SwiperSlide key={index}>
              <div className="reserveConfirm__title">결제 및 예약 내역</div>
              <div className="reserveConfirm__info">
                <div className="reserveConfirm__info__title">예약 정보</div>
                <div className="reserveConfirm__info__date">
                  <div className="reserveConfirm__info__date__title">날짜</div>
                  <div className="reserveConfirm__info__date__content">
                    {new Date(reservation.checkInDate).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }) +
                      ' ~ ' +
                      new Date(reservation.checkOutDate).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                  </div>
                </div>
                <div className="reserveConfirm__info__person">
                  <div className="reserveConfirm__info__person__title">여행자</div>
                  <div className="reserveConfirm__info__person__content">
                    인원 {reservation.personNumber}명
                  </div>
                </div>
              </div>
              <div className="reserveConfirm__sum">
                <div className="reserveConfirm__sum__inner">
                  <img className="reserveConfirm__sum__image" src={reservation.imageUrl} alt="Hotel" />
                  <div className="reserveConfirm__sum__info">
                    <div className="reserveConfirm__sum__name">{reservation.accommodationName}</div>
                    <div className="reserveConfirm__sum__room">{reservation.roomType}</div>
                    <div className="reserveConfirm__sum__person">
                      <img className="reserveConfirm__sum__icon" src="/images/vector.png" alt="Person" />
                      기준 {reservation.standardNumber}인 / 최대 {reservation.maximumNumber}인
                    </div>
                  </div>
                </div>
              </div>
              <div className="reserveConfirm__details">
                <div className="reserveConfirm__details__title">요금 세부정보</div>
                <div className="reserveConfirm__details__price">
                  <span className="reserveConfirm__details__content">
                    ₩{Number(reservation.price).toLocaleString()} x {reservation.night}박
                  </span>
                  <span className="reserveConfirm__details__howlong">
                    ₩{(reservation.price * reservation.night).toLocaleString()}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="reserveConfirm__button" onClick={closeModal}>
          확인
        </button>
      </div>
    </div>
  );
};

export default ReserveConfirm;

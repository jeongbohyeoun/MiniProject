import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { fetchRoomDetail } from '../../api/accommoFetch';

interface RoomDetail {
  id: number;
  name: string;
  type: string;
  standard_number: number;
  maximum_number: number;
  price_per_night: number;
  number_of_stay: number;
  total_price: number;
  product_image_response: {
    image_url1: string;
    image_url2: string;
  };
}

const PaymentForm = () => {
  const { accommodationId, productId } = useParams<{ accommodationId: string; productId: string }>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const checkInDate = searchParams.get('checkInDate');
  const checkOutDate = searchParams.get('checkOutDate');
  const personNumber = searchParams.get('personNumber');
  const total_price = searchParams.get('total_price');
  const price_per_night = searchParams.get('price_per_night');
  const number_of_stay = searchParams.get('number_of_stay');

  const [roomDetail, setRoomDetail] = useState<RoomDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchRoomDetail(
          accommodationId!,
          productId!,
          checkInDate!,
          checkOutDate!,
          personNumber!,
        );
        setRoomDetail(data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching room details');
        setLoading(false);
      }
    };

    fetchDetails();
  }, [accommodationId, productId, checkInDate, checkOutDate, personNumber]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!roomDetail) {
    return <div>No room details found</div>;
  }

  const { name, type, standard_number, maximum_number, product_image_response } = roomDetail;

  return (
    <div className="paymentForm">
      <div className="paymentForm__sum">
        <div className="paymentForm__sum__inner">
          <img className="paymentForm__image" src={product_image_response.image_url1} alt="Hotel" />
          <div className="paymentForm__info">
            <div className="paymentForm__name">{name}</div>
            <div className="paymentForm__room">{type}</div>
            <div className="paymentForm__person">
              <img className="paymentForm__vector" src="/images/vector.png" alt="Person" />
              기준 {standard_number}인 / 최대 {maximum_number}인
            </div>
          </div>
        </div>
      </div>
      <div className="paymentForm__details">
        <div className="paymentForm__details__title">요금 세부정보</div>
        <div className="paymentForm__details__price">
          <span className="paymentForm__details__content">
            ₩{Number(price_per_night).toLocaleString()} x {number_of_stay}박
          </span>
          <span className="paymentForm__details__howlong">₩{Number(total_price).toLocaleString()}</span>
        </div>
      </div>
      <div className="paymentForm__total">
        <span className="paymentForm__total__price">
          <span className="paymentForm__total__text">총 합계</span>₩{Number(total_price).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default PaymentForm;

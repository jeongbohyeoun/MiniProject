import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { fetchRoomDetail } from '../../api/accommoFetch';

interface Details {
  total_price: number;
  price_per_night: number;
  number_of_stay: number;
}

const ReserveOption = () => {
  const { accommodationId, productId } = useParams<{ accommodationId: string; productId: string }>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const checkInDate = searchParams.get('checkInDate');
  const checkOutDate = searchParams.get('checkOutDate');
  const personNumber = searchParams.get('personNumber');
  const navigate = useNavigate();

  const [details, setDetails] = useState<Details | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const ReserveClick = () => {
    navigate(
      `/payment-page/${accommodationId}/${productId}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&personNumber=${personNumber}&total_price=${details?.total_price}&price_per_night=${details?.price_per_night}&number_of_stay=${details?.number_of_stay}`,
    );
  };

  useEffect(() => {
    if (!accommodationId || !productId || !checkInDate || !checkOutDate || !personNumber) {
      setError('Invalid room or accommodation ID or date or person number');
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        const data = await fetchRoomDetail(
          accommodationId,
          productId,
          checkInDate,
          checkOutDate,
          personNumber,
        );
        setDetails({
          total_price: data.total_price,
          price_per_night: data.price_per_night,
          number_of_stay: data.number_of_stay,
        });
        setLoading(false);
      } catch (error) {
        setError('Error fetching accommodation details');
        setLoading(false);
      }
    };

    fetchDetails();
  }, [accommodationId, productId, checkInDate, checkOutDate, personNumber]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="error-box">
        <h1>에러 발생</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="option">
      <div className="option__box">
        <div className="option__price">
          <span className="option__content">
            ₩{details ? Number(details.price_per_night).toLocaleString() : ''}
          </span>
          <span className="option__howlong">/박</span>
        </div>
        <div className="option__info">
          <span className="option__price__day">
            ₩{details ? Number(details.price_per_night).toLocaleString() : ''} x{' '}
            {details ? details.number_of_stay : ''}박
          </span>
          <span className="option__price__total">
            {' '}
            ₩{details ? Number(details.total_price).toLocaleString() : ''}
          </span>
        </div>
        <div className="option__total">
          <span className="option__total__text">총 합계</span>
          <span className="option__total__price">
            {' '}
            ₩{details ? Number(details.total_price).toLocaleString() : ''}
          </span>
        </div>
        <button className="option__reserve" onClick={ReserveClick}>
          <span className="option__reserve__text">예약하기</span>
        </button>
        <div className="option__reserve__notice">예약 확정 전에는 요금이 청구되지 않습니다.</div>
      </div>
    </div>
  );
};

export default ReserveOption;

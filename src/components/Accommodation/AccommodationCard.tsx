import { Item } from '../../types/types';
import { useNavigate, useLocation } from 'react-router-dom';

const AccommodationCard = ({ id, thumbnail, name, category, price, grade }: Item) => {
  const formattedPrice = price ? price.toLocaleString() : '0';
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const checkInDate = searchParams.get('checkInDate') || ''; // URL에서 값을 가져옴, 없으면 빈 문자열
  const checkOutDate = searchParams.get('checkOutDate') || ''; // URL에서 값을 가져옴, 없으면 빈 문자열
  const personNumber = searchParams.get('personNumber') || ''; // URL에서 값을 가져옴, 없으면 빈 문자열

  const handleClick = () => {
    navigate(
      `/accommodations/${id}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&personNumber=${personNumber}`,
    );
  };

  return (
    <li className="accommodation-card" onClick={handleClick}>
      <img className="accommodation-card-image" src={thumbnail} alt={category}></img>
      <div className="accommodation-card-info">
        <div className="accommodation-text-wrapper">
          <div className="accommodation-card-title">{name}</div>
          <div className="accommodation-card-type">{category}</div>
          <div className="accommodation-card-price">₩{formattedPrice}원 / 박</div>
        </div>
        <div className="accommodation-card-star">
          <div className="star-icon"></div>
          <h1 className="star-rate">{grade}</h1>
        </div>
      </div>
    </li>
  );
};

export default AccommodationCard;

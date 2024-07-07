import { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import CalendarStart from '../calendar/SearchRoomCalendarStart';
import CalendarEnd from '../calendar/SearchRoomCalendarEnd';
import GuestSelector from './SearchRoomGuestSelector';
import axios from 'axios';
import { AccommoDetail } from '../../types/types';

interface SearchRoomProps {
  setAccommodations: (
    data: AccommoDetail[],
    checkInDate: string,
    checkOutDate: string,
    guestNumber: string,
  ) => void;
}

const SearchRoom: React.FC<SearchRoomProps> = ({ setAccommodations }) => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialCheckInDate = searchParams.get('checkInDate');
  const initialCheckOutDate = searchParams.get('checkOutDate');
  const initialPersonNumber = searchParams.get('personNumber');

  const [guestNumber, setGuestNumber] = useState<number | null>(
    initialPersonNumber ? parseInt(initialPersonNumber) : null,
  );
  const [selectStartDay, setSelectStartDay] = useState<Date | null>(
    initialCheckInDate ? new Date(initialCheckInDate) : null,
  );
  const [selectEndDay, setSelectEndDay] = useState<Date | null>(
    initialCheckOutDate ? new Date(initialCheckOutDate) : null,
  );
  const [showCalendarStart, setShowCalendarStart] = useState(false);
  const [showCalendarEnd, setShowCalendarEnd] = useState(false);
  const [showGuestSelector, setShowGuestSelector] = useState(false);

  const CompareDate = selectStartDay && selectEndDay && selectStartDay > selectEndDay;

  const startBtnClick = () => {
    setShowCalendarStart(!showCalendarStart);
    setShowCalendarEnd(false);
    setShowGuestSelector(false);
  };

  const endBtnClick = () => {
    setShowCalendarEnd(!showCalendarEnd);
    setShowCalendarStart(false);
    setShowGuestSelector(false);
  };

  const guestBtnClick = () => {
    setShowGuestSelector(!showGuestSelector);
    setShowCalendarStart(false);
    setShowCalendarEnd(false);
  };

  const RoomSearch = async () => {
    const formatDate = (date: Date) => {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };

    const checkInDate = selectStartDay ? formatDate(selectStartDay) : '';
    const checkOutDate = selectEndDay ? formatDate(selectEndDay) : '';
    const personNumber = guestNumber ? guestNumber.toString() : '';

    const url = `${import.meta.env.VITE_API_URL_PROXY}/api/accommodations/${id}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&personNumber=${personNumber}`;

    try {
      const response = await axios.get(url);
      setAccommodations([response.data], checkInDate, checkOutDate, personNumber); // 검색 결과를 부모 컴포넌트로 전달함
      navigate(
        `/accommodations/${id}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&personNumber=${personNumber}`,
      );
    } catch (error) {
      alert('검색 결과가 없습니다. 날짜와 인원 수를 확인해주세요.');
    }
  };

  useEffect(() => {
    if (initialCheckInDate && initialCheckOutDate && initialPersonNumber) {
      RoomSearch();
    }
  }, [initialCheckInDate, initialCheckOutDate, initialPersonNumber]);

  return (
    <div className="container">
      <div className="searchroom">
        <input
          onClick={startBtnClick}
          className="searchroom__inputcheckin"
          value={
            selectStartDay
              ? `${selectStartDay.getFullYear()}년 ${selectStartDay.getMonth() + 1}월 ${selectStartDay.getDate()}일`
              : '체크인 날짜'
          }
          readOnly
        />
        {showCalendarStart && (
          <CalendarStart onDayClick={setSelectStartDay} setStartOpen={setShowCalendarStart} />
        )}
        <input
          onClick={endBtnClick}
          className="searchroom__inputcheckout"
          value={
            selectEndDay
              ? `${selectEndDay.getFullYear()}년 ${selectEndDay.getMonth() + 1}월 ${selectEndDay.getDate()}일`
              : '체크아웃 날짜'
          }
          style={CompareDate ? { textDecoration: 'line-through', color: 'red' } : {}}
          readOnly
        />
        {showCalendarEnd && <CalendarEnd onDayClick={setSelectEndDay} setEndOpen={setShowCalendarEnd} />}
        <input
          onClick={guestBtnClick}
          className="searchroom__inputguestnumber"
          value={guestNumber ? `여행자 ${guestNumber}명` : '여행자 인원수'}
          readOnly
        />
        {showGuestSelector && (
          <GuestSelector onGuestSelect={setGuestNumber} setGuestOpen={setShowGuestSelector} />
        )}
        <button className="searchroom__button" onClick={RoomSearch}></button>
      </div>
    </div>
  );
};

export default SearchRoom;

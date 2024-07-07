import React, { useState } from 'react';
import CalendarStart from '../calendar/CalendarStart';
import CalendarEnd from '../calendar/CalendarEnd';
import GuestSelector from './GuestSelector';
import axios from 'axios';
import { Item } from '../../types/types';
import { useNavigate } from 'react-router-dom';

interface SearchProps {
  selectedCategory: string;
  onSearchResults: (data: Item[]) => void;
}

const Search: React.FC<SearchProps> = ({ selectedCategory, onSearchResults }) => {
  const [guestNumber, setGuestNumber] = useState<number | null>(null);
  const [selectStartDay, setSelectStartDay] = useState<Date | null>(null);
  const [selectEndDay, setSelectEndDay] = useState<Date | null>(null);
  const [showCalendarStart, setShowCalendarStart] = useState(false);
  const [showCalendarEnd, setShowCalendarEnd] = useState(false);
  const [showGuestSelector, setShowGuestSelector] = useState(false);
  const navigate = useNavigate();

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

  const handleSearch = async () => {
    const formatDate = (date: Date) => {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    };

    const checkInDate = selectStartDay ? formatDate(selectStartDay) : '';
    const checkOutDate = selectEndDay ? formatDate(selectEndDay) : '';
    const personNumber = guestNumber ? guestNumber.toString() : '';
    const category = selectedCategory ? `&category=${encodeURIComponent(selectedCategory)}` : '';

    const url = `${import.meta.env.VITE_API_URL_PROXY}/api/accommodations?${category}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&personNumber=${personNumber}`;

    try {
      const response = await axios.get(url);
      onSearchResults(response.data); // 검색 결과를 부모 컴포넌트로 전달
      // 검색 결과를 포함하여 페이지를 이동
      navigate(`/?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&personNumber=${personNumber}`);
    } catch (error) {
      alert('검색 결과가 없습니다. 날짜와 인원 수를 확인해주세요.');
    }
  };

  return (
    <div className="container">
      <div className="search-container">
        <input
          onClick={startBtnClick}
          className="input-checkin"
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
          className="input-checkout"
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
          className="input-guest-number"
          value={guestNumber ? `여행자 ${guestNumber}명` : '여행자 인원수'}
          readOnly
        />
        {showGuestSelector && (
          <GuestSelector onGuestSelect={setGuestNumber} setGuestOpen={setShowGuestSelector} />
        )}
        <button className="search-button" onClick={handleSearch}></button>
      </div>
    </div>
  );
};

export default Search;

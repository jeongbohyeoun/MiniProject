import { useState, useEffect } from 'react';

interface Day {
  day: number;
  isCurrentMonth: boolean;
}

interface CalendarStartType {
  onDayClick: (day: Date) => void;
  setStartOpen: (open: boolean) => void;
}

const CalendarStart = ({ onDayClick, setStartOpen }: CalendarStartType) => {
  const [date, setDate] = useState<Date>(new Date());
  const [, setSelectedDay] = useState<number | null>(null);
  const firstDayOfMonth: Date = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDayOfMonth: Date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const daysInMonth: Day[] = [];

  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    daysInMonth.push({ day: i, isCurrentMonth: true });
  }

  const Week: string[] = ['일', '월', '화', '수', '목', '금', '토'];

  const BeforeMonthDate: Day[] = Array.from({ length: firstDayOfMonth.getDay() }, (_, i) => ({
    day: lastDayOfMonth.getDate() - i,
    isCurrentMonth: false,
  })).reverse();

  const AfterMonthDate = Array.from({ length: 6 - lastDayOfMonth.getDay() }, (_, i) => ({
    day: i + 1,
    isCurrentMonth: false,
  }));

  useEffect(() => {
    const daysInMonth = [];
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      daysInMonth.push({ day: i, isCurrentMonth: true });
    }
  }, [date]);

  const dayClick = (day: number) => {
    setSelectedDay(day);
    const selectedDate = new Date(date.getFullYear(), date.getMonth(), day);
    onDayClick(selectedDate);
    setStartOpen(false);
  };

  const prevMonth = (): void => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1));
  };
  const nextMonth = (): void => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1));
  };

  const months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className="calendarstart">
      <div className="calendarstart__layout">
        <div className="calendarstart__monthYear">{`${date.getFullYear()}년 ${months[date.getMonth()]}월`}</div>
        <div className="calendarstart__swiper">
          <button className="calendarstart__swiper__left" onClick={prevMonth}>
            {'<'}
          </button>
          <button className="calendarstart__swiper__right" onClick={nextMonth}>
            {'>'}
          </button>
        </div>

        {Week.map((day, index) => (
          <div className="calendarstart__weekBox" key={index}>
            {day}
          </div>
        ))}
        {BeforeMonthDate.map((dayObj, index) => {
          const DayClass = dayObj.isCurrentMonth ? 'CurrentMonthDay' : 'OtherMonthDay';
          return (
            <div className={DayClass} key={`start-${index}`}>
              {dayObj.day}
            </div>
          );
        })}
        {daysInMonth.map((dayObj, index) => {
          const DayClass = dayObj.isCurrentMonth ? 'CurrentMonthDay' : 'OtherMonthDay';
          return (
            <div className={DayClass} onClick={() => dayClick(dayObj.day)} key={index}>
              {dayObj.day}
            </div>
          );
        })}
        {AfterMonthDate.map((dayObj, index) => {
          const DayClass = dayObj.isCurrentMonth ? 'CurrentMonthDay' : 'OtherMonthDay';
          return (
            <div className={DayClass} key={`end-${index}`}>
              {dayObj.day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarStart;

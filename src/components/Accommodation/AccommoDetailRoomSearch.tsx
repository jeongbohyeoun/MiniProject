import React, { useState } from 'react';
import AccommoSelectRoom from './AccommoSelectRoom';
import SearchRoom from './SearchRoom';
import Loader from './Loader';
import { fetchAccommoDetail } from '../../api/accommoFetch';
import { useQuery } from '@tanstack/react-query';
import { AccommoDetail } from '../../types/types';
import { AccommoDetailProps } from '../../types/types';

const AccommoDetailRoomSearch: React.FC<AccommoDetailProps> = ({ id }) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['roomList', id],
    queryFn: () => fetchAccommoDetail(id),
  });

  const [accommodations, setAccommodations] = useState<AccommoDetail[]>([]);
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [checkOutDate, setCheckOutDate] = useState<string>('');
  const [guestNumber, setGuestNumber] = useState<string>('');

  const handleSetAccommodations = (
    data: AccommoDetail[],
    checkInDate: string,
    checkOutDate: string,
    guestNumber: string,
  ) => {
    setAccommodations(data);
    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);
    setGuestNumber(guestNumber);
  };

  if (isPending) {
    return <Loader />;
  }
  if (isError) {
    return (
      <div className="error-box">
        <h1>에러 발생</h1>
        <p>{(error as Error).message}</p> // Corrected error handling
      </div>
    );
  }
  console.log(data);

  const roomList =
    accommodations.length > 0 ? accommodations[0].product_response_list : data?.product_response_list || [];

  if (!roomList) {
    return <Loader />;
  }
  return (
    <section className="accommo-select-container">
      <div className="select-title">객실 선택</div>
      <SearchRoom setAccommodations={handleSetAccommodations} />
      <ul className="select-room-container">
        {roomList.map((room: AccommoDetail) => (
          <AccommoSelectRoom
            key={room.id}
            accommodationId={id}
            productId={room.id.toString()}
            images={room.images}
            name={room.name}
            standard_number={room.standard_number}
            maximum_number={room.maximum_number}
            price_per_night={room.price_per_night}
            count={room.count}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            guestNumber={guestNumber}
          />
        ))}
      </ul>
    </section>
  );
};

export default AccommoDetailRoomSearch;

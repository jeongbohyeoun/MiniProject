import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRoomDetail } from '../../api/accommoFetch';
import Loader from './Loader';
import { RoomDetail } from '../../types/types';
import { RoomDetailProps } from '../../types/types';
import { Link, useLocation } from 'react-router-dom';

const RoomDetailImages: React.FC<RoomDetailProps> = ({ accommodationId, productId }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const checkInDate = searchParams.get('checkInDate') || '';
  const checkOutDate = searchParams.get('checkOutDate') || '';
  const personNumber = searchParams.get('personNumber') || '';

  const { data, isPending, isError, error } = useQuery<RoomDetail>({
    queryKey: ['roomDetail', accommodationId, productId, checkInDate, checkOutDate, personNumber],
    queryFn: () => fetchRoomDetail(accommodationId, productId, checkInDate, checkOutDate, personNumber),
  });

  if (isPending) {
    return <Loader />;
  }
  if (isError) {
    return (
      <div className="error-box">
        <h1>에러 발생</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!data) {
    return <Loader />;
  }

  const images = Object.values(data.product_image_response).filter(Boolean);

  return (
    <section className="room-images-container">
      <Link to=".." relative="path" className="no-underline">
        <h1 className="room-title">{`${data.name} (${data.accommodation_name})`}</h1>
      </Link>
      <div className="room-photo-container">
        {images.map((imgSrc, index) => (
          <img key={index} src={imgSrc} alt={`room-photo${index + 1}`} className={`room-photo${index + 1}`} />
        ))}
      </div>
    </section>
  );
};

export default RoomDetailImages;

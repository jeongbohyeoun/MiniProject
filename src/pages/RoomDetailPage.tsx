import React from 'react';
import { useParams } from 'react-router-dom';
import RoomDetailDescription from '../components/Accommodation/RoomDetailDescription';
import RoomDetailImages from '../components/Accommodation/RoomDetailImages';

const RoomDetailPage: React.FC = () => {
  const { accommodationId, productId } = useParams<{ accommodationId: string; productId: string }>();

  if (!accommodationId || !productId) {
    return <div>해당 객실 ID를 찾지 못했습니다.</div>;
  }

  return (
    <>
      <RoomDetailImages accommodationId={accommodationId} productId={productId} />
      <RoomDetailDescription accommodationId={accommodationId} productId={productId} />
    </>
  );
};

export default RoomDetailPage;

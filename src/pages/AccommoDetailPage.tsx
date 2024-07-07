import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AccommoDetailDescription from '../components/Accommodation/AccommoDetailDescription';
import AccommoDetailRoomSearch from '../components/Accommodation/AccommoDetailRoomSearch';
import { fetchAccommoDetail } from '../api/accommoFetch';

const AccommoDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      fetchAccommoDetail(id)
        .then((response) => {
          console.log(response.product_response_list);
        })
        .catch((error) => {
          console.error('정보를 불러오는 데 실패했습니다.', error);
        });
    }
  }, [id]);

  if (!id) {
    return <div>해당 숙박 ID를 찾지 못했습니다.</div>;
  }

  return (
    <>
      <AccommoDetailDescription id={id} />
      <AccommoDetailRoomSearch id={id} />
    </>
  );
};

export default AccommoDetailPage;

import { Link } from 'react-router-dom';
import Loader from './Loader';
import { fetchAccommoDetail } from '../../api/accommoFetch';
import { useQuery } from '@tanstack/react-query';
import { AccommoDetail } from '../../types/types';
import { AccommoDetailProps } from '../../types/types';
import { AccommoDetailResponse } from '../../types/types';

const AccommoDetailDescription: React.FC<AccommoDetailProps> = ({ id }) => {
  const { data, isPending, isError, error } = useQuery<AccommoDetailResponse>({
    queryKey: ['roomList', id],
    queryFn: () => fetchAccommoDetail(id),
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

  const accommoItem: AccommoDetail[] = data.product_response_list || [];
  console.log(accommoItem);

  if (!accommoItem) {
    return <Loader />;
  }

  return (
    <section className="accommo-container">
      <Link to=".." relative="route" className="no-underline">
        <h1 className="accommo-title">{data.name}</h1>
      </Link>
      <div className="accommo-photo-container">
        {accommoItem.slice(0, 5).map((accommo, index) => (
          <img
            key={index}
            src={accommo.images.image_url1}
            alt={`accommo-photo${index + 1}`}
            className={`accommo-photo${index + 1}`}
          />
        ))}
      </div>
      <div className="accommo-description-container">
        <div className="description-wrapper">
          <h2 className="description-title">{data.name}</h2>
          <h3 className="description-type">{data.category}</h3>
          <p className="description-textbody">{data.description}</p>
        </div>
        <div className="description-star">
          <div className="star-icon"></div>
          <h3 className="star-rate">{data.grade}</h3>
        </div>
      </div>
    </section>
  );
};

export default AccommoDetailDescription;

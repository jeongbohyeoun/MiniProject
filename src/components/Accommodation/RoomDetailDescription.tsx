import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRoomDetail } from '../../api/accommoFetch';
import { RoomDetail } from '../../types/types';
import { RoomDetailProps } from '../../types/types';
import Loader from './Loader';
import RoomSetting from './RoomSetting';
import airConditionerImg from '../../assets/Air.svg';
import wifiImg from '../../assets/Wifi.svg';
import tvImg from '../../assets/Tv.svg';
import fridgeImg from '../../assets/Kitchen.svg';
import bathImg from '../../assets/bathtub_20dp_FILL0_wght400_GRAD0_opsz20.svg';
import pcImg from '../../assets/dvr_20dp_FILL0_wght400_GRAD0_opsz20.svg';
import cableImg from '../../assets/cable_20dp_FILL0_wght400_GRAD0_opsz20.svg';
import sofaImg from '../../assets/chair_20dp_FILL0_wght400_GRAD0_opsz20.svg';
import kitchenImg from '../../assets/skillet_20dp_FILL0_wght400_GRAD0_opsz20.svg';
import tableImg from '../../assets/table_restaurant_20dp_FILL0_wght400_GRAD0_opsz20.svg';
import dryerImg from '../../assets/sports_20dp_FILL0_wght400_GRAD0_opsz20.svg';
import ReserveOption from '../../components/reserveoption/ReserveOption';
import { useLocation } from 'react-router-dom';

const RoomDetailDescription: React.FC<RoomDetailProps> = ({ accommodationId, productId }) => {
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

  const productOptions = [
    { settingType: '욕실', hasOption: data.product_option.has_bath, image: bathImg },
    {
      settingType: '에어컨',
      hasOption: data.product_option.has_air_condition,
      image: airConditionerImg,
    },
    { settingType: 'TV', hasOption: data.product_option.has_tv, image: tvImg },
    { settingType: 'PC', hasOption: data.product_option.has_pc, image: pcImg },
    { settingType: '와이파이', hasOption: data.product_option.has_wifi, image: wifiImg },
    { settingType: '충전케이블', hasOption: data.product_option.has_cable, image: cableImg },
    {
      settingType: '냉장고',
      hasOption: data.product_option.has_refrigerator,
      image: fridgeImg,
    },
    { settingType: '소파', hasOption: data.product_option.has_sofa, image: sofaImg },
    {
      settingType: '조리 시설',
      hasOption: data.product_option.can_cook,
      image: kitchenImg,
    },
    { settingType: '테이블', hasOption: data.product_option.has_table, image: tableImg },
    {
      settingType: '드라이기',
      hasOption: data.product_option.has_hairdryer,
      image: dryerImg,
    },
  ].filter((option) => option.hasOption);

  return (
    <section className="room-description-container">
      <div className="description-wrapper">
        <h2 className="description-title">{data.name}</h2>
        <h3 className="max-guest">
          기준 {data.standard_number}인 / 최대 {data.maximum_number}인
        </h3>
        <ul className="room-setting-wrapper">
          {productOptions.map((option, index) => (
            <RoomSetting key={index} {...option} />
          ))}
        </ul>
        <div className="horizontal-line"></div>
        <p className="description-textbody">{data.description}</p>
      </div>
      <div className="reservation-wrapper">
        <ReserveOption />
      </div>
    </section>
  );
};

export default RoomDetailDescription;

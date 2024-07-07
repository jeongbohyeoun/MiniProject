import hotel from '../../assets/fluent_building-16-regular.svg';
import resort from '../../assets/fluent-mdl2_vacation.svg';
import pension from '../../assets/fluent_building-home-16-regular.svg';
import motel from '../../assets/fluent_bed-16-regular.svg';
import guesthouse from '../../assets/fluent_backpack-16-regular.svg';
import poolvilla from '../../assets/fluent_beach-16-regular.svg';
import camping from '../../assets/fluent_tent-16-regular.svg';
import pet from '../../assets/fluent_animal-dog-16-regular.svg';
import kensington1 from '../../assets/hotelimage1.png';
import kensington2 from '../../assets/hotelimage1-1.png';
import hotelImg1 from '../../assets/hotelimage1.png';
import hotelImg2 from '../../assets/hotelimage2.jpeg';
import hotelImg3 from '../../assets/hotelimage3.jpeg';
import hotelImg4 from '../../assets/hotelimage4.jpeg';
import hotelImg5 from '../../assets/hotelimage5.jpeg';
import bedroomImg1 from '../../assets/bedroom1.png';
import bedroomImg2 from '../../assets/bedroom2.png';
import bedImg from '../../assets/Bed.svg';
import airConditionerImg from '../../assets/Air.svg';
import wifiImg from '../../assets/Wifi.svg';
import laundryImg from '../../assets/laundry.svg';
import tvImg from '../../assets/Tv.svg';
import fridgeImg from '../../assets/Kitchen.svg';

export const CATEGORY_LIST = [
  {
    category: '호텔',
    image: hotel,
  },
  {
    category: '리조트',
    image: resort,
  },
  {
    category: '펜션',
    image: pension,
  },
  {
    category: '모텔',
    image: motel,
  },
  {
    category: '게스트하우스',
    image: guesthouse,
  },
  {
    category: '풀빌라',
    image: poolvilla,
  },
  {
    category: '캠핑/글램핑',
    image: camping,
  },
  {
    category: '애견동반숙소',
    image: pet,
  },
];

export const CARD_LIST = [
  {
    id: 1,
    title: '켄싱턴 호텔',
    type: '호텔',
    price: '₩90,000원 / 박',
    rate: 4.6,
    image: kensington1,
  },
  {
    id: 2,
    title: '로얄 호텔',
    type: '호텔',
    price: '₩150,000원 / 박',
    rate: 3.5,
    image: kensington2,
  },
];

export const ACCOMMO_DETAIL = [
  {
    id: 1,
    title: '켄싱턴 호텔 양양',
    type: '호텔',
    price: '₩90,000원 / 박',
    rate: 4.8,
    image: [hotelImg1, hotelImg2, hotelImg3, hotelImg4, hotelImg5],
    description:
      'Lorem ipsum dolor sit amet consectetur. Pellentesque sodales vestibulum id lectus egestas augue. Molestie sodales ipsum iaculis id neque tempor id condimentum. Proin semper placerat rhoncus faucibus. Ullamcorper nunc justo fringilla ac nunc cras vulputate tristique ut.',
  },
];

export const ROOM_LIST = [
  {
    id: 1,
    type: '스텐다드 룸',
    numGuest: 2,
    maxGuest: 6,
    price: '₩90,000원 / 박',
    remainingRoom: 4,
    image: bedroomImg1,
  },
  {
    id: 2,
    type: '디럭스 룸',
    numGuest: 2,
    maxGuest: 4,
    price: '₩150,000원 / 박',
    remainingRoom: 2,
    image: bedroomImg2,
  },
];

export const ROOM_DETAIL = [
  {
    id: 1,
    title: '스탠다드 룸 (켄싱턴 호텔 속초)',
    roomType: '디럭스 룸',
    numGuest: 2,
    maxGuest: 6,
    roomSetting: [
      {
        settingType: '퀸 침대',
        image: bedImg,
      },
      {
        settingType: '에어컨',
        image: airConditionerImg,
      },
      {
        settingType: '무료 와이파이',
        image: wifiImg,
      },
      {
        settingType: '세탁기',
        image: laundryImg,
      },
      {
        settingType: '평면 TV',
        image: tvImg,
      },
      {
        settingType: '냉장고',
        image: fridgeImg,
      },
    ],

    image: [hotelImg1, hotelImg2, hotelImg3, hotelImg4, hotelImg5],
    description:
      'Lorem ipsum dolor sit amet consectetur. Pellentesque sodales vestibulum id lectus egestas augue. Molestie sodales ipsum iaculis id neque tempor id condimentum. Proin semper placerat rhoncus faucibus. Ullamcorper nunc justo fringilla ac nunc cras vulputate tristique ut.',
  },
];

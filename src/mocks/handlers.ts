import { http, HttpResponse } from 'msw';
import hotelImg1 from '../assets/hotelimage1.png';
import hotelImg2 from '../assets/hotelimage2.jpeg';
import hotelImg3 from '../assets/hotelimage3.jpeg';
import hotelImg4 from '../assets/hotelimage4.jpeg';
import hotelImg5 from '../assets/hotelimage5.jpeg';
import bedroomImg1 from '../assets/bedroom1.png';
import bedroomImg2 from '../assets/bedroom2.png';
import bedImg from '../assets/Bed.svg';
import airConditionerImg from '../assets/Air.svg';
import wifiImg from '../assets/Wifi.svg';
import laundryImg from '../assets/laundry.svg';
import tvImg from '../assets/Tv.svg';
import fridgeImg from '../assets/Kitchen.svg';
import kensington1 from '../assets/hotelimage1.png';

interface SignupRequestBody {
  name: string;
  email: string;
  password: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

// interface ReservationRequest {
//   checkInDate: string;
//   checkOutDate: string;
//   personNumber: number;
//   price: number;
//   accommodationid: number;
//   productId: number;
//   checkInValid: boolean;
//   checkOutValid: boolean;
// }

export const handlers = [
  http.get('/api/accommoDetail/:id', () => {
    return HttpResponse.json([
      {
        id: 1,
        name: '켄싱턴 호텔 속초',
        category: '호텔',
        price: 130000,
        grade: 3.8,
        accommodation_image: [hotelImg1, hotelImg2, hotelImg3, hotelImg4, hotelImg5],
        description:
          'Lorem ipsum dolor sit amet consectetur. Pellentesque sodales vestibulum id lectus egestas augue. Molestie sodales ipsum iaculis id neque tempor id condimentum. Proin semper placerat rhoncus faucibus. Ullamcorper nunc justo fringilla ac nunc cras vulputate tristique ut.',
      },
      {
        id: 2,
        name: '켄싱턴 호텔 2',
        category: '호텔',
        price: 130000,
        grade: 3.8,
        accommodation_image: [hotelImg1, hotelImg2, hotelImg3, hotelImg4, hotelImg5],
        description:
          'Lorem ipsum dolor sit amet consectetur. Pellentesque sodales vestibulum id lectus egestas augue. Molestie sodales ipsum iaculis id neque tempor id condimentum. Proin semper placerat rhoncus faucibus. Ullamcorper nunc justo fringilla ac nunc cras vulputate tristique ut.',
      },
      {
        id: 3,
        name: '켄싱턴 호텔 3',
        category: '호텔',
        price: 130000,
        grade: 3.8,
        accommodation_image: [hotelImg1, hotelImg2, hotelImg3, hotelImg4, hotelImg5],
        description:
          'Lorem ipsum dolor sit amet consectetur. Pellentesque sodales vestibulum id lectus egestas augue. Molestie sodales ipsum iaculis id neque tempor id condimentum. Proin semper placerat rhoncus faucibus. Ullamcorper nunc justo fringilla ac nunc cras vulputate tristique ut.',
      },
    ]);
  }),

  http.get('/api/roomList', () => {
    return HttpResponse.json([
      {
        id: 1,
        type: '스텐다드 룸',
        numGuest: 2,
        maxGuest: 6,
        price: 90000,
        remainingRoom: 4,
        image: bedroomImg1,
      },
      {
        id: 2,
        type: '디럭스 룸',
        numGuest: 2,
        maxGuest: 4,
        price: 150000,
        remainingRoom: 2,
        image: bedroomImg2,
      },
      {
        id: 3,
        type: '디럭스 룸',
        numGuest: 2,
        maxGuest: 4,
        price: 200000,
        remainingRoom: 0,
        image: bedroomImg2,
      },
    ]);
  }),

  http.get('/api/roomDetail', () => {
    return HttpResponse.json([
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
    ]);
  }),

  http.get('/api/accommodation', () => {
    return HttpResponse.json([
      {
        id: 1,
        name: '켄싱턴 호텔',
        category: '리조트',
        price: 90000,
        grade: 4.6,
        thumbnail: kensington1,
      },
      {
        id: 2,
        name: '켄싱턴 호텔',
        category: '호텔',
        price: 80000,
        grade: 4.6,
        thumbnail: kensington1,
      },
      {
        id: 3,
        name: '켄싱턴 호텔',
        category: '호텔',
        price: 90000,
        grade: 4.6,
        thumbnail: kensington1,
      },
      {
        id: 4,
        name: '켄싱턴 호텔',
        category: '풀빌라',
        price: 150000,
        grade: 4.6,
        thumbnail: kensington1,
      },
      {
        id: 5,
        name: '켄싱턴 호텔',
        category: '풀빌라',
        price: 150000,
        grade: 4.6,
        thumbnail: kensington1,
      },
      {
        id: 6,
        name: '켄싱턴 호텔',
        category: '풀빌라',
        price: 150000,
        grade: 4.6,
        thumbnail: kensington1,
      },
      {
        id: 7,
        name: '켄싱턴 호텔',
        category: '펜션',
        price: 150000,
        grade: 4.6,
        thumbnail: kensington1,
      },
      {
        id: 8,
        name: '켄싱턴 호텔',
        category: '모텔',
        price: 150000,
        grade: 4.6,
        thumbnail: kensington1,
      },
    ]);
  }),

  http.get('/', () => {
    return HttpResponse.json({
      message: 'Root request intercepted',
    });
  }),
  http.post('/auth/signup', async ({ request }) => {
    const { name, email, password } = (await request.json()) as SignupRequestBody;
    return HttpResponse.json({
      user: { name, email, password },
      message: '회원가입 성공했습니다',
    });
  }),

  http.post('/auth/login', async ({ request }) => {
    const { email, password } = (await request.json()) as LoginRequestBody;
    return HttpResponse.json({
      user: { email, password },
      accessToken: 'fake-access-token',
      refreshToken: 'fake-refresh-token',
      message: '로그인 되었습니다',
    });
  }),

  http.post('/auth/logout', async () => {
    return HttpResponse.json({
      message: '로그아웃 되었습니다',
    });
  }),

  http.post('/auth/refreshToken', async () => {
    return HttpResponse.json({
      accessToken: 'new-fake-access-token',
    });
  }),

  //   http.get('/api/accommodations', () => {
  //     return HttpResponse.json([
  //       {
  //         id: 1,
  //         name: '켄싱턴 호텔 강릉',
  //         category: '호텔',
  //         price: 180000,
  //         grade: 4.5,
  //         thumbnail: '/images/kensington.png',
  //       },
  //       {
  //         id: 2,
  //         name: '호텔 더 디자이너스',
  //         category: '호텔',
  //         price: 150000,
  //         grade: 4.0,
  //         thumbnail: '/images/kensington.png',
  //       },
  //       {
  //         id: 3,
  //         name: '리조트',
  //         category: '리조트',
  //         price: 190000,
  //         grade: 4.4,
  //         thumbnail: '/images/kensington.png',
  //       },
  //       {
  //         id: 4,
  //         name: '게스트하우스',
  //         category: '게스트하우스',
  //         price: 230000,
  //         grade: 4.1,
  //         thumbnail: '/images/kensington.png',
  //       },
  //     ]);
  //   }),

  //   http.get('/api/reservations', () => {
  //     return HttpResponse.json([
  //       {
  //         id: 1,
  //         checkInDate: '2024-07-01',
  //         checkOutDate: '2024-07-06',
  //         night: 5,
  //         personNumber: 2,
  //         accommodationName: '켄싱턴 호텔 강능',
  //         roomType: '스탠다드 룸',
  //         standardNumber: 2,
  //         maximumNumber: 2,
  //         imageUrl: '/images/kensington.png',
  //         price: 180000,
  //       },
  //       {
  //         id: 1,
  //         checkInDate: '2024-07-01',
  //         checkOutDate: '2024-07-06',
  //         night: 5,
  //         personNumber: 2,
  //         accommodationName: '켄싱턴 호텔 강능',
  //         roomType: '스탠다드 룸',
  //         standardNumber: 2,
  //         maximumNumber: 2,
  //         imageUrl: '/images/kensington.png',
  //         price: 180000,
  //       },
  //     ]);
  //   }),

  //   http.get('/api/reservation', () => {
  //     return HttpResponse.json([
  //       {
  //         id: 1,
  //         personNumber: 2,
  //         totalPrice: 180000,
  //         price: 180000,
  //         checkInDate: '2024-07-01',
  //         checkOutDate: '2024-07-06',
  //       },
  //     ]);
  //   }),

  //   http.post('/reservation', async ({ request }) => {
  //     const authToken = request.headers.get('Authorization');
  //     if (!authToken) return HttpResponse.json({ msg: 'Unauthorized' }, { status: 401 });

  //     // requestBody의 타입을 명시적으로 적용합니다.
  //     const requestBody = (await request.json()) as ReservationRequest;

  //     return HttpResponse.json(
  //       {
  //         msg: 'Reservation success',
  //         accommodationId: requestBody.accommodationid,
  //         productId: requestBody.productId,
  //         checkInDate: requestBody.checkInDate,
  //         checkOutDate: requestBody.checkOutDate,
  //         personNumber: requestBody.personNumber,
  //         checkInValid: requestBody.checkInValid,
  //         checkOutValid: requestBody.checkOutValid,
  //       },
  //       { status: 201 },
  //     );
  //   }),
];

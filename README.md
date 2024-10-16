# Wanderlust 숙박 예약 서비스

## 프로젝트 개요

Wanderlust는 넓은 세상을 경험하고자 여행을 떠나고 싶은 마음을 의미합니다. 전체적인 UI 디자인은 대표적인 숙박 예약 서비스 Airbnb와 야놀자 사이트를 참고해서 큰 얼개를 짜고, 프로젝트에서 구현할 세부적인 내용을 기획했습니다. 프론트엔드와 백엔드 팀원이 함께 REST API를 구성하고, http request와 response를 통해 데이터를 주고 받는 과정을 공부하는 미니 프로젝트입니다.

#### <u>프로젝트 기간</u>

2024년 6월 17일 - 7월 5일

#### <u>배포링크</u>

https://wanderlust-mini4.netlify.app/

id: wander2@wander.com<br>
pw: Abcd1234\*

<hr>

## 기술 스택

<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> ![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"><img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/><br>
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)<img src="https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white"><br><img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"><img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"/>
<br>

<hr>

## 유저 플로우

![userflow](public/images/userflow.webp)

## 각 페이지 설명

### A. 개발 환경 설정 및 배포, 전체 상품(카테고리 분류), 개별 상품, 객실 페이지 

### 구현 내용

#### 1. 개발 환경 설정 및 배포

- vite로 react 개발 환경을 설정하고 프로젝트에 필요한 라이브러리 패키지를 개발용과 배포용으로 구분해서 설치했습니다. esbuild로 사전 번들링이 가능해 build 시간을 단축할 수 있기 때문에 vite를 사용했습니다.
- 이전 프로젝트에서도 사용했던 netlify 서비스를 활용해서 프로젝트를 최종 배포했습니다. 한번 배포하면 자동으로 github 내용을 추적해서 내용을 반영하는 점이 편리합니다. 이번 프로젝트에는 데이터를 http request/response를 통해서 받았는데, api 주소가 http이고 netlify는 보안이 강화된 https 이외에는 허용하지 않아서 충돌이 발생했습니다. 다행히 api URL을 PROXY로 우회 설정하면서 http api 주소를 사용할 수 있었습니다.

#### 2. 전체 숙박 상품 (카테고리 분류)

![전체숙박](public/images/전체숙박.png)
![카테고리](public/images/카테고리선택.png)

- tanstack query의 useInfiniteQuery를 사용해서 숙박 리스트를 8개씩 분할해서 화면에 보여줍니다. useInView훅을 활용해서 스크롤이 페이지 하단에 위치하면 fetchNextPage 함수로 그 다음 8개 리스트를 받아오면서 무한 스크롤을 구현했습니다.
  현재는 전체 숙박 데이터를 받아 프론트엔드에서 분할해서 보여주는 방식인데, 데이터가 방대할 경우를 대비해서 백엔드와 프론트엔드가 동시에 페이지를 분할하는 방식을 구현할 예정입니다.
- 숙박 카테고리를 선택하면 해당 숙박 종류만 분류해서 화면에 구현했습니다.

#### 3. 개별 숙박 상품 페이지 및 객실 페이지

![숙소상세](public/images/숙소상세페이지.png)
![객실선택](public/images/객실선택페이지.png)
![객실상세](public/images/객실상세페이지.png)

- tanstack query와 fetch를 사용해서 숙박 업체의 이름, 카테고리, 별점, 설명을 동적으로 화면에 보여줍니다. 각 객실에 할당된 img1과 img2를 5개씩 분리해서 img1 묶음은 그리드 형식으로 상단에 배치하고, img2 묶음은 각 객실 이미지로 사용했습니다.
- 객실 선택에서 '예약하기'를 클릭하면 예약 및 결제하기 페이지로 이동하고, 잔여 객실 수가 0이 되면 '예약 마감'으로 버튼을 전환하고 객실 상세보기도 표시하지 않습니다.
- 객실 상세 페이지에서는 객실 내 서비스 및 부대시설 여부를 boolean 값으로 받아 해당하는 서비스 목록만 화면에 표시합니다.

<hr>

### B. 메인화면 검색 기능, 상품 개별화면 검색 기능, 결제 및 결제내역 확인 기능 

### 구현 내용

#### 1. 메인 화면 검색 기능

![캘린더](public/images/캘린더.png)

- 체크인 날짜, 체크아웃 날짜, 인원 수 를 url 쿼리스트링으로 넣어서 검색 기능 구현
- 카테고리 필터링과 연계해서 카테고리 지정 후 검색 시 카테고리를 포함한 검색값이 나오도록 구현
- 검색 값 설정 후 개별 상품 조회 시 url 쿼리스트링의 검색 값 유지. (상태관리)
- 미설정 시 체크인 날짜는 오늘 일자, 체크아웃 날짜는 내일 일자, 인원 수는 1명으로 되도록 벡엔드와 의견 조율함.
- 체크인 날짜, 체크아웃 날짜 클릭 시 캘린더로 날짜 설정할 수 있도록 구현.

#### 2. 상품 개별화면 검색 기능

![객실선택](public/images/객실선택페이지.png)

- 메인 화면에서 검색 값 설정 후 특정 상품 이미지 클릭 시, 검색 필드의 초기 값이 메인 화면 검색값으로 설정됨. (url 쿼리스트링으로 받아옴)
- 개별 화면에서 검색 값 변경 시 url 쿼리스트링을 그에 맞게 변경하고 그에 해당하는 룸 데이터가 나옴 (상태관리) .
- (결제 페이지, 개별상품 상세페이지 -> 결제페이지) 에서 데이터를 받아올 수 있도록 url 쿼리스트링을 사용해서 상태관리를 통해 데이터 전달

#### 3. 결제 페이지 결제 기능

![객실선택](public/images/결제페이지.png)

- 결제 페이지에 필요한 데이터를 url 쿼리스트링으로 받아와서 해당 데이터 표시
- 결제 버튼 클릭 시, POST method 를 통해 백엔드로 request 보냄

#### 4. 결제 내역 확인 기능

![객실선택](public/images/결제확인.png)

- Swiper 의 navigation, pagination 을 통해서 결제 내역이 두 개 이상일 때 Swiper 를 통해서 확인 가능
- 결제 내역이 한 개일 떄는 Swiper 사라지도록 구현.

<hr>

### C. 회원 가입 및 로그인 기능, 헤더 컴포넌트, UI 디자인 

### 구현 내용

#### 1. 전체 UI 디자인 및 유저플로우 제작

![객실선택](public/images/uidesign.png)
![객실선택](public/images/userflow.webp)

#### 2. 회원가입 기능: 회원가입 모달창 구현

![객실선택](public/images/SignupModal-default.webp)

- 이메일 주소, 비밀번호, 이름 입력
- 유효성 검사 및 오류 처리

#### 3. 로그인 기능: 로그인 모달창 구현

![객실선택](public/images/LoginModal-default.webp)

- 이메일, 비밀번호 입력
- JWT access token 인증 처리
- 유효성 검사 및 오류 처리

#### 4. 헤더 네비게이션 컴포넌트:

![객실선택](public/images/HeaderLoggedIn.webp)
![객실선택](public/images/HeaderLoggedout.webp)

- 로그인 상태 - 결제내역 확인, 로그아웃
- 로그아웃 상태 - 회원가입 및 로그인 모달창을 통해 회원 인증

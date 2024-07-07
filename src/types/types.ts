export interface Item {
  id: number;
  accommodationId: string;
  productId: string;
  thumbnail: string;
  name: string;
  category: string;
  price: number;
  grade: number;
}

export interface CategoryItemProps {
  category: string;
  image: string;
  onSelectCategory: (category: string) => void;
  selected: boolean;
}

export interface CategoryProps {
  onSelectCategory: (category: string) => void;
  selectedCategory: string | null | undefined;
}

export interface AccommoDetailProps {
  id: string;
}

export interface AccommoDetail {
  id: number;
  name: string;
  standard_number: number;
  maximum_number: number;
  price_per_night: number;
  count: number;
  description: string;
  check_in_date: string;
  check_out_date: string;
  accommodation_image: AccommodationImage;
  accommodation_option: AccommodationOption;
  product_response_list: Room[];
  images: {
    image_url1: string;
    image_url2: string;
  };
}

// export interface AccommoDetail {
//   id: number;
//   name: string;
//   description: string;
//   check_in_date: string;
//   check_out_date: string;
//   accommodation_image: AccommodationImage;
//   accommodation_option: AccommodationOption;
//   product_response_list: Room[];
// }

export interface AccommoDetailResponse {
  id: number;
  name: string;
  category: string;
  description: string;
  grade: number;
  product_response_list: AccommoDetail[];
}

export interface RoomDetailProps {
  accommodationId: string;
  productId: string;
}

export interface AccommodationImage {
  image_url1: string;
  image_url2: string;
}

export interface AccommodationOption {
  has_smoking_room: boolean;
  has_cooking: boolean;
  has_parking: boolean;
  has_swimming_pool: boolean;
  has_breakfast: boolean;
  has_fitness: boolean;
  has_beauty: boolean;
}

export interface Room {
  id: number;
  name: string;
  check_in_time: string;
  check_out_time: string;
  price_per_night: number;
  standard_number: number;
  maximum_number: number;
  images: AccommodationImage;
  count: number;
}

export interface RoomDetail {
  id: number;
  name: string;
  accommodation_name: string;
  description: string;
  total_price: number;
  count: number;
  price_per_night: number;
  number_of_stay: number;
  standard_number: number;
  maximum_number: number;
  type: string;
  product_image_response: {
    image_url1: string;
    image_url2: string;
  };
  product_option: {
    has_bath: boolean;
    has_air_condition: boolean;
    has_tv: boolean;
    has_pc: boolean;
    has_wifi: boolean;
    has_cable: boolean;
    has_refrigerator: boolean;
    has_sofa: boolean;
    can_cook: boolean;
    has_table: boolean;
    has_hairdryer: boolean;
  };
}

export interface RoomSettingProps {
  settingType: string;
  image: string;
}

import axios from 'axios';
import { Item } from '../types/types';

class FetchError extends Error {
  code: number;
  info: any;

  constructor(message: string, code: number, info: any) {
    super(message);
    this.code = code;
    this.info = info;
  }
}

export async function fetchAccommodation({
  pageParam = 0,
  category = '',
}: {
  pageParam: number;
  category: string;
}): Promise<{
  data: Item[];
  currentPage: number;
  nextPage: number | null;
}> {
  const LIMIT = 8;
  const response = await axios.get(`${import.meta.env.VITE_API_URL_PROXY}/api/accommodations`, {
    params: {
      page: pageParam,
      limit: LIMIT,
      category: category !== '' ? category : undefined, // category가 빈 문자열이 아니면 포함
    },
  });

  const data = response.data;

  return {
    data: data.slice(pageParam * LIMIT, (pageParam + 1) * LIMIT),
    currentPage: pageParam,
    nextPage: data.length > (pageParam + 1) * LIMIT ? pageParam + 1 : null,
  };
}

export async function fetchAccommoDetail(id: string) {
  const response = await fetch(`${import.meta.env.VITE_API_URL_PROXY}/api/accommodations/${id}`);
  if (!response.ok) {
    const errorInfo = await response.json();
    throw new FetchError('네트워크 장애 발생.', response.status, errorInfo);
  }
  const data = await response.json();
  return data;
}

export async function fetchRoomDetail(
  id: string,
  roomId: string,
  checkInDate: string,
  checkOutDate: string,
  personNumber: string,
) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL_PROXY}/api/accommodations/${id}/${roomId}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&personNumber=${personNumber}`,
  );
  if (!response.ok) {
    const errorInfo = await response.json();
    throw new FetchError('네트워크 장애 발생.', response.status, errorInfo);
  }
  const data = await response.json();
  return data;
}

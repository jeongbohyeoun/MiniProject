import { useEffect, useState } from 'react';
import { fetchAccommodation } from '../../api/accommoFetch';
import AccommodationCard from './AccommodationCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import Search from './Search';
import Loader from './Loader';
import Category from './Category';
import { Item } from '../../types/types';

const Accommodation: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Item[]>([]); // 검색 결과 상태 추가
  const [isSearchMode, setIsSearchMode] = useState<boolean>(false); // 검색 모드 상태 추가

  const { data, error, status, fetchNextPage, isFetchingNextPage, refetch } = useInfiniteQuery({
    queryKey: ['accommodation', selectedCategory], // 카테고리를 queryKey에 추가
    queryFn: ({ pageParam = 0 }) => fetchAccommodation({ pageParam, category: selectedCategory }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0, // 추가된 initialPageParam
    refetchOnWindowFocus: false,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !isSearchMode) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, isSearchMode]);

  useEffect(() => {
    if (!isSearchMode) {
      refetch(); // 카테고리가 변경되면 refetch 호출
    }
  }, [selectedCategory, refetch, isSearchMode]);

  const handleSearchResults = (data: Item[]) => {
    setSearchResults(data);
    setIsSearchMode(true); // 검색 모드 활성화
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsSearchMode(false); // 카테고리 선택 시 검색 모드 비활성화
  };

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'error') {
    return <div>{(error as Error).message}</div>;
  }

  const filteredData = isSearchMode ? searchResults : data?.pages.flatMap((page) => page.data);

  return (
    <div>
      <Search selectedCategory={selectedCategory} onSearchResults={handleSearchResults} />
      <Category onSelectCategory={handleCategorySelect} selectedCategory={selectedCategory} />
      <ul className="accommodation-container">
        {filteredData?.map((item) => <AccommodationCard key={item.id} {...item} />)}
        <div className="loading-box" ref={ref}>
          {isFetchingNextPage && <Loader />}
        </div>
      </ul>
    </div>
  );
};

export default Accommodation;

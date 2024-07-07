import React from 'react';
import CategoryItem from './CategoryItem';
import { CATEGORY_LIST } from './data';
import { CategoryProps } from '../../types/types';

const Category: React.FC<CategoryProps> = ({ onSelectCategory, selectedCategory }) => {
  return (
    <div className="category-container">
      <ul className="category">
        {CATEGORY_LIST.map((categoryItem) => (
          <CategoryItem
            key={categoryItem.category}
            {...categoryItem}
            onSelectCategory={onSelectCategory}
            selected={selectedCategory === categoryItem.category}
          />
        ))}
      </ul>
    </div>
  );
};

export default Category;

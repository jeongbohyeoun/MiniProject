import { CategoryItemProps } from '../../types/types';

const CategoryItem: React.FC<CategoryItemProps> = ({ category, image, onSelectCategory, selected }) => {
  return (
    <li className={`category-item ${selected ? 'active' : ''}`} onClick={() => onSelectCategory(category)}>
      <img className="image" src={image} alt={category}></img>
      <div className="type">{category}</div>
    </li>
  );
};

export default CategoryItem;

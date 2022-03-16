/* eslint-disable react/react-in-jsx-scope */
import './style.scss';

const CategoryCard = (data) => {
  
  return (
    <div className="category-card">
      <img src={data.image}/>
      <div>{data.name}</div>
    </div>
  );
};

export default CategoryCard;

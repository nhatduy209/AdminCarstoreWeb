/* eslint-disable react/react-in-jsx-scope */
import './style.scss';

const NotificationCard = (data) => {
  console.log(data)
  return (
    <div className="notification-card">
      <img className='notification-card__image' height="50px" width="50px" src={data.image}/>
      <div>
        <div>{data.name}</div>
      </div>
      <div>{data.content}</div>
    </div>
  );
};

export default NotificationCard;

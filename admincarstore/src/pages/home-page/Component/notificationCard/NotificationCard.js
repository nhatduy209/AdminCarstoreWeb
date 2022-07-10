/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import defaultAvatar from '../../../../assets/img/default-avatar.svg';

const NotificationCard = data => {
  return (
    <div className="notification-card" onClick={data.handleClick}>
      <img
        className="notification-card__image"
        height="40px"
        width="40px"
        src={data?.image || defaultAvatar}
      />
      <div>
        <div className="text--bold">{data?.name || 'user name'}</div>
        <div
          className={`notification-card__content ${
            data.type === 'message' ? 'text--ellipsis' : ''
          }`}>
          {data?.content || 'empty text'}
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;

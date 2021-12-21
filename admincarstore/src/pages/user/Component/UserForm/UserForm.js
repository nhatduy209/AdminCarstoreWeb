/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import moment from 'moment';
const UserForm = selectedItem => {
  console.log('HELLO THERE---', selectedItem);
  return (
    <div className="car-form--container">
      <form className="car-form-content">
        <div className="car-form-content--left">
          <div className="car-form-content__field">
            <div className="car-form-content__field__label">Full name</div>
            <input
              className="car-form-content__field__input"
              placeholder="Please enter name"
              type="text"
              value={selectedItem?.name}
              disabled
            />
          </div>
          <div className="car-form-content__field">
            <div className="car-form-content__field__label">Email</div>
            <input
              className="car-form-content__field__input"
              placeholder="Please enter prices"
              value={selectedItem?.email}
              type="text"
              disabled
            />
          </div>
          <div className="car-form-content__field">
            <div className="car-form-content__field__label">Address</div>
            <input
              className="car-form-content__field__input"
              placeholder="Please enter height"
              value={selectedItem?.address}
              type="text"
              disabled
            />
          </div>
          <div className="car-form-content__field">
            <div className="car-form-content__field__label">Phone Number</div>
            <input
              className="car-form-content__field__input"
              placeholder="Please enter height"
              value={selectedItem?.phone}
              type="text"
              disabled
            />

            <div className="car-form-content__field">
              <div className="car-form-content__field__label">Birthday</div>
              <input
                className="car-form-content__field__input"
                placeholder="Please enter length"
                value={moment(selectedItem?.birthday).format('MM/DD/YYYY')}
                type="text"
                disabled
              />
            </div>
          </div>
          <div className="car-form-content__field">
            <div className="car-form-content__field__label">Role</div>
            <input
              className="car-form-content__field__input"
              placeholder="Please enter width"
              value={selectedItem?.role}
              type="text"
              disabled
            />
          </div>
          <div className="car-form-content__field">
            <div className="car-form-content__field__label">Gender</div>
            <input
              className="car-form-content__field__input"
              placeholder="Please enter length"
              value={selectedItem?.gender}
              type="text"
              disabled
            />
          </div>
        </div>
      </form>
      <div className="group-btn">
        <button className="cancel-btn">
          <div>Cancel</div>
        </button>
      </div>
    </div>
  );
};

export default UserForm;

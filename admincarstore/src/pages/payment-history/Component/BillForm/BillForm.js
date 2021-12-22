/* eslint-disable react/react-in-jsx-scope */
import './style.scss';
import moment from 'moment';
const BillForm = selectedItem => {
  console.log('HELLO THERE---', selectedItem);
  return (
    <div className="car-form--container">
      <form className="booking-form-content">
        <img
          className="booking-form-content__img"
          alt="Remy Sharp"
          src={selectedItem?.car?.image ?? ''}
          style={{height: 260}}
        />
        <div className="booking-form-content__title">Car Information</div>
        <div className="booking-form-content__group">
          <div className="booking-form-content__field">
            <div className="booking-form-content__field__label">Car name</div>
            <div className="booking-form-content__field__input">
              {selectedItem?.car?.car_name ?? '--'}
            </div>
          </div>
          <div className="booking-form-content__field">
            <div className="booking-form-content__field__label">prices</div>
            <div className="booking-form-content__field__input">
              {selectedItem?.car?.prices ?? '--'}
            </div>
          </div>
          <div className="booking-form-content__field">
            <div className="booking-form-content__field__label">Category</div>
            <div className="booking-form-content__field__input">
              {selectedItem?.car?.category ?? '--'}
            </div>
          </div>
          <div className="booking-form-content__field">
            <div className="booking-form-content__field__label">Color</div>
            <div className="booking-form-content__field__input">
              {selectedItem?.car?.color ?? '--'}
            </div>
          </div>
        </div>

        <div className="booking-form-content__title">Client information</div>
        <div className="booking-form-content__group">
          <div className="booking-form-content__field">
            <div className="booking-form-content__field__label">Client name</div>
            <div className="booking-form-content__field__input">
              {selectedItem?.client?.name ?? '--'}
            </div>
          </div>
          <div className="booking-form-content__field">
            <div className="booking-form-content__field__label">Email</div>
            <div className="booking-form-content__field__input">
              {selectedItem?.client?.email ?? '--'}
            </div>
          </div>
          <div className="booking-form-content__field">
            <div className="booking-form-content__field__label">Address</div>
            <div className="booking-form-content__field__input">
              {selectedItem?.client?.address ?? '--'}
            </div>
          </div>
          <div className="booking-form-content__field end-field">
            <div className="booking-form-content__field__label">Personal ID</div>
            <div className="booking-form-content__field__input">
              {selectedItem?.client?.personal_id ?? '--'}
            </div>
          </div>
        </div>

        <div className="booking-form-content__title">Admin information</div>
        <div className="booking-form-content__group">
          <div className="booking-form-content__field">
            <div className="booking-form-content__field__label">Admin name</div>
            <div className="booking-form-content__field__input">
              {selectedItem?.admin?.name ?? '--'}
            </div>
          </div>
          <div className="booking-form-content__field">
            <div className="booking-form-content__field__label">
              Email
            </div>
            <div className="booking-form-content__field__input">
              {selectedItem?.admin?.email ?? '--'}
            </div>
          </div>
          <div className="booking-form-content__field end-field">
            <div className="booking-form-content__field__label">
              Personal ID
            </div>
            <div className="booking-form-content__field__input">
              {selectedItem?.admin?.personal_id ?? '--'}
            </div>
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

export default BillForm;

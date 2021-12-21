/* eslint-disable react/react-in-jsx-scope */
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {STATUS} from '../../../../Config/Status/Index';
import {
  cancelBooking,
  getBooking,
} from '../../../../Redux/reducer/BookingReducer';
import './style.scss';

const PaymentForm = (selectedMeeting, setOpenPayment) => {
  const dispatch = useDispatch();
  const meetings = useSelector(state => state.BookingReducer.listBooking);
  const confirmStatus = useSelector(
    state => state.BookingReducer.cancelStatus,
  );
  const meetingDetail = meetings.filter(
    el => el.id_meeting === selectedMeeting,
  )[0];
  useEffect(() => {
    if (confirmStatus === STATUS.SUCCESS) {
      setOpenPayment(false);
      dispatch(getBooking());
    }
  }, [confirmStatus]);
  const handleConfirm = () => {
    dispatch(cancelBooking(meetingDetail));
  };

  const routeToPayment = () => {
    setOpenPayment(false);
  }

  const renderConfirmButton = () => {
    if(meetingDetail?.status_meeting) {
      return (
        <button className="go-to-history-perchase">
        <div onClick={() => routeToPayment()}>Go to history purchase</div>
      </button>
      )
    }
    return (
      <button className="confirm-btn">
        <div onClick={() => handleConfirm()}>Confirm</div>
      </button>
    );
  };
  return (
    <div>
      <form className="booking-form-content">
        <img
          className="booking-form-content__img"
          alt="Remy Sharp"
          src={meetingDetail?.car_booking?.image ?? ''}
          style={{height: 260}}
        />
        <div className="booking-form-content__title">Client Information</div>
        <div className="booking-form-content__group">
          <div className="booking-form-content__field">
            <div className="booking-form-content__field__label">Email</div>
            <div className="booking-form-content__field__input">
              {meetingDetail?.clients_email ?? '--'}
            </div>
          </div>
          <div className="booking-form-content__field">
            <div className="booking-form-content__field__label">Full name</div>
            <div className="booking-form-content__field__input">
              {meetingDetail?.full_name ?? '--'}
            </div>
          </div>
          <div className="booking-form-content__field">
            <div className="booking-form-content__field__label">Country</div>
            <div className="booking-form-content__field__input">
              {meetingDetail?.country ?? '--'}
            </div>
          </div>
          <div className="booking-form-content__field">
            <div className="booking-form-content__field__label">Address</div>
            <div className="booking-form-content__field__input">
              {meetingDetail?.address ?? '--'}
            </div>
          </div>
          <div className="booking-form-content__field">
            <div className="booking-form-content__field__label">
              Phone number
            </div>
            <div className="booking-form-content__field__input">
              {meetingDetail?.phone_number ?? '--'}
            </div>
          </div>
          <div className="booking-form-content__field end-field">
            <div className="booking-form-content__field__label">ID number</div>
            <div className="booking-form-content__field__input">
              {meetingDetail?.personal_id ?? '--'}
            </div>
          </div>
        </div>

        <div className="booking-form-content__title">Car information</div>
        <div className="booking-form-content__group">
          <div className="booking-form-content__field">
            <div className="booking-form-content__field__label">Name</div>
            <div className="booking-form-content__field__input">
              {meetingDetail?.car_booking?.car_name ?? '--'}
            </div>
          </div>
          <div className="booking-form-content__field">
            <div className="booking-form-content__field__label">Category</div>
            <div className="booking-form-content__field__input">
              {meetingDetail?.car_booking?.category ?? '--'}
            </div>
          </div>
          <div className="booking-form-content__field">
            <div className="booking-form-content__field__label">Color</div>
            <div className="booking-form-content__field__input">
              {meetingDetail?.car_booking?.color ?? '--'}
            </div>
          </div>
          <div className="booking-form-content__field end-field">
            <div className="booking-form-content__field__label">Prices</div>
            <div className="booking-form-content__field__input">
              {meetingDetail?.car_booking?.prices ?? '--'}
            </div>
          </div>
        </div>

        <div className="booking-form-content__title">Meeting information</div>
        <div className="booking-form-content__group">
          <div className="booking-form-content__field">
            <div className="booking-form-content__field__label">ID</div>
            <div className="booking-form-content__field__input">
              {meetingDetail?.id_meeting ?? '--'}
            </div>
          </div>
          <div className="booking-form-content__field">
            <div className="booking-form-content__field__label">
              Meeting status
            </div>
            <div className="booking-form-content__field__input">
              {!meetingDetail?.status_meeting ? 'Waiting confirm' : 'confirmed'}
            </div>
          </div>
          <div className="booking-form-content__field end-field">
            <div className="booking-form-content__field__label">
              Meeting date
            </div>
            <div className="booking-form-content__field__input">
              {meetingDetail?.date_meeting ?? '--'}
            </div>
          </div>
        </div>
      </form>
      <div className="form-group-btn">
        <button className="cancel-btn">
          <div onClick={() => setOpenPayment(false)}>Cancel</div>
        </button>
        {renderConfirmButton()}
      </div>
    </div>
  );
};

export default PaymentForm;

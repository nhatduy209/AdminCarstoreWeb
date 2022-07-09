/* eslint-disable react/react-in-jsx-scope */
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {STATUS} from '../../../../Config/Status/Index';
import {createPayment} from '../../../../Redux/reducer/PaymentHistoryReducer';
import {getBooking} from '../../../../Redux/reducer/BookingReducer';
import './style.scss';
import {ToastContainer} from 'react-toastify';
import {toast} from 'react-toastify';

const PaymentForm = (selectedMeeting, setOpenPayment) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const adminAcc = useSelector(state => state.AccountReducer.account);
  const meetings = useSelector(state => state.BookingReducer.listBooking);
  const meetingDetail = meetings.filter(
    el => el.id_meeting === selectedMeeting,
  )[0];
  const confirmStatus = useSelector(
    state => state.PaymentHistoryReducer.status,
  );

  console.log(
    ' meetingDetail?.car_booking?' + JSON.stringify(meetingDetail?.car_booking),
  );
  const handleConfirm = () => {
    if (!meetingDetail?.clients_email) {
      toast.error('Add car error');
      return;
    }
    const data = {
      client: {
        name: meetingDetail?.full_name ?? '',
        address: meetingDetail?.address ?? 'adbxyz',
        email: meetingDetail?.clients_email ?? '',
        personal_id: meetingDetail?.personal_id ?? '12412411',
      },
      car: {
        name: meetingDetail?.car_booking?.car_name ?? 'CAMRY 2.0G',
        prices: meetingDetail?.car_booking?.prices ?? 20000,
        color: meetingDetail?.car_booking?.color ?? 'black',
        category: meetingDetail?.car_booking?.category ?? 'Toyota',
        image: meetingDetail?.car_booking?.image ?? '',
      },
      admin: {
        name: adminAcc.name,
        email: adminAcc.email,
        personal_id: '12412411',
      },
      id_meeting: meetingDetail?.id_meeting ?? '',
    };
    dispatch(createPayment(data));
  };

  useEffect(() => {
    if (confirmStatus === STATUS.SUCCESS) {
      setOpenPayment(false);
      dispatch(getBooking());
    }
  }, [confirmStatus]);

  const routeToPayment = () => {
    navigate('/payment-history');
    setOpenPayment(false);
  };

  const renderConfirmButton = () => {
    if (meetingDetail?.status_payment) {
      return (
        <button className="go-to-history-perchase confirm-btn">
          <div onClick={() => routeToPayment()}>Go to history purchase</div>
        </button>
      );
    }
    return (
      <button className="confirm-btn">
        <div onClick={() => handleConfirm()}>Confirm</div>
      </button>
    );
  };
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
              {!meetingDetail?.status_payment ? 'Waiting confirm' : 'confirmed'}
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

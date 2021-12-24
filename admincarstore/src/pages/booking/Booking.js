/* eslint-disable react/react-in-jsx-scope */
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getBooking} from '../../Redux/reducer/BookingReducer';
import Dialog from '@mui/material/Dialog';
import BookingForm from './Component/BookingForm/BookingForm';
import {Icon} from '@mui/material';
import './style.scss';
import PaymentForm from './Component/PaymentForm/PaymentForm';
const Booking = () => {
  const handleData = data => {
    const list = [];
    data.forEach(element => {
      list.push({
        title: element.full_name,
        extendedProps: {
          item: element,
        },
        date: element.date_meeting,
      });
    });
    return list;
  };
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const meetings = useSelector(state =>
    handleData(state.BookingReducer.listBooking),
  );
  const meetingStatus = useSelector(state => state.BookingReducer.status);

  useEffect(() => {
    dispatch(getBooking('admin@gmail.com'));
  }, [meetingStatus]);

  const handleEventClick = eventInfo => {
    setSelectedMeeting(eventInfo.event._def.extendedProps.item.id_meeting);
    setOpen(true);
  };

  const showPayment = () => {
    setTimeout(() => {
      setOpenPayment(true);
    }, 500)
  }
  return (
    <div className='booking-container'>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={meetings}
        eventClick={event => handleEventClick(event)}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
      />
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="booking-form">
        <div className="booking-form-container">
          <div className="booking-form__header">
            <div>Meeting details</div>
            <Icon
              onClick={() => setOpen(false)}
              baseClassName="fas"
              className="fa-xmark"
              sx={{fontSize: 24}}
            />
          </div>
          {BookingForm(selectedMeeting, setOpen, showPayment)}
        </div>
      </Dialog>
      <Dialog
        open={openPayment}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="booking-form">
        <div className="booking-form-container">
          <div className="booking-form__header">
            <div>Payment details</div>
            <Icon
              onClick={() => setOpenPayment(false)}
              baseClassName="fas"
              className="fa-xmark"
              sx={{fontSize: 24}}
            />
          </div>
          {PaymentForm(selectedMeeting, setOpenPayment, showPayment)}
        </div>
      </Dialog>
    </div>
  );
};

export default Booking;

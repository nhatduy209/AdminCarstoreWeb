/* eslint-disable react/react-in-jsx-scope */
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getBooking } from '../../Redux/reducer/BookingReducer';
import moment from 'moment';

const Booking = () => {
  const handleData = (data) => {
    const list = [];
    data.forEach(element => {
      list.push({
        title: element.full_name,
        date: element.date_meeting
      })
    });
    data.forEach(element => {
      list.push({
        title: element.full_name,
        date: element.date_meeting
      })
    });

    console.log(list);

    return list;
  }
  const dispatch = useDispatch();
  const meetings = useSelector(state => handleData(state.BookingReducer.listBooking));
  const meetingStatus = useSelector(state => state.BookingReducer.status);

  useEffect(() => {
    dispatch(getBooking('admin@gmail.com'));
  },[meetingStatus])
  return (
    <div>
      <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        events={meetings}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
      />
    </div>
  )
}

export default Booking;
import * as React from 'react';
import './style.scss';
import {io} from 'socket.io-client';
import {URL_NGROK} from '../../Config/Url/URL';

const socket = io(URL_NGROK, {
  transports: ['websocket'],
});

export const NotificaitonBooking = () => {
  socket.on('receive_booking_from_admin', booking => {
    console.log('DATA SEND FROM SERVER ------' + JSON.stringify(booking.data));
  });

  return <div className="information-booking-show ">Được được</div>;
};

import moment from 'moment';
export const formatTimeDuration = (time, locale) => {
  if (!time) {
    return '';
  }

  if (diffAsDays(time) > 1) {
    return moment(time).format('HH:mm DD/MM/YYYY');
  }

  return moment(time).locale(locale || 'vi').fromNow();
}

export const diffAsDays = (time) => {
  if (!time) {
    return 0;
  }
  const now = moment(),
    duration = moment.duration(now.diff(moment(time)));

  return duration.asDays();
}
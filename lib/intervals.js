const intervals = {
  minutely: 'minutes',
  hourly: 'hours',
  daily: 'days',
  weekly: 'weeks',
  monthly: 'months',
  yearly: 'years'
};

module.exports = (interval) => {
  return intervals[interval] || interval;
};
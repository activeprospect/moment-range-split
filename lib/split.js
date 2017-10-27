const moment    = require('moment-range').extendMoment(require('moment')),
      intervals = require('./intervals');

module.exports = (range, interval) => {
  interval = intervals(interval);
  const isoInterval = interval.indexOf('week') >= 0 ? 'isoWeek' : interval;

  // don't mutate the specified range
  range = range.clone();

  // round the start down
  range.start.startOf(isoInterval);

  const dates = Array.from(range.by(interval));

  // if the last date is the same as the interval end time, then we don't
  // need to create a range for it.
  if (dates[dates.length - 1].isSame(range.end))
    dates.pop();

  const ranges = dates.map((date, index, dates) => {
    const start = date;
    let end;

    if (dates.length - 1 === index) {
      // on the last date, round the "end" up to the next whole bucket
      end = date
        .clone()               // don't modify the original "end"
        .add(1, interval)      // move to the next full interval
        .startOf(isoInterval); // rewind to the beginning of the next full interval
    } else {
      end = dates[index + 1];
    }
    return moment.range(start, end);
  });
  return ranges;
};
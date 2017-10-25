const moment    = require('moment-range').extendMoment(require('moment'));

module.exports = (ranges) => {
  ranges = ranges.sort();
  return ranges.reduce((array, range, index) => {
    const candidate = ranges[index + 1];
    if (candidate && (range.adjacent(candidate) || range.overlaps(candidate))) {
      ranges[index + 1] = moment.range(range.start.clone(), candidate.end.clone());
    } else {
      array.push(range);
    }
    return array;
  }, []);
};
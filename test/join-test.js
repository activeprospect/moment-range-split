const assert = require('chai').assert,
      moment = require('moment-range').extendMoment(require('moment')),
      join = require('../').join;

describe('Join', () => {

  it('should join adjacent ranges', () => {
    const range1 = moment.range('2017-10-12T00:01:00Z', '2017-10-12T00:05:00Z');
    const range2 = moment.range('2017-10-12T00:05:00Z', '2017-10-12T00:06:00Z');
    const ranges = join([range1, range2]);
    assert.equal(ranges.length, 1);
    assert.equal(ranges[0].start.toISOString(), '2017-10-12T00:01:00.000Z');
    assert.equal(ranges[0].end.toISOString(), '2017-10-12T00:06:00.000Z');
  });

  it('should join overlapping ranges', () => {
    const range1 = moment.range('2017-10-12T00:01:00Z', '2017-10-12T00:05:00Z');
    const range2 = moment.range('2017-10-12T00:03:00Z', '2017-10-12T00:06:00Z');
    const ranges = join([range1, range2]);
    assert.equal(ranges.length, 1);
    assert.equal(ranges[0].start.toISOString(), '2017-10-12T00:01:00.000Z');
    assert.equal(ranges[0].end.toISOString(), '2017-10-12T00:06:00.000Z');
  });

  it('should join ranges only if adjacent or overlapping', () => {
    const range1 = moment.range('2017-10-12T00:01:00Z', '2017-10-12T00:05:00Z');
    const range2 = moment.range('2017-10-12T00:06:00Z', '2017-10-12T00:07:00Z');
    const ranges = join([range1, range2]);
    assert.equal(ranges.length, 2);
    assert.equal(ranges[0].start.toISOString(), '2017-10-12T00:01:00.000Z');
    assert.equal(ranges[0].end.toISOString(), '2017-10-12T00:05:00.000Z');
    assert.equal(ranges[1].start.toISOString(), '2017-10-12T00:06:00.000Z');
    assert.equal(ranges[1].end.toISOString(), '2017-10-12T00:07:00.000Z');
  });


  it('should join broken ranges', () => {
    const range1 = moment.range('2017-10-12T00:01:00Z', '2017-10-12T00:05:00Z');
    const range2 = moment.range('2017-10-12T00:06:00Z', '2017-10-12T00:07:00Z');
    const range3 = moment.range('2017-10-12T00:07:00Z', '2017-10-12T00:08:00Z');
    const ranges = join([range1, range2, range3]);

    assert.equal(ranges.length, 2);
    assert.equal(ranges[0].start.toISOString(), '2017-10-12T00:01:00.000Z');
    assert.equal(ranges[0].end.toISOString(), '2017-10-12T00:05:00.000Z');
    assert.equal(ranges[1].start.toISOString(), '2017-10-12T00:06:00.000Z');
    assert.equal(ranges[1].end.toISOString(), '2017-10-12T00:08:00.000Z');
  });


  it('should handle unsorted ranges', () => {
    const range1 = moment.range('2017-10-12T00:01:00Z', '2017-10-12T00:05:00Z');
    const range2 = moment.range('2017-10-12T00:06:00Z', '2017-10-12T00:07:00Z');
    const range3 = moment.range('2017-10-12T00:07:00Z', '2017-10-12T00:08:00Z');
    const ranges = join([range3, range1, range2]);
    assert.equal(ranges.length, 2);
    assert.equal(ranges[0].start.toISOString(), '2017-10-12T00:01:00.000Z');
    assert.equal(ranges[0].end.toISOString(), '2017-10-12T00:05:00.000Z');
    assert.equal(ranges[1].start.toISOString(), '2017-10-12T00:06:00.000Z');
    assert.equal(ranges[1].end.toISOString(), '2017-10-12T00:08:00.000Z');
  });
});
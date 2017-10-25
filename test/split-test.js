const assert = require('chai').assert,
      moment = require('moment-range').extendMoment(require('moment')),
      split = require('../').split;

describe('Split', () => {

  it('should produce ranges', () => {
    const range = moment.range('2017-10-12T00:01:00Z', '2017-10-12T00:05:00Z');
    const ranges = split(range, 'minutely');

    assert.equal(ranges.length, 4);
    assert.equal(ranges[0].start.toISOString(), '2017-10-12T00:01:00.000Z');
    assert.equal(ranges[0].end.toISOString(), '2017-10-12T00:02:00.000Z');

    assert.equal(ranges[1].start.toISOString(), '2017-10-12T00:02:00.000Z');
    assert.equal(ranges[1].end.toISOString(), '2017-10-12T00:03:00.000Z');

    assert.equal(ranges[2].start.toISOString(), '2017-10-12T00:03:00.000Z');
    assert.equal(ranges[2].end.toISOString(), '2017-10-12T00:04:00.000Z');

    assert.equal(ranges[3].start.toISOString(), '2017-10-12T00:04:00.000Z');
    assert.equal(ranges[3].end.toISOString(), '2017-10-12T00:05:00.000Z');
  });


  it('should round partial range up to the next whole range', () => {
    const range = moment.range('2017-10-12T00:01:00Z', '2017-10-12T00:02:35Z');
    const ranges = split(range, 'minutely');
    assert.equal(ranges.length, 2);

    assert.equal(ranges[0].start.toISOString(), '2017-10-12T00:01:00.000Z');
    assert.equal(ranges[0].end.toISOString(), '2017-10-12T00:02:00.000Z');

    assert.equal(ranges[1].start.toISOString(), '2017-10-12T00:02:00.000Z');
    assert.equal(ranges[1].end.toISOString(), '2017-10-12T00:03:00.000Z');
  });
});
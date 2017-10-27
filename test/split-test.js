const assert = require('chai').assert,
      moment = require('moment-range').extendMoment(require('moment')),
      split = require('../').split;

describe('Split', () => {

  it('should produce ranges', () => {
    const range = moment.range(moment.utc('2017-10-12T00:01:00Z'), moment.utc('2017-10-12T00:05:00Z'));
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


  it('should round partial end up to the next whole interval', () => {
    const range = moment.range(moment.utc('2017-10-12T00:01:00Z'), moment.utc('2017-10-12T00:02:35Z'));
    const ranges = split(range, 'minutely');
    assert.equal(ranges.length, 2);

    assert.equal(ranges[0].start.toISOString(), '2017-10-12T00:01:00.000Z');
    assert.equal(ranges[0].end.toISOString(), '2017-10-12T00:02:00.000Z');

    assert.equal(ranges[1].start.toISOString(), '2017-10-12T00:02:00.000Z');
    assert.equal(ranges[1].end.toISOString(), '2017-10-12T00:03:00.000Z');
  });

  it('should round partial start down to the next whole interval', () => {
    const range = moment.range(moment.utc('2017-10-12T00:01:12Z'), moment.utc('2017-10-12T00:03:00Z'));
    const ranges = split(range, 'minutely');
    assert.equal(ranges.length, 2);

    assert.equal(ranges[0].start.toISOString(), '2017-10-12T00:01:00.000Z');
    assert.equal(ranges[0].end.toISOString(), '2017-10-12T00:02:00.000Z');

    assert.equal(ranges[1].start.toISOString(), '2017-10-12T00:02:00.000Z');
    assert.equal(ranges[1].end.toISOString(), '2017-10-12T00:03:00.000Z');
  });

  it('should split into weeks starting on monday', () => {
    // wednesday to wednesday
    const range = moment.range(moment.utc('2017-10-18T01:55:55Z'), moment.utc('2017-10-25T00:02:35Z'));
    const ranges = split(range, 'weekly');
    assert.equal(ranges.length, 2);

    // first week: monday morning to monday morning
    assert.equal(ranges[0].start.toISOString(), '2017-10-16T00:00:00.000Z');
    assert.equal(ranges[0].end.toISOString(), '2017-10-23T00:00:00.000Z');

    // second week: monday morning to monday morning
    assert.equal(ranges[1].start.toISOString(), '2017-10-23T00:00:00.000Z');
    assert.equal(ranges[1].end.toISOString(), '2017-10-30T00:00:00.000Z');
  })
});
const assert = require('chai').assert,
      intervals = require('../lib/intervals');

describe('Intervals', () => {

  it('should translate minutely', () => {
    assert.equal(intervals('minutely'), 'minutes');
  });

  it('should translate hourly', () => {
    assert.equal(intervals('hourly'), 'hours');
  });

  it('should translate daily', () => {
    assert.equal(intervals('daily'), 'days');
  });

  it('should translate weekly', () => {
    assert.equal(intervals('weekly'), 'weeks');
  });

  it('should translate monthly', () => {
    assert.equal(intervals('monthly'), 'months');
  });

  it('should translate yearly', () => {
    assert.equal(intervals('yearly'), 'years');
  });

  it('should pass through unknown interval', () => {
    assert.equal(intervals('minutes'), 'minutes');
  })

});
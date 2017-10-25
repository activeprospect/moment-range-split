# Moment Range Split

A library to split and join [moment ranges](https://github.com/rotaready/moment-range).

[![Build Status](https://travis-ci.org/activeprospect/moment-range-split.svg?branch=master)](https://travis-ci.org/activeprospect/moment-range-split)

## Installation

```bash
npm install moment-range-split --save
```

## Usage

This library can be used to split ranges and join ranges.

#### Split

To split a range into multiple sub-ranges, specify the range and the interval on which to split:

```javascript
const { split } = require('moment-range-split');

const range = moment.range('2017-01-01T00:01:00', '2017-01-01T00:05:00');
const ranges = split(range, 'minutes');
console.log(ranges);

// =>
// [ { [Number: 60000]
//     start: moment("2017-10-11T19:01:00.000"),
//     end: moment("2017-10-11T19:02:00.000") },
//   { [Number: 60000]
//     start: moment("2017-10-11T19:02:00.000"),
//     end: moment("2017-10-11T19:03:00.000") },
//   { [Number: 60000]
//     start: moment("2017-10-11T19:03:00.000"),
//     end: moment("2017-10-11T19:04:00.000") },
//   { [Number: 60000]
//     start: moment("2017-10-11T19:04:00.000"),
//     end: moment("2017-10-11T19:05:00.000") } ]

```

Supported intervals are:

* minutely or minutes
* hourly or hours
* daily or days
* weekly or weeks
* monthly or months
* yearly or years

#### Join

To join an array of ranges, specify the array. The `join()` function will merge adjacent or overlapping ranges.

```javascript
const { join } = require('moment-range-split');

const range1 = moment.range('2017-10-12T00:01:00Z', '2017-10-12T00:05:00Z');
const range2 = moment.range('2017-10-12T00:06:00Z', '2017-10-12T00:07:00Z');
const range3 = moment.range('2017-10-12T00:07:00Z', '2017-10-12T00:08:00Z');

const ranges = join([range1, range2, range3]);
console.log(ranges)

// =>
// [ { [Number: 240000]
//     start: moment("2017-10-11T19:01:00.000"),
//     end: moment("2017-10-11T19:05:00.000") },
//   { [Number: 120000]
//     start: moment("2017-10-11T19:06:00.000"),
//     end: moment("2017-10-11T19:08:00.000") } ]

```
'use strict';

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('pdfjs/streams/count-queuing-strategy', ['exports',
      'pdfjs/streams/helpers'], factory);
  } else if (exports !== 'undefined') {
    factory(exports, require('./helpers.js'));
  } else {
    factory((root.pdfjsStreamsCountQueuingStrategy = {}),
      root.pdfjsStreamsHelpers);
  }
}(this, function(exports, streamsHelpers) {
const createDataProperty = streamsHelpers.createDataProperty;

class CountQueuingStrategy {
  constructor({ highWaterMark }) {
    createDataProperty(this, 'highWaterMark', highWaterMark);
  }

  size() {
    return 1;
  }
}

exports.CountQueuingStrategy = CountQueuingStrategy;
}));

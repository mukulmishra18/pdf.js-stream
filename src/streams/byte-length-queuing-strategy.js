'use strict';

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('pdfjs/streams/byte-length-queuing-strategy',
      ['exports', 'pdfjs/streams/helpers'], factory);
  } else if (typeof exports !== 'undefined') {
      factory(exports, require('./helpers.js'));
  } else {
      factory((root.pdfjsStreamsByteLengthQueuingStrategy = {}),
        root.pdfjsStreamsHelpers);
  }
}(this, function(exports, streamsHelpers) {
const createDataProperty = streamsHelpers.createDataProperty;

class ByteLengthQueuingStrategy {
  constructor({ highWaterMark }) {
    createDataProperty(this, 'highWaterMark', highWaterMark);
  }

  size(chunk) {
    return chunk.byteLength;
  }
}

exports.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
}));

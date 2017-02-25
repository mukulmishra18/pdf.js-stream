'use strict';

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('pdfjs/streams/utils', ['exports',
      'pdfjs/shared/util'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports, require('../shared/util.js'));
  } else {
    factory((root.pdfjsStreamsUtils = {}), root.pdfjsSharedUtil);
  }
}(this, function (exports, sharedUtil) {
var assert = sharedUtil.assert;

var rethrowAssertionErrorRejection = e => {
  // Used throughout the reference implementation, as
  // `.catch(rethrowAssertionErrorRejection)`, to ensure any errors
  // get shown. There are places in the spec where we do promise
  // transformations and purposefully ignore or don't
  // expect any errors, but assertion errors are always problematic.
  if (e && e.constructor === assert.AssertionError) {
    setTimeout(() => {
      throw e;
    }, 0);
  }
};

exports.rethrowAssertionErrorRejection = rethrowAssertionErrorRejection;
}));

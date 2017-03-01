/* Copyright 2017 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

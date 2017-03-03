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
    define('pdfjs/streams/byte-length-queuing-strategy',
      ['exports', 'pdfjs/streams/helpers'], factory);
  } else if (typeof exports !== 'undefined') {
      factory(exports, require('./helpers.js'));
  } else {
      factory((root.pdfjsStreamsByteLengthQueuingStrategy = {}),
        root.pdfjsStreamsHelpers);
  }
}(this, function(exports, streamsHelpers) {
var createDataProperty = streamsHelpers.createDataProperty;

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

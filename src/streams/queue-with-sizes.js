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
    define('pdfjs/streams/queue-with-sizes', ['exports', 'pdfjs/shared/util',
      'pdfjs/streams/helpers'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports, require('../shared/util.js'), require('./helpers.js'));
  } else {
    factory((root.pdfjsStreamsQueueWithSizes = {}), root.pdfjsSharedUtil,
      root.pdfjsStreamsHelpers);
  }
}(this, function (exports, sharedUtil, streamsHelpers) {
var assert = sharedUtil.assert;
var IsFiniteNonNegativeNumber = streamsHelpers.IsFiniteNonNegativeNumber;

var DequeueValue = container => {
  assert('_queue' in container && '_queueTotalSize' in container,
    'Spec-level failure: DequeueValue should only be used on containers' +
    ' with [[queue]] and [[queueTotalSize]].');
  assert(container._queue.length > 0,
    'Spec-level failure: should never dequeue from an empty queue.');

  const pair = container._queue.shift();
  container._queueTotalSize -= pair.size;
  if (container._queueTotalSize < 0) {
    container._queueTotalSize = 0;
  }

  return pair.value;
};

var EnqueueValueWithSize = (container, value, size) => {
  assert('_queue' in container && '_queueTotalSize' in container,
    'Spec-level failure: EnqueueValueWithSize should only be used on' +
    ' containers with [[queue]] and [[queueTotalSize]].');

  size = Number(size);
  if (!IsFiniteNonNegativeNumber(size)) {
    throw new RangeError('Size must be a finite, non-NaN, non-negative' +
                         ' number.');
  }

  container._queue.push({ value, size });
  container._queueTotalSize += size;
};

var PeekQueueValue = container => {
  assert('_queue' in container && '_queueTotalSize' in container,
    'Spec-level failure: PeekQueueValue should only be used on containers' +
    ' with [[queue]] and [[queueTotalSize]].');
  assert(container._queue.length > 0,
    'Spec-level failure: should never peek at an empty queue.');

  const pair = container._queue[0];
  return pair.value;
};

var ResetQueue = container => {
  assert('_queue' in container && '_queueTotalSize' in container,
    'Spec-level failure: ResetQueue should only be used on containers' +
    ' with [[queue]] and [[queueTotalSize]].');

  container._queue = [];
  container._queueTotalSize = 0;
};

exports.DequeueValue = DequeueValue;
exports.EnqueueValueWithSize = EnqueueValueWithSize;
exports.PeekQueueValue = PeekQueueValue;
exports.ResetQueue = ResetQueue;
}));

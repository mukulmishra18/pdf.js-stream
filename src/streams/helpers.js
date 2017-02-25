'use strict';

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('pdfjs/streams/helpers', ['exports',
      'pdfjs/shared/util'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports, require('../shared/util.js'));
  } else {
    factory((root.pdfjsStreamsHelpers = {}), root.pdfjsSharedUtil);
  }
}(this, function (exports, sharedUtil) {
var assert = sharedUtil.assert;

function IsPropertyKey(argument) {
  return typeof argument === 'string' || typeof argument === 'symbol';
}

var typeIsObject = x => (typeof x === 'object' && x !== null) ||
                     typeof x === 'function';

var createDataProperty = (o, p, v) => {
  assert(exports.typeIsObject(o));
  Object.defineProperty(o, p, { value: v,
                                writable: true,
                                enumerable: true,
                                configurable: true });
};

var createArrayFromList = elements => {
  // We use arrays to represent lists, so this is basically a no-op.
  // Do a slice though just in case we happen to depend on the unique-ness.
  return elements.slice();
};

var ArrayBufferCopy = (dest, destOffset, src, srcOffset, n) => {
  new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
};

var CreateIterResultObject = (value, done) => {
  assert(typeof done === 'boolean');
  const obj = {};
  Object.defineProperty(obj, 'value', { value, enumerable: true,
                                        writable: true,
                                        configurable: true });
  Object.defineProperty(obj, 'done', { value: done, enumerable: true,
                                       writable: true,
                                       configurable: true });
  return obj;
};

var IsFiniteNonNegativeNumber = v => {
  if (Number.isNaN(v)) {
    return false;
  }
  if (v === Infinity) {
    return false;
  }
  if (v < 0) {
    return false;
  }

  return true;
};

function Call(F, V, args) {
  if (typeof F !== 'function') {
    throw new TypeError('Argument is not a function');
  }

  return Function.prototype.apply.call(F, V, args);
}

var InvokeOrNoop = (O, P, args) => {
  assert(O !== undefined);
  assert(IsPropertyKey(P));
  assert(Array.isArray(args));

  const method = O[P];
  if (method === undefined) {
    return undefined;
  }

  return Call(method, O, args);
};

var PromiseInvokeOrNoop = (O, P, args) => {
  assert(O !== undefined);
  assert(IsPropertyKey(P));
  assert(Array.isArray(args));
  try {
    return Promise.resolve(exports.InvokeOrNoop(O, P, args));
  } catch (returnValueE) {
    return Promise.reject(returnValueE);
  }
};

var PromiseInvokeOrPerformFallback = (O, P, args, F, argsF) => {
  assert(O !== undefined);
  assert(IsPropertyKey(P));
  assert(Array.isArray(args));
  assert(Array.isArray(argsF));

  let method;
  try {
    method = O[P];
  } catch (methodE) {
    return Promise.reject(methodE);
  }

  if (method === undefined) {
    return F(...argsF);
  }

  try {
    return Promise.resolve(Call(method, O, args));
  } catch (e) {
    return Promise.reject(e);
  }
};

// Not implemented correctly
var SameRealmTransfer = O => O;

var ValidateAndNormalizeHighWaterMark = highWaterMark => {
  highWaterMark = Number(highWaterMark);
  if (Number.isNaN(highWaterMark) || highWaterMark < 0) {
    throw new RangeError('highWaterMark property of a queuing' +
                         ' strategy must be non-negative and non-NaN');
  }

  return highWaterMark;
};

var ValidateAndNormalizeQueuingStrategy = (size, highWaterMark) => {
  if (size !== undefined && typeof size !== 'function') {
    throw new TypeError('size property of a queuing strategy must be' +
                        ' a function');
  }

  highWaterMark = exports.ValidateAndNormalizeHighWaterMark(highWaterMark);

  return { size, highWaterMark };
};

exports.typeIsObject = typeIsObject;
exports.createDataProperty = createDataProperty;
exports.createArrayFromList = createArrayFromList;
exports.ArrayBufferCopy = ArrayBufferCopy;
exports.CreateIterResultObject = CreateIterResultObject;
exports.IsFiniteNonNegativeNumber = IsFiniteNonNegativeNumber;
exports.InvokeOrNoop = InvokeOrNoop;
exports.PromiseInvokeOrNoop = PromiseInvokeOrNoop;
exports.PromiseInvokeOrPerformFallback = PromiseInvokeOrPerformFallback;
exports.SameRealmTransfer = SameRealmTransfer;
exports.ValidateAndNormalizeHighWaterMark = ValidateAndNormalizeHighWaterMark;
exports.ValidateAndNormalizeQueuingStrategy =
  ValidateAndNormalizeQueuingStrategy;
}));

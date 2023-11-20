"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }const minni = (event, callback) => new Promise((resolve) => {
  if ("touches" in event) {
    const start = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY
    };
    const getDelta = (event2) => ({
      x: event2.touches[0].clientX - start.x,
      y: start.y - event2.touches[0].clientY
    });
    const move = (event2) => _optionalChain([callback, 'optionalCall', _ => _(getDelta(event2), event2)]);
    const end = (event2) => {
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", end);
      resolve(getDelta(event2));
    };
    window.addEventListener("touchmove", move);
    window.addEventListener("touchend", end);
  } else {
    const start = {
      x: event.clientX,
      y: event.clientY
    };
    const getDelta = (event2) => ({
      x: event2.clientX - start.x,
      y: start.y - event2.clientY
    });
    const move = (event2) => _optionalChain([callback, 'optionalCall', _2 => _2(getDelta(event2), event2)]);
    const end = (event2) => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", end);
      resolve(getDelta(event2));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", end);
  }
});


exports.minni = minni;

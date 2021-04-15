"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.map = void 0;

const map = account => {
  const {
    _id,
    ...accounWithoutId
  } = account;
  return Object.assign({}, accounWithoutId, {
    id: _id
  });
};

exports.map = map;
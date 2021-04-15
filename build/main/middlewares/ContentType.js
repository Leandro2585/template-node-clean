"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contentType = void 0;

const contentType = (request, response, next) => {
  response.type('json');
  next();
};

exports.contentType = contentType;
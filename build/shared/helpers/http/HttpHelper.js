"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serverError = exports.unauthorized = exports.badRequest = exports.ok = void 0;

var _errors = require("../../errors");

const ok = data => ({
  statusCode: 200,
  body: data
});

exports.ok = ok;

const badRequest = error => ({
  statusCode: 400,
  body: error
});

exports.badRequest = badRequest;

const unauthorized = () => ({
  statusCode: 401,
  body: new _errors.UnauthorizedError()
});

exports.unauthorized = unauthorized;

const serverError = error => ({
  statusCode: 500,
  body: new _errors.ServerError(error.stack)
});

exports.serverError = serverError;
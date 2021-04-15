"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MissingParamError = require("./MissingParamError");

Object.keys(_MissingParamError).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _MissingParamError[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _MissingParamError[key];
    }
  });
});

var _InvalidParamError = require("./InvalidParamError");

Object.keys(_InvalidParamError).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _InvalidParamError[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _InvalidParamError[key];
    }
  });
});

var _UnauthorizedError = require("./UnauthorizedError");

Object.keys(_UnauthorizedError).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _UnauthorizedError[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _UnauthorizedError[key];
    }
  });
});

var _ServerError = require("./ServerError");

Object.keys(_ServerError).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ServerError[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ServerError[key];
    }
  });
});
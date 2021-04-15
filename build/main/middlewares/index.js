"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Cors = require("./Cors");

Object.keys(_Cors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Cors[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Cors[key];
    }
  });
});

var _BodyParser = require("./BodyParser");

Object.keys(_BodyParser).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _BodyParser[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _BodyParser[key];
    }
  });
});

var _ContentType = require("./ContentType");

Object.keys(_ContentType).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ContentType[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ContentType[key];
    }
  });
});
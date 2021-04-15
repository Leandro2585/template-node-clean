"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _protocols = require("../../protocols");

Object.keys(_protocols).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _protocols[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _protocols[key];
    }
  });
});

var _AddAccount = require("@domain/usecases/AddAccount");

Object.keys(_AddAccount).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _AddAccount[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _AddAccount[key];
    }
  });
});

var _Account = require("@domain/models/Account");

Object.keys(_Account).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Account[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Account[key];
    }
  });
});
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bodyParser = void 0;

var _express = require("express");

const bodyParser = (0, _express.json)();
exports.bodyParser = bodyParser;
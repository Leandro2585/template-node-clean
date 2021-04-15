"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _middlewares = require("../middlewares");

var _default = app => {
  app.use(_middlewares.bodyParser);
  app.use(_middlewares.cors);
  app.use(_middlewares.contentType);
};

exports.default = _default;
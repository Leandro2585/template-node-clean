"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/clean-server',
  port: process.env.SERVER_PORT || 3333,
  jwtSecret: process.env.JWT_SECRET || 'default'
};
exports.default = _default;
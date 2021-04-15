"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ExpressRouteAdapter = require("../adapters/express/ExpressRouteAdapter");

var _SignUpFactory = require("../factories/SignUp/SignUpFactory");

var _LoginFactory = require("../factories/Login/LoginFactory");

var _default = router => {
  router.post('/signup', (0, _ExpressRouteAdapter.adaptRoute)((0, _SignUpFactory.makeSignUpController)()));
  router.post('/login', (0, _ExpressRouteAdapter.adaptRoute)((0, _LoginFactory.makeLoginController)()));
};

exports.default = _default;
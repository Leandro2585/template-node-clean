"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeLoginValidation = void 0;

var _validators = require("@shared/helpers/validators");

var _EmailValidatorAdapter = require("@main/adapters/validators/EmailValidatorAdapter");

const makeLoginValidation = () => {
  const validations = [];

  for (const field of ['email', 'password']) {
    validations.push(new _validators.RequiredFieldValidation(field));
  }

  validations.push(new _validators.EmailValidation('email', new _EmailValidatorAdapter.EmailValidatorAdapter()));
  return new _validators.ValidationComposite(validations);
};

exports.makeLoginValidation = makeLoginValidation;
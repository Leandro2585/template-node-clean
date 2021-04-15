"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeSignUpValidation = void 0;

var _validators = require("@shared/helpers/validators");

var _EmailValidatorAdapter = require("@main/adapters/validators/EmailValidatorAdapter");

const makeSignUpValidation = () => {
  const validations = [];

  for (const field of ['name', 'email', 'password', 'confirmPassword']) {
    validations.push(new _validators.RequiredFieldValidation(field));
  }

  validations.push(new _validators.CompareFieldsValidation('password', 'confirmPassword'));
  validations.push(new _validators.EmailValidation('email', new _EmailValidatorAdapter.EmailValidatorAdapter()));
  return new _validators.ValidationComposite(validations);
};

exports.makeSignUpValidation = makeSignUpValidation;
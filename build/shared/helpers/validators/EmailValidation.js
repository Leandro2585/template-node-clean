"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmailValidation = void 0;

var _errors = require("@shared/errors");

class EmailValidation {
  constructor(fieldName, emailValidator) {
    this.fieldName = fieldName;
    this.emailValidator = emailValidator;
  }

  validate(input) {
    const isValid = this.emailValidator.isValid(input[this.fieldName]);

    if (!isValid) {
      return new _errors.InvalidParamError(this.fieldName);
    }
  }

}

exports.EmailValidation = EmailValidation;
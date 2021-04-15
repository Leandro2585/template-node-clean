"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RequiredFieldValidation = void 0;

var _errors = require("@shared/errors");

class RequiredFieldValidation {
  constructor(fieldName) {
    this.fieldName = fieldName;
  }

  validate(input) {
    if (!input[this.fieldName]) {
      return new _errors.MissingParamError(this.fieldName);
    }
  }

}

exports.RequiredFieldValidation = RequiredFieldValidation;
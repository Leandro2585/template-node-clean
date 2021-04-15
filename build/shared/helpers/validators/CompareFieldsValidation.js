"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompareFieldsValidation = void 0;

var _errors = require("@shared/errors");

class CompareFieldsValidation {
  constructor(fieldName, fieldToCompareName) {
    this.fieldName = fieldName;
    this.fieldToCompareName = fieldToCompareName;
  }

  validate(input) {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return new _errors.InvalidParamError(this.fieldToCompareName);
    }
  }

}

exports.CompareFieldsValidation = CompareFieldsValidation;
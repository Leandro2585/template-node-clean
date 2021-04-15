"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogMongoRepository = void 0;

var _MongoHelper = require("../helpers/MongoHelper");

class LogMongoRepository {
  async logError(stack) {
    const errorCollection = await _MongoHelper.MongoHelper.getCollection('errors');
    await errorCollection.insertOne({
      stack,
      date: new Date()
    });
  }

}

exports.LogMongoRepository = LogMongoRepository;
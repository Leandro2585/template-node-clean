"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MongoHelper = void 0;

var _mongodb = require("mongodb");

const MongoHelper = {
  client: null,
  url: null,

  async connect(url) {
    this.url = url;
    this.client = await _mongodb.MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  },

  async disconnect() {
    await this.client.close();
    this.client = null;
  },

  async getCollection(collectionName) {
    if (!this.client || !this.client.isConnected()) {
      await this.connect(this.url);
    }

    return this.client.db().collection(collectionName);
  },

  map(collection) {
    const {
      _id,
      ...collenctionWithoutId
    } = collection;
    return Object.assign({}, collenctionWithoutId, {
      id: _id
    });
  }

};
exports.MongoHelper = MongoHelper;
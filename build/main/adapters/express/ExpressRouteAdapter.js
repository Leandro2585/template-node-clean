"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adaptRoute = void 0;

const adaptRoute = controller => {
  return async (request, response) => {
    const httpRequest = {
      body: request.body
    };
    const httpResponse = await controller.handle(httpRequest);

    if (httpResponse.statusCode === 200) {
      return response.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      return response.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      });
    }
  };
};

exports.adaptRoute = adaptRoute;
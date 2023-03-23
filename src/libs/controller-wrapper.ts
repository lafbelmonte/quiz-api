import { ControllerWrapper } from '../types';
import Logger from '../libs/logger';

const requestLogger = Logger.tag(['request']);
const responseLogger = Logger.tag(['response']);

const controllerWrapper: ControllerWrapper = (controller) => {
  return async (req, res) => {
    requestLogger.debug('API request.', {
      path: req.path,
      method: req.method,
      params: req.params,
      body: req.body
    });

    let responseBody = {};

    try {
      const { statusCode, data, errors } = await controller(
        req.params || {},
        req.body || {}
      );

      if (statusCode === 200 || statusCode === 201) {
        responseBody = {
          success: true,
          errors,
          data
        };
      } else {
        responseBody = {
          success: false,
          errors,
          data
        };
      }

      responseLogger.debug('API response.', { statusCode, body: responseBody });
      return res.status(statusCode).json(responseBody);
    } catch (error) {
      responseBody = {
        success: false,
        errors: [],
        data: null
      };

      responseLogger.debug('API response.', {
        statusCode: 500,
        body: responseBody
      });
      return res.status(500).json(responseBody);
    }
  };
};

export default controllerWrapper;

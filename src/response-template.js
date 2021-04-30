const successResponse = ({ responseMessage = '', responseData = {} }) => ({
  status: 'success',
  message: responseMessage,
  data: responseData,
});

const failResponse = ({ responseMessage = '', responseData = {}, withData = true }) => {
  if (withData) {
    return {
      status: 'fail',
      message: responseMessage,
      data: responseData,
    };
  }
  return {
    status: 'fail',
    message: responseMessage,
  };
};

const errorResponse = (responseMessage = '') => ({
  status: 'error',
  message: responseMessage,
});

module.exports = { successResponse, failResponse, errorResponse };

const { controlClient  } = require('./tcpClientService');

const API = {
  PAUSE_NAV: 3001,
  RESUME_NAV: 3002,
  CANCEL_NAV: 3003,
};

exports.pause = async () => {
  const response = await controlClient.sendRequest(
    API.PAUSE_NAV,
    null,
    3000
  );

  return {
    status: "paused",
    robot_response: response,
  };
};

exports.resume = async () => {
  const response = await controlClient.sendRequest(
    API.RESUME_NAV,
    null,
    3000
  );

  return {
    status: "resumed",
    robot_response: response,
  };
};

exports.cancel = async () => {
  const response = await controlClient.sendRequest(
    API.CANCEL_NAV,
    null,
    3000
  );

  return {
    status: "cancelled",
    robot_response: response,
  };
};

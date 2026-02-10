const { BLOCK_REASON_MAP } = require("../utils/blockReason.map");
const { controlClient, statusClient, naviClient, otherClient, ConfigurationClient  } = require('./tcpClientService');

const API = {
    BlockStatus:1006,
}

exports.fetchBlockedStatus = async () => {
  const tcpResponse = await statusClient.sendRequest(
    API.BlockStatus,
    null,
    3000
  );

  // ✅ ALWAYS read from tcpResponse.json
  const data = tcpResponse?.json || {};

  return {
    blocked: Boolean(data.blocked),

    block_reason_code:
      typeof data.block_reason === "number"
        ? data.block_reason
        : null,

    block_reason_text:
      typeof data.block_reason === "number"
        ? BLOCK_REASON_MAP[data.block_reason] ?? "UNKNOWN"
        : null,

    obstacle_position: data.blocked
      ? {
          x: data.block_x ?? null,
          y: data.block_y ?? null
        }
      : null,

    nearest_obstacles: data.nearest_obstacles ?? [],

    slowed: Boolean(data.slowed),

    ret_code: data.ret_code ?? -1,

    timestamp: data.create_on ?? null
  };
};

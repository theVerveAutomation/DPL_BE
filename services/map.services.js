const { controlClient, statusClient, naviClient, otherClient, ConfigurationClient  } = require('./tcpClientService');



const API = Object.freeze({
  MAP_LIST_REQ: 1300,        // get map list
  MAP_GRID_REQ: 2102,        // get map grid
  STATION_LIST_REQ: 3050,    // get stations
  PULL_MAP_REQ: 4011         // pull full map data
});


async function getMapList() {
    const res = await statusClient.sendRequest(API.MAP_LIST_REQ, null, 3000);
  return res.json || res;
}


async function getMapGrid(map_name) {
  if (!map_name) throw new Error("map_name is required");
  console.log("map:", map_name)
  const res = await ConfigurationClient.sendRequest(API.PULL_MAP_REQ, {
    map_name
  });
  return res.json || res;
}

async function getStations(map_name) {
  if (!map_name) throw new Error("map_name is required");

  return send(naviClient, API.STATION_LIST_REQ, {
    map_name
  });
}

async function pullMap(map_name) {
  if (!map_name) throw new Error("map_name is required");

  return send(
    ConfigurationClient,
    API.PULL_MAP_REQ,
    { map_name },
    8000 // map data is large
  );
}

/* ===============================
   HELPER
================================ */
async function send(client, api, body, timeout = 3000) {
  const res = await client.sendRequest(api, body, timeout);
  return res.json || res;
}

module.exports = {
  getMapList,
  getMapGrid,
  getStations,
  pullMap
};

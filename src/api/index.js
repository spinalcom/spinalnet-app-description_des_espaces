const axios = require('axios');
const path = 'http://localhost:8056/api/v1/';

const API = {   
  async getBuildingInfosApi() {
      const requestUrl = `${path}geographicContext/space`;
      const result = await axios.get(requestUrl);
      const data = result.data;
      return data;
  },
  async getBuildingAreaApi() {
    const requestUrl = `${path}building/read`;
    const result = await axios.get(requestUrl);
    const data = result.data;
    return data;
  },
  async getFloorAreaApi(id) {
    const requestUrl = `${path}floor/${id}/floor_details`;
    const result = await axios.get(requestUrl);
    const data = result.data;
    return data;
  },
  async getFloorRoomListApi(id) {
    const requestUrl = `${path}floor/${id}/room_list`;
    const result = await axios.get(requestUrl);
    const data = result.data;
    return data;
  },
  async getRoomAreaApi(id) {
    const requestUrl = `${path}room/${id}/read_details`;
    const result = await axios.get(requestUrl);
    const data = result.data;
    return data;
  },
  async getRoomTicketListApi(id) {
    const requestUrl = `${path}node/${id}/ticket_list`;
    const result = await axios.get(requestUrl);
    const data = result.data;
    return data;
  },
  async getControlEndPointListApi(id) {
    const requestUrl = `${path}node/${id}/control_endpoint_list`;
    const result = await axios.get(requestUrl);
    const data = result.data;
    return data;
  },
  getOccupation(controlEndPoints) {
    for (const controlEndPoint of controlEndPoints) {
      for (const endpoint of controlEndPoint.endpoints) {
        if (endpoint.name === "Occupation") {
          return endpoint.currentValue
        }
      }
    }
    return false
  }

  }

module.exports = API;
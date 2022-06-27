import Vue from 'vue'
import Vuex from 'vuex'
import { getBuildingInfosApi, getBuildingAreaApi, getFloorAreaApi, getFloorRoomListApi, getRoomAreaApi, getRoomTicketListApi, getControlEndPointListApi, getOccupation } from '../api'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    type: 'geographicContext',
    contextInfos: {},
    buildingInfo:[{ id: 0, name: '', area: 0, ticket: 0, occupation: 0 }],
    totalArea: 0,
    floorArea: 0,
    floorList: [],
    roomList: [],
    roomInfo: [],
    roomAreas: [],
    ticketFloor: 0,
    occupationFloor: 0,
    controlEndPointList: [],
    lastFloor:0

  },
  getters: {
    type: (state) => state.type,
    contextInfos: (state) => state.contextInfos,
    buildingInfo: (state) => state.buildingInfo,
    floorList: (state) => state.floorList,
    totalArea: (state) => state.totalArea,
    floorArea: (state) => state.floorArea,
    roomList: (state) => state.roomList,
    roomAreas: (state) => state.roomAreas,
    roomInfo: (state) => state.roomInfo,
    controlEndPointList: (state) => state.controlEndPointList,
    ticketFloor:(state) => state.ticketFloor,
    occupationFloor:(state) => state.occupationFloor,
    lastFloor: (state) => state.lastFloor
  },
  mutations: {
    setcontextInfos: (state, contextInfos) => (state.contextInfos = contextInfos),
    setBuildingArea: (state, area) => (state.totalArea = area),
    setFloorList: (state, floorList) => (state.floorList = floorList),
    setFloorArea: (state, area) => (state.totalArea = area),
    setFloorRoomList: (state, resp) => (state.roomList = resp),
    setRoomArea: (state, roomArray) => (state.roomAreas = roomArray),
    setRoomInfo: (state, info) => (state.roomInfo = info),
    setControlEndPointList: (state, resp) => (state.controlEndPointList = resp),
    setBuildingInfos: (state, buildingInfo) => (state.buildingInfo= buildingInfo),
    setlastFloor: (state, lastFloor) => (state.lastFloor = lastFloor)
  },
  actions: {
    async getBuildingInfos({ commit }, node) {
      const resp = await getBuildingInfosApi();
      const lastFloor = resp.children[0].children.length-1;
      const info = () => {
        return { id: 0, name: '', area: 0, ticket: 0, occupation: 0 }
      }
      const floorList = new Array(resp.children[0].children.length).fill(null).map(info);
      const buildingInfo = new Array(resp.children.length).fill(null).map(info);
      if (node != undefined && node.type === 'geographicBuilding') {
        this.state.type = resp.type
      }
      let buildingTickets = 0;
      let buildingOccupation = 0;
      let roomCount = 0;
      resp.children.map((building, j) => {
        building.children.map(async (floor, index) => {
          const floorInfo = await getFloorAreaApi(floor.dynamicId)
          floorList[index].name = floor.name
          floorList[index].area = floorInfo.area
          floorList[index].id = floor.dynamicId
          let occupationCount = 0;
          let ticketCount = 0;
          floor.children.map(async room => {
            roomCount++;
            let roomTicket = await getRoomTicketListApi(room.dynamicId);
            let controlEndPoints = await getControlEndPointListApi(room.dynamicId);
            let occupationRes = getOccupation(controlEndPoints);
            if(occupationRes === true) {
              occupationCount++;
              buildingOccupation++;
            }
            ticketCount +=  roomTicket.length;
            buildingTickets += roomTicket.length;
            floorList[index].occupation = Math.round(occupationCount*100/(floor.children.length));
            floorList[index].ticket = ticketCount;


            buildingInfo[j].id = building.dynamicId;
            buildingInfo[j].ticket = buildingTickets;
            buildingInfo[j].occupation = Math.round(buildingOccupation*100/(roomCount));
            
          });       
          
        })      
        
      });
      commit('setBuildingInfos', buildingInfo)
      commit('setcontextInfos', resp);
      commit('setFloorList', floorList);
      commit('setlastFloor', lastFloor)
    },
    async getBuildingArea({ commit }, node) {
      if (node != undefined && node.type === 'geographicBuilding') {
        const resp = await getBuildingAreaApi()
        commit('setBuildingArea', resp.area);
      } else if (node === undefined || node.type === 'geographicContext') {
        const resp = await getBuildingAreaApi()
        commit('setBuildingArea', resp.area);
      }

    },
    async getFloorArea({ commit }, id) {
      const resp = await getFloorAreaApi(id)
      commit('setFloorArea', resp.area);
    },
    async getFloorRoomList({ commit }, id) {
      const resp = await getFloorRoomListApi(id)
      if (resp.length) {
        this.state.type = resp[0].type;
      }
      const p = resp.map(async (room) => {
        let areaInfo = await getRoomAreaApi(room.dynamicId);
        let roomTicket = await getRoomTicketListApi(room.dynamicId);
        let controlEndPoints = await getControlEndPointListApi(room.dynamicId);
        
        return {
          id: room.dynamicId,
          name: room.name,
          area: areaInfo.area,
          ticket: roomTicket.length,
          occupation: getOccupation(controlEndPoints)
        }
      });
      const roomInfo =  await Promise.all(p)
      let occupationCount = 0;
      let count = 0;
      let tickets = 0;
      for (const room of roomInfo) {
        count ++;
        if(room.ticket != 0){
          tickets += room.ticket
        }
        if(room.occupation === true){
          occupationCount++;
        }
      }
      this.state.occupationFloor = occupationCount*100/count
      this.state.ticketFloor = tickets;
      commit('setFloorRoomList', p);
      commit('setRoomInfo', roomInfo)
    },
    
  },


})

<template >
  <div class="content"> 
    <div class="information">
      <v-layout row>    
        <v-flex xs4>
          <v-btn height="90" block style="border-radius: 10px">surface totale {{ totalArea }} <span > m²</span></v-btn>
        </v-flex>
        <v-flex xs4>
          <v-btn height="90" block style="border-radius: 10px" v-if="type === 'geographicContext'">Tickets en cours {{ buildingInfo[0].ticket }}</v-btn>
          <v-btn height="90" block style="border-radius: 10px" v-if="type === 'geographicRoom'">Tickets en cours {{ ticketFloor }}</v-btn>
        </v-flex>
        <v-flex xs4 >
          <v-btn height="90" block style="border-radius: 10px" v-if="type === 'geographicContext'">taux d'occupation {{ buildingInfo[0].occupation}} %</v-btn>
          <v-btn height="90" block style="border-radius: 10px" v-if="type === 'geographicRoom'">taux d'occupation {{ Math.round(occupationFloor)}} %</v-btn>
        </v-flex>
      </v-layout>
    </div>
    
  <div class="table">
    <v-simple-table v-if="type === 'geographicContext'" style="max-height: 650px; overflow-y: scroll">
      <thead>
        <tr>
          <th width="50%" class="text-center">Nom</th>
          <th class="text-center">Surface</th>
          <th class="tedisplay: blockxt-center">Tickets en cours </th>
          <th class="text-center">Occupation</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(floor) in floorList" :key="floor.dynamicId">
          <td>{{floor.name }} </td>
          <td>{{Math.round(floor.area) }} m² </td>
          <td>{{floor.ticket }} </td>
          <td>{{floor.occupation }} </td>
        </tr>        
      </tbody>
  </v-simple-table>
    <v-simple-table v-if="type === 'geographicRoom'" style="max-height: 620px; overflow-y: scroll">
      <thead>
        <tr>
          <th width="50%" class="text-center">Nom</th>
          <th class="text-center">Surface</th>
          <th class="tedisplay: blockxt-center">Tickets en cours </th>
          <th class="text-center">Occupation</th>
        </tr>
      </thead>
      <tbody> 
        <tr  v-for="(room) in roomInfo" :key="room.dynamicId" >
          <td>{{room.name }} </td>
          <td>{{Math.round(room.area) }} m² </td>
          <td>{{room.ticket }} </td>
          <td :class="[room.occupation ? green : red]">{{room.occupation }}</td>
        </tr>
      </tbody>
  </v-simple-table>
  
  </div>
  
  <h1></h1>
    
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'DescriptionEspaces',
  data(){
    return{
      green : 'green',
      red : 'red'
    }
  },

  methods: {
    ...mapActions(['getBuildingArea', 'getFloorRoomList', 'getRoomArea','getBuildingInfos' ]),
    },
    computed:{
      ...mapGetters(['floorList','totalArea', 'roomList', 'roomAreas', 'roomInfo', 'type', 'ticketFloor', 'occupationFloor','buildingInfo']),
    },
    created(){
      this.getBuildingInfos();
      this.getBuildingArea();
      
    }
  }
</script>

<style scoped>
 .green{
  background-color: white !important;
  color: #4eeea9;
  border-color: #cfd3d4 !important
}
.red{
  background-color: white !important;
  color: #f3160c;
  border-color: #cfd3d4 !important

}

.content{
  height: 95%;
  background-color: #eef3f4;
  padding: 0px;
  ;
}
div.layout{
  margin: 0px 90px;
  padding: 0px;
}
.information{
  display: flex;
  height: 15%;
  margin: 5px 0px;
}
.table{
  background-color: white;
  margin: 10px 90px;
  padding: 5px;
}
div.flex{
  align-items: center;
  display: flex;
  padding: 5px;
}
v-btn{
  margin: 5px
}

table th, td { 
  border-left:1px solid #dddddd; 
  margin: 2px;
  border-color: #cfd3d4;
}
</style>
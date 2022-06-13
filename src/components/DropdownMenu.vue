<template>
    <div class="building-list">
      <v-menu>
         <template v-slot:activator="{ on }">
        <v-btn v-on="on"  width="150px" color="#14202c" class="mr-16 white--text ">
          <v-icon>expand_more</v-icon>
          <span class="text-capitalize" style="float:left" >patrimoine</span>
        </v-btn>
        </template>
         <v-list color="#14202c" >
        <v-list-item >
          <v-list-item-title >
              <v-treeview v-model="selectedItems"  class="white--text" :items="contextInfos.children">
              </v-treeview>
          </v-list-item-title>
        </v-list-item>
      </v-list>
      </v-menu>   
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: 'DropdownMenu',
  data(){
    return{
      expanded: false,
    }
  },
  methods:{
    ...mapActions(['getBuildingInfos','getBuildingArea','getFloorArea','getFloorRoomList', 'getRoomArea',]),
    hideShow(e){
      e.preventDefault();
      this.expanded = !this.expanded;
    },
    onClick(id, node){
      this.getFloorArea(id);
      this.getBuildingArea(node);
      this.getBuildingInfos(node);
      this.getFloorRoomList(id);
      console.log(id);
    }
  },
  computed: mapGetters(["contextInfos"]),
  
}
</script>

<style>
v-flex{
  height: 5vh;
  border: 2px solid red;
}

.v-list{
  padding: 0px;
}
.v-list-item{
  padding: 0px 2px;
  margin: 0px 0px 0px 10px;
}
.white--text{
  padding: 2px;
  border-radius: 10;

}
a{
  text-decoration: none;
}
.toggleUpDown {
    transition: transform .3s ease-in-out !important;  
}

.toggleUpDown.rotate {
    transform: rotate(180deg);
}
</style>
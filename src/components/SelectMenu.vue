<template>
  <div class="building-list">   
      <v-list color="#14202c">
        <v-list-item style="height: 10px"
            :style="{'margin-left': `${ depth * 15 }px`}">
          <v-list-item-title
            class="white--text"
            >
            <div class="menuItem">
              <div class="nodeName">
                <div class="divColor"></div>
                <span @click="onClick(node.dynamicId, node)" style=" cursor: pointer">{{ node.name }}</span>
              </div>
              <v-icon 
                    class="icon grey--text toggleUpDown"
                    :class='{ "rotate": expanded }'
                    @click.stop.prevent="expanded = !expanded"
                    >$expand</v-icon>
            </div>
          </v-list-item-title>
        </v-list-item>
      </v-list>
      <div v-if="expanded && depth !== 2" >
        <select-menu offset-y
        v-for="(child) in node.children"
        :key="child.dynamicId"
        :node="child"
        
        :depth="depth + 1"
        
        />
      </div>
      
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name:'SelectMenu',
  props: {
    node:Object,
    depth:{
      type:Number,
      default:0}
  },
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
    }
  }, 
}
</script>
<style scoped>
v-flex{
  height: 5vh;
  border: 2px solid red;
}
.building-list{
  background-color: blue;
}
.v-list{
  padding: 0px;
}
.v-list-item{
  padding: 2px 2px;
  margin: 0px 5px 0px 5px;
  border: 1px solid white;
  border-radius: 5px;
}
/* v-list-item__title white--text */
.v-list-item__title{
  padding: 5px;

}
.divColor{
  width: 5px;
  height: 10px;
  border-right: 7px;
  background-color: red;
}
.nodeName{
  display: flex;
  align-items: center;
}
.menuItem{
  display: flex;
  justify-content: space-between;
  padding: 2px;
}


.toggleUpDown {
    transition: transform .3s ease-in-out !important;  
}

.toggleUpDown.rotate {
    transform: rotate(180deg);
}
</style>

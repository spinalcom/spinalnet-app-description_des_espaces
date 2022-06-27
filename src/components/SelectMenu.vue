<template>
  <div class="building-list">   
      <v-list color="#14202c">
        <!-- {'margin-left': `${ depth * 10 }px` } -->
        <div class="border-left-container" :style="{'margin-left': `${ depth * 15 }px`,}">
        <div class="border-left"  :style="[`${node.type}` === 'geographicBuilding' || `${node.type}` === 'geographicContext' || lastFloor === index ? last : notLast]">
        <v-list-item style="height: 10px" :id="'id_'+ node.dynamicId" :style="[selected ? selectedStyle : '']">
          <v-list-item-title
            class="white--text"
            >
            <div class="menuItem">
              <div class="nodeName">
                <div class="divColor"></div>
                <span @click="onClick(node.dynamicId, node, 'id_' + node.dynamicId)" style=" cursor: pointer">{{ node.name }}{{index}}</span>
              </div>
              <v-icon 
                    class="icon grey--text toggleUpDown"
                    :class='{ "rotate": expanded }'
                    @click.stop.prevent="expanded = !expanded"
                    >$expand</v-icon>
            </div>
          </v-list-item-title>
        </v-list-item>
        </div>
        </div>
      </v-list>
      <div v-if="expanded && depth !== 2" >
        <select-menu offset-y
        v-for="(child, index) in node.children"
        :key="child.dynamicId"
        :node="child"
        :index= index
        :floorCount="lastFloor"
        :depth="depth + 1"
        
        />
      </div>
      
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name:'SelectMenu',
  props: {
    node:Object,
    depth:{
      type:Number,
      default:0},
    floorCount:{
      type:Number,
      default:0},
    index:{
      type:Number,
      default:0},
   
  },
  data(){
    return{
      expanded: false,
      selected: false,
      activitedId: 0,
      prev: 0,
      next: 0,
      last :{
        borderLeft: '1px solid rgb(125,185,153)',
        borderImage: 'linear-gradient(to bottom, rgba(54, 70, 94,1) 50% ,rgba(54, 70, 94,0) 50%)',
        borderImageSlice: '1',        
        },
      notLast :{
        borderLeft: '1px solid rgb(54, 70, 94)',
        },
      selectedStyle:{
        border: '1px solid red'
      }
        

    }
  },
  computed:{
    ...mapGetters(['lastFloor'])
  },
  methods:{
    ...mapActions(['getBuildingInfos','getBuildingArea','getFloorArea','getFloorRoomList', 'getRoomArea',]),
    hideShow(e){
      e.preventDefault();
      this.expanded = !this.expanded;
    },
    changeBorderColor(id_){
      this.prev = this.next;
      this.next = id_;
      console.log('prev', this.prev);
      console.log('next', this.next);
      // document.getElementById(this.next).style.border = '1px solid red';
      // if(this.prev)
      // document.getElementById(this.prev).style.border = 'none';
      // this.prev = id_;
      // console.log('prev', this.prev);
    
    },
    onClick(id, node, id_){
      this.changeBorderColor(id_);
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
/* .border-left-container{
  border-left: 1px solid #36465e;
  padding: 0px 5px;
  position: relative;
  box-sizing: border-box;
} */
.border-left{
  position: relative;
  /* border-left: 1px solid rgb(54, 70, 94); */
  padding: 0px 0px;
}

.border-left:before{
  content: "";
  /* margin: 0px 5px; */
  border-bottom: 1px solid #36465e;
  position: absolute;
  left: 0;
  bottom: 50%;
  width: 10px;
}

.v-list-item{
  padding: 2px 2px;
  margin: 0px 5px 0px 10px;
  border: 1px solid white;
  box-sizing: border-box;
  border-radius: 5px;
}
/* v-list-item__title white--text */
.v-list-item__title{
  padding: 5px;
}
.divColor{
  width: 5px;
  margin-right: 5px;
  height: 10px;
  border-right: 7px;
  background-color: rgb(26, 171, 233);
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
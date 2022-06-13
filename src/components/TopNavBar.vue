<template>
  <nav>
    <v-flex>
    <v-toolbar  >
      <v-toolbar-title class="grey--text">
        <v-btn class="mr-5"  disabled>Logo</v-btn>
        <span  class="font-weight-light">Description des </span>
        <span>espaces</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu>
        <template v-slot:activator="{ on }">
        <v-btn v-on="on"   color="#14202c" class="mx-0.5 white--text ">
          <v-icon>expand_more</v-icon>
          <span class="text-capitalize">Temps-réel</span>
        </v-btn>
        </template>
      </v-menu>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
        <v-btn v-on="on"  width="150px" color="#14202c" class="mr-16 white--text ">
          <v-icon>expand_more</v-icon>
          <span class="text-capitalize" style="float:left" >{{contextInfos.name}}</span>
        </v-btn>
        </template>
        <select-menu
        :node='contextInfos'/>
      </v-menu>
    </v-toolbar>
    </v-flex>
  </nav>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import SelectMenu from './SelectMenu.vue';
export default {
  name:'TopNavBar',
  components:{
    SelectMenu,
  },
  methods:{
    ...mapActions(['getBuildingInfos'])
  },
  computed: {
    ...mapGetters(["contextInfos"]),
    
    },
};
</script>
<style scoped>
v-flex{
  height: 5vh;
  border: 2px solid red;
}
.v-toolbar__content{
  padding: 10px;
}
</style>

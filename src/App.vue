<template>
  <v-app>
    <top-nav-bar/>  
    <description-espaces/>

    <!-- <v-main>
      <router-view/>
    </v-main> -->
  </v-app>
</template>

<script>
import TopNavBar from './components/TopNavBar.vue'
// import About from './views/AboutView.vue'
import DescriptionEspaces from './views/DescriptionEspaces.vue';
export default {
  components:{ TopNavBar, DescriptionEspaces},
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
<style scoped>
top-nav-bar{
  border: 2px solid red
}
</style>

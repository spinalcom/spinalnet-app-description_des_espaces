<template>
  <v-app>
    <top-nav-bar/>  
    <description-espaces/>
  </v-app>
</template>

<script>
import TopNavBar from './components/TopNavBar.vue'
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

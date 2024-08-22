<template>
  <div id="app">
    <MainNavbar />
    <router-view />
    <MainFooter />
  </div>
</template>

<script>
import MainNavbar from "./components/MainNavbar.vue";
import MainFooter from "./components/MainFooter.vue";

export default {
  name: "App",
  components: {
    MainNavbar,
    MainFooter,
  },
};
</script>

<style>
/* Global styles */
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
router-view {
  flex: 1;
}
</style>

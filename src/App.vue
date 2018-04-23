<template>
  <div id="app">
    <manu-bar></manu-bar>
    <router-view/>
  </div>
</template>

<script>
import { LOAD_GAME } from "./store/store";
import ManuBar from "./components/ManuBar";

export default {
  name: "App",
  created() {
    this.$store.dispatch({ type: LOAD_GAME });
  },
  components: {
    ManuBar
  }
};
</script>

<style>

</style>

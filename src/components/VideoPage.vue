<template>
  <div>
    <div class="video-conatiner">
      <video height="100%" autoplay loop>
        <source src="../assets/img/Nowhere/MP4/Nowhere.mp4" type="video/mp4">
      </video>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  computed: {}
};
</script>

<style scoped>
.video-container {
  position: relative;
  width: 100vw;
  overflow: hidden;
  background: #000;
}
</style>

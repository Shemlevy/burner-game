<template>
  <div class="main-container">
    <div class="header">
        <div class="links">
          <a href="https://www.facebook.com/midburns/" target="_blank"><i class="fab fa-facebook-square"></i></a>
          <a href="http://midburn.org/he-survival-guide/" target="_blank"><i class="fab fa-studiovinari"></i></a>
        </div>
        <h1 class="title">Midburn - Survival Quiz</h1>
        <img class="logo" src="/static/img/logo.png"/>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
.main-container {
  padding: 5px 20px;
  background-color: var(--nav-color);
  border-bottom: 1px solid white;
  position: absolute;
  width: 100%;
  z-index: 4;
}
.header {
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.links {
  margin-left: 2vw;
}
.fab {
  color: var(--icon-color);
  font-size: 2em;
  margin: 4px 10px;
}
.fab:hover {
  color: var(--icon-hover-color);
}
.logo {
  max-width: 55px;
  margin-right: 8vw;
}
.title {
  color: var(--font-color);
  font-weight: 900;
  align-self: center;
  font-size: 2.5em;
  font-family: "fantasy";
}

@media only screen and (max-width: 700px) {
  .fab {
    font-size: 1.5em;
  }
  .title {
    font-size: 6vw;
  }
}
</style>

<template>
  <div class="main-container">
    <div class="slides">
      <transition name="slide-fade">
        <h1 v-if="showOrder[0].show">ווואו ביצוע מרשים!!! ברנר אמיתי אתה</h1>
      </transition>
      <transition name="slide-fade">
        <div class="guide" v-if="showOrder[1].show">  
          <h1 >ממליצים לך להתמקצע עוד במדריך ההישרדות</h1> 
          <a href="http://midburn.org/he-survival-guide/" target="_blank"><i class="fab fa-studiovinari bounce"></i></a>
        </div>
      </transition>
      <transition name="slide-fade">
          <h1 v-if="showOrder[2].show">או ללייקלק אותנו ולהישאר מעודכנים</h1>  
      </transition>
    </div>
    <div v-show="showOrder[2].show" class="fb-like" data-href="https://www.facebook.com/midburns/" data-layout="button" data-action="like" data-size="large" data-show-faces="true" data-share="false"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showOrder: [{ show: false }, { show: false }, { show: false }]
    };
  },
  created() {
    this.showOrder.forEach((element, idx) => {
      setTimeout(() => {
        element.show = true;
      }, 1000 * idx * 3);
    });
  }
};
</script>

<style scoped>
.main-container {
  padding: 5px 20px;
  background-image: url("../assets/img/road.gif");
  background-size: cover;
  border-bottom: 2px solid white;
  height: 100vh;
  direction: rtl;
  display: flex;
  flex-flow: column;
  align-items: center;
}
.slides {
  margin-top: 25vw;
  color:white;
}
.guide {
  display: flex;
}
.fab {
  color: white;
  font-size: 2.5em;
  margin: 0 1vw;
}
.fab:hover {
  color: cornflowerblue;
}
.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}

.bounce {
  animation: bounce 2s infinite;
}

</style>

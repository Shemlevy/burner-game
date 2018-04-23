<template>
  <transition name="fade">
    <div class="container">
      <p class="desc">ברוכים הבאים למשחק הטריוויה שיתן מענה לשאלה שמעסיקה את כולם: האם אתם ברנרים אמיתיים?
        איך מנצחים? פשוט:עליכם לעבור 5 נושאים שקשורים למידברן, 
        ובכל אחד לענות נכון על 2 שאלות בהצלחה!
        </p>
        <router-link class="btn" :to="'/thequiz'">צאו לדרך</router-link>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {}
};
</script>


<style scoped>
.container {
  background-image: url("/static/img/bgwelcome.jpg");
  background-size: cover;
  height: 100vh;
}
.desc {
  color: var(--font-color);
  padding: 100px 20px;
  text-align: right;
  background-color: rgba(0, 0, 0, 0.418);
  font-size: 2em;
}
.btn {
  padding: 5px 10px;
  font-size: 2em;
  font-family: "Varela Round", sans-serif;
  font-weight: 900;
  background-color: var(--btn-color);
  border: none;
  color: var(--font-color);
  border-radius: 10px;
  width: 160px;
  cursor: pointer;
  transition: .5s all ease-in-out;
  text-align: center;
  margin-left: 45vw;
  margin-top:40px;
  text-decoration: none;
}
.btn:hover{
  background-color: var(--btn-hover-color);
}
@media only screen and (max-width: 500px) {
  .btn{
      margin-left: 30%;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}
</style>

<template>
  <transition name="fade">
    <div>
      <div v-if="!playrWin" class="questions-body">
        <div v-if="question" class="quest-container">
        <button class="audioIcon" @click="toggleSound()"><i ref="audioIcon" class="fas fa-volume-up"></i></button>
          <p key="quest" class="qust-body">{{question.body}}</p>
          <transition-group name="list">
            <li  v-for="(answer,i) in question.answers" :key="i" class="answer" :value="answer.id"
              ref="answer" @click="checkAnswer(answer.id)">{{answer.body}}</li>
          </transition-group>
          <div class="categories">
            <h1 :class="{'cat-completed': cat.completed}" v-for="cat in categories" :key="cat.value">{{cat.value}} 
              <i :class="{'completed': cat.completed}" class="fas fa-thumbs-up"></i>
            </h1>
          </div>
        </div>
        
      </div> 
      <transition name="fade">
        <game-over v-if="playrWin"></game-over>
      </transition>
    </div>
  </transition>
</template>

<script>
import {
  GET_GAME,
  GET_CURR_QUEST,
  GET_CURR_CAT,
  SET_QUEST
} from "../store/store";
import GameService from "../service/GameService";
import GameOver from "./GameOver";

export default {
  data() {
    return {
      categories: [
        { value: "גבולות אישיים", completed: false },
        { value: "חשל״ש", completed: false },
        { value: "גופים והתמצאות באירוע", completed: false },
        { value: "עשרת העקרונות", completed: false },
        { value: "מדריך הישרדות", completed: false }
      ],
      incheck: false,
      playrWin: false,
      sounds: { background: null, userWin: null, userWorng: null },
      soundOn: true
    };
  },
  created() {
    this.sounds.background = new Audio("/static/audio/backgroundmusic.mp3");
    this.sounds.userWin = new Audio("/static/audio/correct.m4a");
    this.sounds.userWorng = new Audio("/static/audio/worng.wav");
    this.sounds.background.play();
  },
  methods: {
    checkAnswer(id) {
      if (this.incheck) return;
      this.incheck = true;
      let answer = {
        question_id: this.question.id,
        answer_ids: [id.toString()]
      };
      let answerJson = JSON.stringify(answer);
      GameService.sendAnswer(answerJson, this.token)
        .then(res => {
          if (res.game_completed) {
            this.sounds.background.pause();
            this.playrWin = true;
            return;
          }
          if (res.response) {
            if (this.soundOn) this.sounds.userWin.play();
            this.getNextQuest(res);
          } else {
            if (this.soundOn) this.sounds.userWorng.play();
            this.showRightAnswer(res);
          }
        })
        .catch(err => {
          throw err;
        });
    },
    showRightAnswer(res) {
      let id = res.correct_answers[0].id;
      this.$refs.answer.forEach(element => {
        if (element.value === id) element.classList.add("right-answer");
        setTimeout(() => {
          element.classList.remove("right-answer");
        }, 1300);
      });
      setTimeout(() => {
        this.getNextQuest(res);
      }, 1000);
    },
    getNextQuest(res) {
      let nextCat = res.category_completed;
      if (nextCat) this.isCompleted(res);
      setTimeout(() => {
        this.$store.commit({ type: SET_QUEST, nextCat });
        this.incheck = false;
      }, 500);
    },
    isCompleted() {
      this.categories.forEach(cat => {
        if (cat.value === this.currCat) cat.completed = true;
      });
    },
    toggleSound() {
      let audioIcon = this.$refs.audioIcon.classList;
      if (this.soundOn) {
        this.sounds.background.pause();
        audioIcon.remove("fa-volume-up");
        audioIcon.add("fa-volume-off");
      } else {
        this.sounds.background.play();
        audioIcon.remove("fa-volume-off");
        audioIcon.add("fa-volume-up");
      }
      this.soundOn = !this.soundOn;
    }
  },
  computed: {
    question() {
      return this.$store.getters[GET_CURR_QUEST];
    },
    token() {
      let game = this.$store.getters[GET_GAME];
      return game.token;
    },
    currCat() {
      return this.$store.getters[GET_CURR_CAT];
    }
  },
  watch: {
    currCat() {
      return this.$store.getters[GET_CURR_CAT];
    },
    question() {
      return this.$store.getters[GET_CURR_QUEST];
    }
  },
  components: {
    GameOver
  }
};
</script>

<style scoped>
.questions-body {
  display: flex;
  width: 100vw;
  justify-content: center;
}
.quest-container {
  margin-top: 150px;
  font-size: 20px;
  display: flex;
  width: 100%;
  position: absolute;
  direction: rtl;
  flex-flow: column;
  align-items: center;
  color: var(--font-color);
}
.qust-body {
  background-color: var(--questions-color);
  cursor: default;
  text-align: center;
  clip-path: polygon(1% 0, 99% 10%, 100% 98%, 0 100%);
  max-width: 70vw;
  transition: all 1s ease-in;
}
.answer {
  list-style-type: none;
  background-color: var(--answers-color);
  clip-path: polygon(0% 22%, 100% 0%, 99% 98%, 0 100%);
  cursor: pointer;
  max-width: 60vw;
  transition: all 0.3s ease-in;
  box-shadow: 2px 2px black;
  box-shadow: 1px 1px 1px black;
}

.answer,
.qust-body {
  padding: 2vw 2vw;
  margin: 0.5vw 0;
}

.answer:hover {
  background-color: var(--answers-hover-color);
}
.right-answer {
  background-color: var(--right-answer-color);
}
.categories {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin-top: 40px;
}
.categories h1 {
  margin: 2vw;
  background-color: var(--cat-color);
  color: var(--font-color);
  padding: 1vw 1vw;
  clip-path: polygon(0 12%, 100% 0, 100% 100%, 0 88%);
  font-size: 1em;
  border: 1px solid white;
  transition: all 0.5s ease-in;
}
.fas {
  color: var(--cat-color);
  transition: all 0.5s ease-in;
}
.audioIcon {
  font-size: 1em;
  outline: none;
  cursor: pointer;
  background: #f0f8ff00;
  border: none;
  align-self: end;
  margin-right: 100px;
}
.fa-volume-up, .fa-volume-off {
  color: var(--icon-color);
}
.completed {
  color: var(--font-color);
}
.cat-completed {
  border: 2px solid rgb(255, 238, 0) !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 1.3s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
@media only screen and (max-width: 700px) {
  .quest-container {
    font-size: 15px;
    margin-top: 100px;
  }
  .answer,
  .qust-body {
    padding: 4vw 2vw;
  }
}
</style>

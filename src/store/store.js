import Vuex from "vuex";
import GameService from "../service/GameService";

export const GET_GAME = "/getGame";
export const GET_CURR_QUEST = "/getCurrQuest";
export const GET_CURR_CAT = "/getCurrCat";
export const SET_GAME = "/setGame";
export const SET_QUESTIONS = "/setQuestions";
export const SET_QUEST = "/setQuest";
export const LOAD_GAME = "/loadGame";
export const UPDATE_CAT = "/updateCat";

export default new Vuex.Store({
  state: {
    game: null,
    questions: null,
    currQuest: null,
    catIdx: 0,
    questIdx: 0,
    currCat : null,
    
  },
  getters: {
    [GET_GAME](state) {
      return state.game;
    },
    [GET_CURR_QUEST](state) {
      return state.currQuest;
    },
    [GET_CURR_CAT](state) {
      return state.currCat;
    }
  },
  mutations: {
    [SET_GAME](state, { game }) {
      state.game = game;
    },
    [SET_QUESTIONS](state, { questions }) {
      state.questions = questions;
    },

    //This commit respone on the cuurent question.
    //If a player answered two questions correctly in the category or finish the 5 questions in it
    //User moved to the next category.
    //If User finish all the qestions but not the game, User get the uncorrectly questions again.

    [SET_QUEST](state, { nextCat }) {
      if (
        state.catIdx === state.questions.length - 1 &&
        (nextCat || state.questIdx === 4)
      ) {
        const questions = state.questions.filter(cat => {
          return cat.category_completed === false;
        });
        //restart the game with the categories that didnt completed
        state.questions = questions;
        state.questIdx = 0;
        state.catIdx = 0;
        state.currCat = state.questions[state.catIdx].hebName      
        state.currQuest = state.questions[state.catIdx].questions[state.questIdx];
        return;
      }
      if (state.questIdx === 4 || nextCat) {
        if (nextCat) state.questions[state.catIdx].category_completed = true;
        state.questIdx = 0;
        state.catIdx += 1;
      } else {
        state.questIdx += 1;
      }
      state.currCat = state.questions[state.catIdx].hebName      
      state.currQuest = state.questions[state.catIdx].questions[state.questIdx];
    }
  },
  actions: {
    [LOAD_GAME]({ commit }) {
      GameService.fetchGame()
        .then(game => {
          commit({ type: SET_GAME, ...game });
          commit({ type: SET_QUESTIONS, ...game });
          commit({ type: SET_QUEST });
        })
        .catch(err => {
          commit(SET_GAME, []);
          throw err;
        });
    }
  },
  strict: true
});

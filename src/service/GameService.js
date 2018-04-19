"use strict";
import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json";

// const userId = new URLSearchParams(window.location.search).get('userId')
const userId = "888";
const URL =
  "http://production.953caigbma.eu-west-1.elasticbeanstalk.com/api/v1";

function fetchGame() {
  return axios({
    method: "post",
    url: `${URL}/games/new`,
    data: {
      user_id: userId
    }
  })
    .then(res => {
      return createGame(res.data);
    })
    .catch(_ => {
      console.error("error", _);
    });
}

// create game - return obj with the game props and the questions to the store
function createGame(data) {
  let hebCat = [
    "גבולות אישיים",
    "חשל״ש",
    "גופים והתמצאות באירוע",
    "עשרת העקרונות",
    "מדריך הישרדות"
  ];
  data.categories.forEach((cat, i) => {
    cat.hebName = hebCat[i];
  });
  return {
    game: {
      token: data.token,
      user_id: data.user_id
    },
    questions: data.categories
  };
}

//send the answer to the server and then return the response to update the game
function sendAnswer(answer, TOKEN) {
  return axios({
    method: "post",
    url: `${URL}/games/${TOKEN}/answer`,
    data: answer
  })
    .then(response => {
      return response.data;
    })
    .catch(_ => {
      console.error("error", _);
    });
}

export default {
  fetchGame,
  sendAnswer
};

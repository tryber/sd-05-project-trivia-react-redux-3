import md5 from 'crypto-js/md5';
import Loader from '../utils/loader';

const TRIVIA = {
  URL: 'https://opentdb.com',
  requestToken() {
    return `${this.URL}/api_token.php?command=request`;
  },
  questions(token) {
    return `${this.URL}/api.php?amount=5&token=${token}`;
  },
};

const GRAVATAR = {
  URL: 'https://www.gravatar.com',
  api(email) {
    return `${this.URL}/avatar/${md5(email)}`;
  },
};

const getTriviaToken = () => {
  Loader().init();
  Loader().start();
  return fetch(TRIVIA.requestToken())
    .then((response) => (
      response.json()
        .then(({ token }) => {
          Loader().stop();
          return token;
        })
        .catch((error) => {
          console.error(error, 'Erro na requisição');
          Loader().stop();
          return '';
        })
    ))
};

const getTriviaQuestions = (token) => {
  Loader().init();
  Loader().start();
  return fetch(TRIVIA.questions(token))
    .then((res) => (
      res.json()
        .then(({ results }) => {
          Loader().stop();
          return results.map((result) => (
            {
              ...result,
              answers: [
                ...result
                  .incorrect_answers
                  .map((ans) => ({ incorrect: ans })),
                { correct: result.correct_answer },
              ].sort(() => (0.5 - Math.random())),
            }
          ))
        })
    ))
    .catch((error) => {
      Loader().stop();
      console.error(error, 'Token inválido!');
      return [];
    })
};

const getProfilePicture = (email) => (
  new Promise((resolve) => {
    resolve(GRAVATAR.api(email));
  })
);

export {
  getTriviaToken,
  getTriviaQuestions,
  getProfilePicture,
};

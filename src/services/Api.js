import md5 from 'crypto-js/md5';

const TRIVIA = {
  URL: 'https://opentdb.com',
  token: function () {
    return `${this.URL}/api_token.php?command=request`;
  },
  questions: function (token) {
    return `${this.URL}/api.php?amount=5&token=${token}`;
  },
};

const GRAVATAR = {
  URL: 'https://www.gravatar.com',
  DEFAULT: 'https://www.gravatar.com/avatar/2d3bf5b67282f5f466e503d7022abcf3',
  api: function (email) {
    return `${this.URL}/avatar/${md5(email)}`;
  }
}

const getQuestions = () => (
  fetch(TRIVIA.token())
    .then((response) => (
      response.json()
        .then(({ token }) => (
          fetch(TRIVIA.questions(token))
            .then((res) => (
              res.json()
                .then(({ results }) => (results))
            ))
            .catch((error) => {
              console.error(error, 'Token inválido!');
              return [];
            })
      ))
    ))
    .catch((error) => {
      console.error(error, 'Erro na requisição');
      return [];
    })
);

const getProfilePicture = (email) => (
  fetch(GRAVATAR.api(email))
    .then(({ url }) => url )
    .catch((error) => {
      console.error(error);
      return GRAVATAR.DEFAULT;
    })
);

export {
  getQuestions,
  getProfilePicture,
}

// Recebe o valor do Token como parâmetro e armazena no localStorage
const saveTokenLocalStorage = (token) => {
  localStorage.setItem('token', token);
};

// Busca o valor do Token que está armazenado no localStorage
const loadTokenLocalStorage = () => localStorage.getItem('token');

// Recebe um objeto com nome do player, score e url da picture e salva no localStorage
const saveRankingLocalStorage = (objeto) => {
  let rank = JSON.parse(localStorage.getItem('ranking'));
  if (rank !== null) {
    rank.push(objeto);
    localStorage.setItem('ranking', JSON.stringify(rank));
  } else {
    rank = [];
    rank.push(objeto);
    localStorage.setItem('ranking', JSON.stringify(rank));
  }
};

// Busca o array com todos os objetos/players no ranking salvos no localStorage
const loadRankingLocalStorage = () => JSON.parse(localStorage.getItem('ranking'));

// Salva informações do player no localStorage. Recebe como parâmetro nome, acertos,
// score e email
const savePlayerLocalStorage = (name, assertions, score, email) => {
  localStorage.setItem('state', `player: {
    ${name},
    ${assertions},
    ${score},
    ${email},
  }`);
};

// Busca as informações do player no localStorage
const loadPlayerLocalStorage = () => localStorage.getItem('state');

export {
  saveTokenLocalStorage,
  loadTokenLocalStorage,
  saveRankingLocalStorage,
  loadRankingLocalStorage,
  savePlayerLocalStorage,
  loadPlayerLocalStorage,
};

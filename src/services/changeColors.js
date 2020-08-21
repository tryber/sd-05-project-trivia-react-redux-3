function changeColors() {
  const wrongAnswers = document.querySelectorAll('.wrong-answer');
  const correctAnswer = document.querySelector('.correct-answer');
  correctAnswer.classList.add('green');
  for (let i = 0; i < wrongAnswers.length; i += 1) {
    wrongAnswers[i].classList.add('red');
  }
}

export default changeColors;

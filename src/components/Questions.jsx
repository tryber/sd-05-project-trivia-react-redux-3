import React from 'react';
import PropTypes from 'prop-types';
import 'nes.css/css/nes.min.css';
import './Questions.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchQuestions, updateScore } from '../actions';
import { formatText } from '../utils';
import {
  addScore,
  resetScore,
  loadPlayerLocalStorage,
  saveRankingLocalStorage,
} from '../services/localStorage';

import changeColors from '../services/changeColors';
import coin from '../assets/sound/coin3.wav';
import wrong from '../assets/sound/wrong.wav';

const ENABLED = { disableButton: true, showNext: true };
const DISABLED = { disableButton: false, showNext: false };

function playCoin(snd = 'coin') {
  const sound = document.getElementById(snd);
  sound.play();
}

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      ...DISABLED,
      questionNumber: 0,
      time: 30,
    };
    this.renderHeader = this.renderHeader.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
    this.computeScore = this.computeScore.bind(this);
    this.renderTimer = this.renderTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.timer = {};
  }

  componentDidMount() {
    const { token, getQuestions } = this.props;
    getQuestions(token);
    resetScore();
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    const { name, score } = loadPlayerLocalStorage();
    const { profilePic: picture } = this.props;
    saveRankingLocalStorage({ name, score, picture });
  }

  startTimer() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      const { time } = this.state;
      this.setState({ time: Math.max(time - 1, 0) });
      if (time === 0) this.setState(ENABLED);
    }, 1000);
  }

  computeScore({ difficulty }) {
    const { time } = this.state;
    const { setScore } = this.props;
    playCoin()
    let score = 0;
    switch (difficulty) {
      case 'easy':
        score = (10 + (time));
        break;
      case 'medium':
        score = (10 + (time * 2));
        break;
      default:
        score = (10 + (time * 3));
        break;
    }
    addScore(score);
    setScore(score);
    changeColors();
    this.setState(ENABLED);
  }

  renderTimer() {
    const { time, disableButton } = this.state;
    if (disableButton) {
      return (
        <div />
      );
    }
    return (
      <div>{time}</div>
    );
  }

  renderAnswers() {
    const { questions } = this.props;
    const { questionNumber, disableButton } = this.state;
    return (
      questions[questionNumber].answers.map((answer) => (
        Object.keys(answer)[0] === 'incorrect' ?
          (
            <button
              data-testid={'wrong-answer'}
              key={answer.incorrect}
              className="nes-btn wrong-answer"
              disabled={disableButton}
              onClick={() => changeColors() || this.setState(ENABLED) || playCoin('wrong')}
            >
              {formatText(answer.incorrect)}
            </button>
          ) : (
            <button
              data-testid="correct-answer"
              key={answer.correct}
              className="nes-btn correct-answer"
              disabled={disableButton}
              onClick={() => { this.computeScore(questions[questionNumber]); }}
            >
              {formatText(answer.correct)}
            </button>
          )
      ))
    );
  }

  renderHeader() {
    const { questions } = this.props;
    const { questionNumber } = this.state;
    return (
      <div className="questions-container">
        <audio id="wrong"><source src={wrong}></source></audio>
        <audio id="coin"><source src={coin}></source></audio>
        <p data-testid="question-category">
          {formatText(questions[questionNumber].category)}
        </p>
        <p data-testid="question-text" className='nes-balloon from-left is-dark'>
          {formatText(questions[questionNumber].question)}
        </p>
        <i className="nes-octocat animate interviewer"></i>
      </div>
    );
  }

  render() {
    const { questions, history } = this.props;
    const { questionNumber, showNext } = this.state;
    if (questions.length) {
      return (
        <div className="questions nes-container is-centered is-rounded">
          {this.renderTimer()}
          {this.renderHeader()}
          <div className="answers">
            {this.renderAnswers()}
          </div>
          {(showNext) ? <button
            data-testid="btn-next"
            className="nes-btn is-error"
            onClick={() => {
              if (questionNumber < questions.length - 1) {
                clearInterval(this.timer);
                this.setState({
                  ...DISABLED,
                  questionNumber: questionNumber + 1,
                  time: 30,
                });
                this.startTimer();
              } else history.push('/feedback');
            }}
          >
            Próxima
          </button> : ''}
        </div>
      );
    }
    return <div>Carregando...</div>;
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
  profilePic: state.loginReducer.src,
  token: state.getToken.token,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(fetchQuestions(token)),
  setScore: (score) => dispatch(updateScore(score)),
});

Questions.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  setScore: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  profilePic: PropTypes.string.isRequired,
  questions: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Questions));

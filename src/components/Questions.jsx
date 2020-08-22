import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchQuestions, updateScore } from '../actions';
import { Button } from './Inputs';
import { addScore } from '../services/localStorage';

import './Questions.css';
import changeColors from '../services/changeColors';

const ENABLED = { disableButton: true, showNext: true };
const DISABLED = { disableButton: false, showNext: false };

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      ...DISABLED,
      questionNumber: 0,
      time: 30,
    };
    this.renderAnswers = this.renderAnswers.bind(this);
    this.computeScore = this.computeScore.bind(this);
    this.renderTimer = this.renderTimer.bind(this);
    this.timer = {};
  }

  componentDidMount() {
    const { token, getQuestions } = this.props;
    getQuestions(token);
    this.timer = setInterval(() => {
      const { time } = this.state;
      this.setState({ time: Math.max(time - 1, 0) });
      if (time === 0) {
        this.setState(ENABLED);
      }
    }, 1000);
  }

  computeScore({ difficulty }) {
    const { time } = this.state;
    const { setScore } = this.props;
    switch (difficulty) {
      case 'easy':
        addScore(10 + (time));
        setScore(10 + (time));
        break;
      case 'medium':
        addScore(10 + (time * 2));
        setScore(10 + (time * 2));
        break;
      default:
        addScore(10 + (time * 3));
        setScore(10 + (time * 3));
        break;
    }
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
      questions[questionNumber].answers.map((answer, index) => (
        Object.keys(answer)[0] === 'incorrect' ?
          (
            <Button
              testId={`wrong-answer-${index}`}
              key={answer.incorrect}
              className="wrong-answer"
              disabled={disableButton}
              onClick={() => changeColors() || this.setState(ENABLED)}
            >
              {answer.incorrect}
            </Button>
          ) : (
            <Button
              testId="correct-answer"
              key={answer.correct}
              className="correct-answer"
              disabled={disableButton}
              onClick={() => { this.computeScore(questions[questionNumber]); }}
            >
              {answer.correct}
            </Button>
          )
      ))
    );
  }

  render() {
    const { questions, history } = this.props;
    const { questionNumber, showNext } = this.state;
    if (questions.length) {
      return (
        <div>
          {this.renderTimer()}
          <div>
            <p data-testid="question-category">{questions[questionNumber].category}</p>
            <p data-testid="question-text">{questions[questionNumber].question}</p>
          </div>
          {this.renderAnswers()}
          {(showNext) ? <Button
            testId="btn-next"
            onClick={() => {
              if (questionNumber < questions.length - 1) {
                this.setState({
                  ...DISABLED,
                  questionNumber: questionNumber + 1,
                  time: 30,
                });
              } else history.push('/feedback');
            }}
          >
            Próxima
          </Button> : ''}
        </div>
      );
    }
    return <div>Carregando...</div>;
  }
}

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
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
  questions: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Questions));

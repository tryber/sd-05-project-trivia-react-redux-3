import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions';
import { Button } from './Inputs';

import './Questions.css';
import changeColors from '../services/changeColors';

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      questionNumber: 0,
    };
    this.renderAnswers = this.renderAnswers.bind(this);
  }

  componentDidMount() {
    const { token, getQuestions } = this.props;
    getQuestions(token);
  }

  renderAnswers() {
    const { questions } = this.props;
    const { questionNumber } = this.state;
    return (
      <div>
        {questions[questionNumber].answers.map((answer, index) => {
          if (Object.keys(answer)[0] === 'incorrect') {
            return (
              <button
                type="button"
                data-testid={`wrong-answer-${index}`}
                key={answer.incorrect}
              >
                {answer.incorrect}
              </button>
            );
          }
          return (
            <button
              type="button"
              data-testid="correct-answer"
              key={answer.correct}
              className="correct-answer"
              onClick={() => changeColors()}
            >
              {answer.correct}
            </button>
          );
        })}
      </div>
    );
  }
  render() {
    const { questions, history } = this.props;
    const { questionNumber } = this.state;
    if (questions.length) {
      return (
        <div>
          <div>
            <p data-testid="question-category">{questions[questionNumber].category}</p>
            <p data-testid="question-text">{questions[questionNumber].question}</p>
          </div>
          {this.renderAnswers()}
          <Button
            testId="btn-next" 
            onClick={() => {
              (questionNumber < questions.length -1) ? 
              this.setState({ questionNumber : questionNumber +1 }): history.push('/feedback')
          }}>Próxima</Button>
        </div>
      );
    } return (
      <div>Carregando...</div>
    );
  }
}


const mapStateToProps = (state) => ({
  questions: state.questionsReducer.questions,
  token: state.getToken.token,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (token) => dispatch(fetchQuestions(token)),
});

Questions.propTypes = {
  getQuestions: PropTypes.instanceOf(Object).isRequired,
  token: PropTypes.string.isRequired,
  questions: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Questions));


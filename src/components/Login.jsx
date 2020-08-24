import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchToken, loginUser, newScore } from '../actions/index';
import { Button, Input } from './Inputs';
import {
  saveTokenLocalStorage,
  savePlayerLocalStorage,
} from '../services/localStorage';

class Login extends React.Component {
  constructor() {
    super();
    this.startGame = this.startGame.bind(this);
    this.Menu = this.Menu.bind(this);
    this.state = {
      name: '',
      email: '',
    };
    this.Labels = this.Labels.bind(this);
  }

  startGame(ev) {
    ev.preventDefault();
    const { getToken, setUser, history, restartScore } = this.props;
    const { name, email: gravatarEmail } = this.state;
    setUser(this.state);
    restartScore();
    getToken()
      .then(({ token }) => {
        saveTokenLocalStorage(token);
        savePlayerLocalStorage({ name, assertions: 0, score: 0, gravatarEmail });
      })
      .then(() => {
        history.push('/gameplay');
      });
  }

  Menu(ev) {
    ev.preventDefault();
    const { history } = this.props;
    history.push('/settings');
  }

  Labels() {
    return (
      <div>
        <label className="label" htmlFor="player-name">
          Nome
          <Input
            id="player-name"
            className="input"
            type="text"
            testId="input-player-name"
            getValue={(val) => { this.setState({ name: val }); }}
          />
        </label>
        <label className="label" htmlFor="player-email">
          Email
          <Input
            id="player-email"
            className="input"
            type="email"
            testId="input-gravatar-email"
            getValue={(val) => { this.setState({ email: val }); }}
          />
        </label>
      </div>
    );
  }

  render() {
    const { name, email } = this.state;
    return (
      <div className="login">
        <form className="form" onSubmit={(ev) => { this.startGame(ev); }} >
          {this.Labels()}
          <div className="navigation">
            <Button
              testId="btn-play"
              isButton={false}
              disabled={!name.length || !email.length}
              className="btn btn-play"
            >
              Jogar
            </Button>
            <Button
              testId="btn-settings"
              onClick={(ev) => { this.Menu(ev); }}
              className="btn btn-settings"
            >
              <i className="tiny material-icons">settings</i>
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
  setUser: ({ name, email }) => dispatch(loginUser({ name, email })),
  restartScore: () => dispatch(newScore()),
});

Login.propTypes = {
  getToken: PropTypes.instanceOf(Object).isRequired,
  setUser: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  restartScore: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(connect(null, mapDispatchToProps)(Login));

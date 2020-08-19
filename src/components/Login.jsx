import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchToken, loginUser } from '../actions/index';
import { Button, Input } from './Inputs';
import { withRouter } from 'react-router-dom';
import { saveTokenLocalStorage } from '../services/localStorage';

class Login extends React.Component {
  constructor() {
    super();
    this.startGame = this.startGame.bind(this);
    this.state = {
      name: '',
      email: '',
    }
  }

  startGame(ev) {
    ev.preventDefault();
    const { getToken, setUser, history } = this.props;

    setUser(this.state);
    getToken();
    saveTokenLocalStorage('teste');

    history.push('/gameplay');
  }

  render() {
    const { name, email } = this.state;
    return (
      <form onSubmit={(ev) => { this.startGame(ev); }}>
        <label htmlFor="player-name">
          Nome
          <Input
            id="player-name"
            type="text"
            testId="input-player-name"
            getValue={(name) => { this.setState({ name }); }}
          />
        </label>
        <label htmlFor="player-email">
          Email
          <Input
            id="player-email"
            type="email"
            testId="input-gravatar-email"
            getValue={(email) => { this.setState({ email }); }}
          />
        </label>
        <Button testId="btn-play" disabled={!name.length || !email.length}>
          Jogar
        </Button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
  setUser: ({ name, email }) => dispatch(loginUser({ name, email })),
});

Login.propTypes = {
  getToken: PropTypes.instanceOf(Object).isRequired,
  setUser: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(connect(null, mapDispatchToProps)(Login));

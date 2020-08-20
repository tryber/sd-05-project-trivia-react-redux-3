import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfilePicture } from '../services/Api';

import { saveTokenLocalStorage } from '../services/localStorage';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      image: '',
    };
  }
  componentDidMount() {
    const { token } = this.props;
    const { email } = this.props.user;
    saveTokenLocalStorage(token);
    getProfilePicture(email)
      .then(((response) => this.setState({ image: response })));
  }

  render() {
    const { name, email } = this.props.user;
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            alt="imagem do usuário"
            src={this.state.image}
          />
          <p data-testid="header-player-name">{name}</p>
          <p>{email}</p>
          <p data-testid="header-score">0</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.getToken.token,
  user: state.loginReducer.user,
});

Game.propTypes = {
  token: PropTypes.string.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps)(Game);

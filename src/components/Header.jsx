import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchImage } from '../actions';
import { saveTokenLocalStorage } from '../services/localStorage';

class GameHeader extends React.Component {
  componentDidMount() {
    const { token, getImage } = this.props;
    const { email } = this.props.user;
    saveTokenLocalStorage(token);
    getImage(email);
  }

  render() {
    const { name, email } = this.props.user;
    const { src } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          alt="imagem do usuário"
          src={src}
        />
        <p data-testid="header-player-name">{name}</p>
        <p>{email}</p>
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getImage: (email) => dispatch(fetchImage(email)),
});

const mapStateToProps = (state) => ({
  token: state.getToken.token,
  user: state.loginReducer.user,
  src: state.loginReducer.src,
});

GameHeader.propTypes = {
  token: PropTypes.string.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  src: PropTypes.string.isRequired,
  getImage: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameHeader);
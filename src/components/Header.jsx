import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchImage } from '../actions';

class Header extends React.Component {
  componentDidMount() {
    const { getImage } = this.props;
    const { email } = this.props.user;
    getImage(email);
  }

  render() {
    const { name, email } = this.props.user;
    const { src, score } = this.props;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          alt="imagem do usuário"
          src={src}
        />
        <p data-testid="header-player-name">{name}</p>
        <p>{email}</p>
        <p data-testid="header-score">
          <span data-testid="feedback-total-score">
            {score}
          </span>
        </p>
      </header>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getImage: (email) => dispatch(fetchImage(email)),
});

const mapStateToProps = (state) => ({
  user: state.loginReducer.user,
  src: state.loginReducer.src,
  score: state.questionsReducer.score,
});

Header.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  src: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  getImage: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

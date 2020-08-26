import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Questions from '../components/Questions';
import '../styles/style.css'

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <Header />
        <Questions />
        <div />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.getToken.token,
});

export default connect(mapStateToProps)(Game);

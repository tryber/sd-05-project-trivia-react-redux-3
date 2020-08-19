import React from 'react';
import { connect } from 'react-redux';

class Game extends React.Component {
  render() {
    return (
      <div>
        <h2>Tela do Jogo</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.getToken.token,
});

export default connect(mapStateToProps)(Game);

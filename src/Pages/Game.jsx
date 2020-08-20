import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Game extends React.Component {
  render() {
    return (
      <div className="container-header">
        <header>
          <Header />
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.getToken.token,
});

export default connect(mapStateToProps)(Game);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import Login from '../components/Login';

import { newScore } from '../actions/index';


class Home extends React.Component {
  componentDidMount() {
    const { restartScore } = this.props;
    restartScore();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
          <Login />
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  restartScore: () => dispatch(newScore()),
});

Home.propTypes = {
  restartScore: PropTypes.instanceOf(Object).isRequired,
}

export default connect(null, mapDispatchToProps)(Home);

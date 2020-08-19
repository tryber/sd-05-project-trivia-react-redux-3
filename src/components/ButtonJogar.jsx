import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchToken } from '../actions/index';

import { saveTokenLocalStorage } from '../services/localStorage';

class PlayButton extends React.Component {
  teste = () => {
    const { getToken } = this.props;
    getToken();
    saveTokenLocalStorage('teste');
  }

  render() {
    return (
      <Link
        type="button"
        data-testid="btn-play"
        to="/gameplay"
        onClick={() => this.teste()}
      >
        Jogar
      </Link>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
});

export default connect(null, mapDispatchToProps)(PlayButton);

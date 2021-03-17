import React from 'react';
import * as GlobalProvider from '../../providers/globals/globals';

class Home extends React.Component {

  constructor(props) {
    super(props);

    this.isLoggedIn();
  }

  isLoggedIn() {

    let token = GlobalProvider.getToken();
    if (!token) {
      GlobalProvider.clearStorage();
      this.props.history.push('/login');
    } else {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <div>
        Loading...
      </div>
    );
  }
}

export default Home;

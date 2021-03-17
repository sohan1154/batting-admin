import React from 'react';
import RoutesList from './routes/RoutesList';
import * as GlobalProvider from './providers/globals/globals';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.isLoggedIn();
  }

  isLoggedIn() {

    let token = GlobalProvider.getToken();
    console.log('##################### token:', token);
    if (!token) {
      GlobalProvider.clearStorage();
    }
  }

  render() {
    return (
      <RoutesList />
    );
  }
}

export default App;
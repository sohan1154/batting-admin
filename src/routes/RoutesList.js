import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from '../pages/login/Login';
import Signup from '../pages/signup/Signup';
import Contact from '../pages/contact/Contact';
import Dashboard from '../pages/dashboard/Dashboard';
import Home from '../pages/home/Home';
import socketTest from '../pages/testpage/socketdata';


// settings 
import EditProfile from '../pages/settings/EditProfile';
import ChangePassword from '../pages/settings/ChangePassword';
import GlobleSetting from '../pages/settings/GlobleSetting';

// sub-admins 
import SubAdmins from '../pages/subadmins/SubAdmins';
import SubAdminAdd from '../pages/subadmins/SubAdminAdd';
import SubAdminView from '../pages/subadmins/SubAdminView';
import SubAdminEdit from '../pages/subadmins/SubAdminEdit';
import SubAdminResetPassword from '../pages/subadmins/SubAdminResetPassword';
import SubAdminsArchive from '../pages/subadmins/SubAdminsArchive';

// masters 
import Masters from '../pages/masters/Masters';
import MasterAdd from '../pages/masters/MasterAdd';
import MasterView from '../pages/masters/MasterView';
import MasterEdit from '../pages/masters/MasterEdit';
import MasterResetPassword from '../pages/masters/MasterResetPassword';
import MastersArchive from '../pages/masters/MastersArchive';

// players 
import Players from '../pages/players/Players';
import PlayerAdd from '../pages/players/PlayerAdd';
import PlayerView from '../pages/players/PlayerView';
import PlayerEdit from '../pages/players/PlayerEdit';
import PlayerResetPassword from '../pages/players/PlayerResetPassword';
import PlayersArchive from '../pages/players/PlayersArchive';
import PlayersInPlay from '../pages/players/PlayerInPlay';
import MatchRefresh from '../pages/players/MatchOddRefresh';

// sports
import Sports from '../pages/sports/Sports';

// series
import Series from '../pages/series/Series';

// matches
import Matches from '../pages/matches/Matches';
import MatchDetail from '../pages/matches/MatchDetail';
import MatchSession from '../pages/matches/MatchSession';

// others
import CreditsHistory from '../pages/credits/CreditsHistory';
import SubAdminWiseMasters from '../pages/sub_admin_wise_masters/SubAdminWiseMasters';
import MasterWisePlayers from '../pages/master_wise_players/MasterWisePlayers';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// handle the all routes
class RoutesList extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <PublicRoute path="/signup" component={Signup} />
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/contact" component={Contact} />
          <PublicRoute path="/socket-test" component={socketTest} />
          <PrivateRoute path="/dashboard" component={Dashboard} />

          {/* settings */}
          <PrivateRoute path="/edit-profile" component={EditProfile} />
          <PrivateRoute path="/change-password" component={ChangePassword} />
          <PrivateRoute path="/edit-globlesetting" component={GlobleSetting} />

          {/* sub-admins */}
          <PrivateRoute path="/sub-admins" component={SubAdmins} />
          <PrivateRoute path="/sub-admins-view/:id" component={SubAdminView} />
          <PrivateRoute path="/sub-admins-add" component={SubAdminAdd} />
          <PrivateRoute path="/sub-admins-edit/:id" component={SubAdminEdit} />
          <PrivateRoute path="/sub-admins-reset-password/:id" component={SubAdminResetPassword} />
          <PrivateRoute path="/sub-admins-archive" component={SubAdminsArchive} />
          
          {/* masters */}
          <PrivateRoute path="/masters" component={Masters} />
          <PrivateRoute path="/masters-view/:id" component={MasterView} />
          <PrivateRoute path="/masters-add" component={MasterAdd} />
          <PrivateRoute path="/masters-edit/:id" component={MasterEdit} />
          <PrivateRoute path="/masters-reset-password/:id" component={MasterResetPassword} />
          <PrivateRoute path="/masters-archive" component={MastersArchive} />
                    
          {/* players */}
          <PrivateRoute path="/players" component={Players} />
          <PrivateRoute path="/players-view/:id" component={PlayerView} />
          <PrivateRoute path="/players-add" component={PlayerAdd} />
          <PrivateRoute path="/players-edit/:id" component={PlayerEdit} />
          <PrivateRoute path="/players-reset-password/:id" component={PlayerResetPassword} />
          <PrivateRoute path="/players-archive" component={PlayersArchive} />
          <PrivateRoute path="/inplay" component={PlayersInPlay} />
          <PrivateRoute path="/match-refresh/:id" component={MatchRefresh} />

          {/* sports */}
          <PrivateRoute path="/sports-listing" component={Sports} />

          {/* series */}
          <PrivateRoute path="/series-listing" component={Series} />

          {/* matches */}
          <PrivateRoute path="/matches-listing" component={Matches} />
          <PrivateRoute path="/match-detail" component={MatchDetail} />
          <PrivateRoute path="/match-sessions/:event_id" component={MatchSession} />

          {/* others */}
          <PrivateRoute path="/credits-history" component={CreditsHistory} />
          <PrivateRoute path="/sub-admin-wise-masters/:parent_id" component={SubAdminWiseMasters} />
          <PrivateRoute path="/master-wise-players/:parent_id" component={MasterWisePlayers} />
          
        </Switch>
      </BrowserRouter>
    )
  }
}

export default RoutesList;
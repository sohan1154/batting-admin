import React from 'react';
import * as GlobalProvider from '../../providers/globals/globals';

// handle the header section
class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: GlobalProvider.getUser()
        }
    }

    // logout the user and clear storage
    logout = (e) => {

        let _this = this;

        // document.body.classList.add('display-loader');

        GlobalProvider.confirmBox("Are you Sure? You want to logout.", (isTrue) => {
            if (isTrue) {
                GlobalProvider.clearStorage();
                // this.props.history.push('/login');
                window.location.href = '/login';
            }
        });
    }

    render() {

        const { currentUser } = this.state;

        let isDiplayAvailableCredit = (currentUser.role=='Master' || currentUser.role == 'Player') ? true : false;

        return (

            <header className="admin-header">

                {/* <a href="#" className="sidebar-toggle" data-toggleclassName="sidebar-open" data-target="body"> </a> */}

                {/* <nav className=" mr-auto my-auto">
                    <ul className="nav align-items-center">

                        <li className="nav-item">
                            <a className="nav-link  " data-target="#siteSearchModal" data-toggle="modal" href="#">
                                <i className=" mdi mdi-magnify mdi-24px align-middle"></i>
                            </a>
                        </li>
                    </ul>
                </nav> */}
                <nav className=" ml-auto">
                    <ul className="nav align-items-center">

                        <li className="nav-item">
                            <div className="dropdown">
                                <a href="#" className="nav-link" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false"> <i className="mdi mdi-24px mdi-bell-outline"></i>
                                    <span className="notification-counter"></span>
                                </a>

                                <div className="dropdown-menu notification-container dropdown-menu-right">
                                    <div className="d-flex p-all-15 bg-white justify-content-between border-bottom ">
                                        <a href="#!" className="mdi mdi-18px mdi-settings text-muted"></a>
                                        <span className="h5 m-0">Notifications</span>
                                        <a href="#!" className="mdi mdi-18px mdi-notification-clear-all text-muted"></a>
                                    </div>
                                    <div className="notification-events bg-gray-300">
                                        <div className="text-overline m-b-5">today</div>
                                        <a href="#" className="d-block m-b-10">
                                            <div className="card">
                                                <div className="card-body"> <i className="mdi mdi-circle text-success"></i> All
                                                systems operational.</div>
                                            </div>
                                        </a>
                                        <a href="#" className="d-block m-b-10">
                                            <div className="card">
                                                <div className="card-body"> <i className="mdi mdi-upload-multiple "></i> File upload
                                                successful.</div>
                                            </div>
                                        </a>
                                        <a href="#" className="d-block m-b-10">
                                            <div className="card">
                                                <div className="card-body">
                                                    <i className="mdi mdi-cancel text-danger"></i> Your holiday has been denied
                                            </div>
                                            </div>
                                        </a>


                                    </div>

                                </div>
                            </div>
                        </li>

                        {isDiplayAvailableCredit && 
                            <li className="nav-item user-credit">Available Credits ({currentUser.credit}) </li>
                        }

                        <li className="nav-item user-name"> {currentUser.name} </li>

                        <li className="nav-item dropdown ">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                <div className="avatar avatar-sm avatar-online">
                                    <span className="avatar-title rounded-circle bg-dark">
                                        <img className="admin-brand-logo" src="/assets/logos/logo.png" width="40" title={currentUser.role} />
                                    </span>
                                </div>
                            </a>
                            <div className="dropdown-menu  dropdown-menu-right">
                                <a className="dropdown-item" href="/edit-profile"> Edit Account</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/change-password"> Change Password</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#" onClick={this.logout}> Logout</a>
                            </div>
                        </li>

                    </ul>

                </nav>
            </header>

        );
    }
}

export default Header;
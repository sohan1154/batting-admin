import React from 'react';
import * as SiteSettings from '../../providers/settings/settings';
import * as Permissions from '../../providers/settings/permissions';
import * as GlobalProvider from '../../providers/globals/globals';

// handle the side-menu section
class SideMenuData extends React.Component {

    constructor(props) {
        super(props);

        let pathname = window.location.pathname;
        let activePath = '';

        SiteSettings.definedMenus.forEach((item) => {
            if (pathname.indexOf(item) !== -1) {
                activePath = item;
            }
        })

        // console.log('activePath:', activePath)

        this.state = {
            activePath: activePath,
            currentUser: GlobalProvider.getUser(),
        }
    }

    render() {

        const { activePath, currentUser } = this.state;

        return (

            <aside className="admin-sidebar">
                <div className="admin-sidebar-brand">
                    {/* <!-- begin sidebar branding--> */}
                    <img className="admin-brand-logo" src="/assets/logos/logo.png" width="80" alt={SiteSettings.appName} />
                    <span className="admin-brand-content font-secondary"><a href="/dashboard">{SiteSettings.appName}</a></span>
                    {/* <!-- end sidebar branding--> */}
                    <div className="ml-auto">
                        {/* <!-- sidebar pin--> */}
                        <a href="#" className="admin-pin-sidebar btn-ghost btn btn-rounded-circle"></a>
                        {/* <!-- sidebar close for mobile device--> */}
                        <a href="#" className="admin-close-sidebar"></a>
                    </div>
                </div>
                <div className="admin-sidebar-wrapper js-scrollbar">
                    <ul className="menu">

                        {currentUser.role != 'Player' &&
                            <>
                                <li className={activePath == '/dashboard' ? 'menu-item active opened' : 'menu-item'}>
                                    <a href="/dashboard" className=" menu-link">
                                        <span className="menu-label">
                                            <span className="menu-name">Dashboard</span>
                                        </span>
                                        <span className="menu-icon">
                                            <i className="icon-placeholder mdi mdi-shape-outline "></i>
                                        </span>
                                    </a>
                                </li>
                            </>
                        }

                        {currentUser.role == 'Admin' &&
                            <>
                                <li className={activePath == '/sub-admins' ? 'menu-item active opened' : 'menu-item'}>
                                    <a href="#" className="open-dropdown menu-link">
                                        <span className="menu-label">
                                            <span className="menu-name">Sub Admins
                                            <span className="menu-arrow"></span>
                                            </span>
                                        </span>
                                        <span className="menu-icon">
                                            <i className="icon-placeholder mdi mdi-account-key"></i>
                                        </span>
                                    </a>

                                    <ul className="sub-menu" style={activePath == '/sub-admins' ? { display: 'block' } : { display: 'none' }}>
                                        <li className="menu-item">
                                            <a href="/sub-admins" className=" menu-link">
                                                <span className="menu-label">
                                                    <span className="menu-name">List</span>
                                                </span>
                                                <span className="menu-icon">
                                                    <i className="icon-placeholder mdi mdi-account-details"></i>
                                                </span>
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="/sub-admins-add" className=" menu-link">
                                                <span className="menu-label">
                                                    <span className="menu-name">Add</span>
                                                </span>
                                                <span className="menu-icon">
                                                    <i className="icon-placeholder mdi mdi-account-plus "></i>
                                                </span>
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="/sub-admins-archive" className=" menu-link">
                                                <span className="menu-label">
                                                    <span className="menu-name">Archived</span>
                                                </span>
                                                <span className="menu-icon">
                                                    <i className="icon-placeholder mdi mdi-delete-sweep"></i>
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>

                                <li className={activePath == '/sports-listing' ? 'menu-item active opened' : 'menu-item'}>
                                    <a href="/sports-listing" className=" menu-link">
                                        <span className="menu-label">
                                            <span className="menu-name">Sports</span>
                                        </span>
                                        <span className="menu-icon">
                                            <i className="icon-placeholder mdi mdi-trophy"></i>
                                        </span>
                                    </a>
                                </li>

                                <li className={activePath == '/series-listing' ? 'menu-item active opened' : 'menu-item'}>
                                    <a href="/series-listing" className=" menu-link">
                                        <span className="menu-label">
                                            <span className="menu-name">Series</span>
                                        </span>
                                        <span className="menu-icon">
                                            <i className="icon-placeholder mdi mdi-view-list"></i>
                                        </span>
                                    </a>
                                </li>

                                <li className={activePath == '/matches-listing' ? 'menu-item active opened' : 'menu-item'}>
                                    <a href="/matches-listing" className=" menu-link">
                                        <span className="menu-label">
                                            <span className="menu-name">Matches</span>
                                        </span>
                                        <span className="menu-icon">
                                            <i className="icon-placeholder mdi mdi-view-list"></i>
                                        </span>
                                    </a>
                                </li>

                                <li className={activePath == '/edit-globlesetting' ? 'menu-item active opened' : 'menu-item'}>
                                    <a href="/edit-globlesetting" className=" menu-link">
                                        <span className="menu-label">
                                            <span className="menu-name">Globle Setting</span>
                                        </span>
                                        <span className="menu-icon">
                                            <i className="icon-placeholder mdi mdi-view-list"></i>
                                        </span>
                                    </a>
                                </li>
                            </>
                        }

                        {currentUser.role == 'Sub-Admin' &&
                            <>
                                <li className={activePath == '/masters' ? 'menu-item active opened' : 'menu-item'}>
                                    <a href="#" className="open-dropdown menu-link">
                                        <span className="menu-label">
                                            <span className="menu-name">Masters
                                        <span className="menu-arrow"></span>
                                            </span>
                                        </span>
                                        <span className="menu-icon">
                                            <i className="icon-placeholder mdi mdi-bow-tie"></i>
                                        </span>
                                    </a>

                                    <ul className="sub-menu" style={activePath == '/masters' ? { display: 'block' } : { display: 'none' }}>
                                        <li className="menu-item">
                                            <a href="/masters" className=" menu-link">
                                                <span className="menu-label">
                                                    <span className="menu-name">List</span>
                                                </span>
                                                <span className="menu-icon">
                                                    <i className="icon-placeholder mdi mdi-account-details"></i>
                                                </span>
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="/masters-add" className=" menu-link">
                                                <span className="menu-label">
                                                    <span className="menu-name">Add</span>
                                                </span>
                                                <span className="menu-icon">
                                                    <i className="icon-placeholder mdi mdi-account-plus "></i>
                                                </span>
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="/masters-archive" className=" menu-link">
                                                <span className="menu-label">
                                                    <span className="menu-name">Archived</span>
                                                </span>
                                                <span className="menu-icon">
                                                    <i className="icon-placeholder mdi mdi-delete-sweep"></i>
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>

                                <li className={activePath == '/sports-listing' ? 'menu-item active opened' : 'menu-item'}>
                                    <a href="/sports-listing" className=" menu-link">
                                        <span className="menu-label">
                                            <span className="menu-name">Sports</span>
                                        </span>
                                        <span className="menu-icon">
                                            <i className="icon-placeholder mdi mdi-trophy"></i>
                                        </span>
                                    </a>
                                </li>

                                <li className={activePath == '/series-listing' ? 'menu-item active opened' : 'menu-item'}>
                                    <a href="/series-listing" className=" menu-link">
                                        <span className="menu-label">
                                            <span className="menu-name">Series</span>
                                        </span>
                                        <span className="menu-icon">
                                            <i className="icon-placeholder mdi mdi-view-list"></i>
                                        </span>
                                    </a>
                                </li>

                                <li className={activePath == '/matches-listing' ? 'menu-item active opened' : 'menu-item'}>
                                    <a href="/matches-listing" className=" menu-link">
                                        <span className="menu-label">
                                            <span className="menu-name">Matches</span>
                                        </span>
                                        <span className="menu-icon">
                                            <i className="icon-placeholder mdi mdi-view-list"></i>
                                        </span>
                                    </a>
                                </li>
                            </>
                        }

                        {currentUser.role == 'Master' &&
                            <>
                                <li className={activePath == '/players' ? 'menu-item active opened' : 'menu-item'}>
                                    <a href="#" className="open-dropdown menu-link">
                                        <span className="menu-label">
                                            <span className="menu-name">Players
                                        <span className="menu-arrow"></span>
                                            </span>
                                        </span>
                                        <span className="menu-icon">
                                            <i className="icon-placeholder mdi mdi-cards-spade"></i>
                                        </span>
                                    </a>

                                    <ul className="sub-menu" style={activePath == '/players' ? { display: 'block' } : { display: 'none' }}>
                                        <li className="menu-item">
                                            <a href="/players" className=" menu-link">
                                                <span className="menu-label">
                                                    <span className="menu-name">List</span>
                                                </span>
                                                <span className="menu-icon">
                                                    <i className="icon-placeholder mdi mdi-account-details"></i>
                                                </span>
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="/players-add" className=" menu-link">
                                                <span className="menu-label">
                                                    <span className="menu-name">Add</span>
                                                </span>
                                                <span className="menu-icon">
                                                    <i className="icon-placeholder mdi mdi-account-plus "></i>
                                                </span>
                                            </a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="/players-archive" className=" menu-link">
                                                <span className="menu-label">
                                                    <span className="menu-name">Archived</span>
                                                </span>
                                                <span className="menu-icon">
                                                    <i className="icon-placeholder mdi mdi-delete-sweep"></i>
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>

                                <li className={activePath == '/sports-listing' ? 'menu-item active opened' : 'menu-item'}>
                                    <a href="/sports-listing" className=" menu-link">
                                        <span className="menu-label">
                                            <span className="menu-name">Sports</span>
                                        </span>
                                        <span className="menu-icon">
                                            <i className="icon-placeholder mdi mdi-trophy"></i>
                                        </span>
                                    </a>
                                </li>

                                <li className={activePath == '/series-listing' ? 'menu-item active opened' : 'menu-item'}>
                                    <a href="/series-listing" className=" menu-link">
                                        <span className="menu-label">
                                            <span className="menu-name">Series</span>
                                        </span>
                                        <span className="menu-icon">
                                            <i className="icon-placeholder mdi mdi-view-list"></i>
                                        </span>
                                    </a>
                                </li>

                                <li className={activePath == '/matches-listing' ? 'menu-item active opened' : 'menu-item'}>
                                    <a href="/matches-listing" className=" menu-link">
                                        <span className="menu-label">
                                            <span className="menu-name">Matches</span>
                                        </span>
                                        <span className="menu-icon">
                                            <i className="icon-placeholder mdi mdi-view-list"></i>
                                        </span>
                                    </a>
                                </li>

                                <li className={activePath == '/credits-history' ? 'menu-item active opened' : 'menu-item'}>
                                    <a href="/credits-history" className=" menu-link">
                                        <span className="menu-label">
                                            <span className="menu-name">Credits History</span>
                                        </span>
                                        <span className="menu-icon">
                                            <i className="icon-placeholder mdi mdi-coins "></i>
                                        </span>
                                    </a>
                                </li>
                            </>
                        }

                        {(currentUser.role == 'Player') &&
                            <>
                                <li className={activePath == '/inplay' ? 'menu-item active opened' : 'menu-item'}>
                                    <a href="/inplay" className=" menu-link">
                                        <span className="menu-label">
                                            <span className="menu-name">Dashboard</span>
                                        </span>
                                        <span className="menu-icon">
                                            <i className="icon-placeholder mdi mdi-shape-outline "></i>
                                        </span>
                                    </a>
                                </li>

                                <li className={activePath == '/credits-history' ? 'menu-item active opened' : 'menu-item'}>
                                    <a href="/credits-history" className=" menu-link">
                                        <span className="menu-label">
                                            <span className="menu-name">Credits History</span>
                                        </span>
                                        <span className="menu-icon">
                                            <i className="icon-placeholder mdi mdi-coins "></i>
                                        </span>
                                    </a>
                                </li>
                            </>
                        }

                    </ul>
                </div>

            </aside>

        );
    }
}

export default SideMenuData;
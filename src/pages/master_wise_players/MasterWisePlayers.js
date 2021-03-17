import React from 'react';
import * as GlobalProvider from '../../providers/globals/globals';
import Header from '../../components/elements/Header';
import RecordNotFound from '../../components/elements/RecordNotFound';
import * as ApisService from "../../providers/apis/apis";
import { Roller } from "react-awesome-spinners";
import SideMenuData from '../../components/elements/SideMenuData';

class MasterWisePlayers extends React.Component {

    constructor(props) {
        super(props);

        let currentUser = GlobalProvider.getUser();

        this.state = {
            entries: [],
            master: {},
            errors: {},
            loading: false,
            currentUser: GlobalProvider.getUser(),
            open: false,
        }
    }

    componentDidMount() {

        let parent_id = this.props.match.params.parent_id;

        this.getUsers(parent_id);
    }

    getUsers = (parent_id) => {

        this.setState({
            loading: true,
            errors: {},
        });

        ApisService.getListMasterWisePlayers(parent_id)
            .then(response => {

                if (response.status) {
                    this.setState({
                        loading: false,
                        entries: response.data,
                        master: response.master,
                    });
                } else {
                    this.setState({
                        loading: false,
                    });
                    GlobalProvider.errorMessage(response.message);
                }

                GlobalProvider.loadDataTable();

            }).catch(error => {
                this.setState({
                    loading: false,
                });
                GlobalProvider.errorMessage(error);
            });
    }

    render() {

        const { entries, master, loading, open, errors, currentUser } = this.state;
        let count = 1;

        return (
            <>
                <SideMenuData />

                <main className="admin-main">

                    <Header />

                    <section className="admin-content">
                        <div className="bg-dark">
                            <div className="container  m-b-30">
                                <div className="row">
                                    <div className="col-12 text-white p-t-40 p-b-90">

                                        {currentUser.role == 'Admin' &&
                                            <h4 className="">
                                                <a href={"/sub-admins"} className="in-active"> Sub Admins </a> &raquo;
                                                <a href={"/sub-admin-wise-masters/" + master.parent_id} className="in-active"> Masters </a> &raquo;
                                                Players of ({master.name})
                                            </h4>
                                        }
                                        {currentUser.role == 'Sub-Admin' &&
                                            <h4 className="">
                                                <a href={"/masters"} className="in-active"> Masters </a> &raquo;
                                                Players of ({master.name})
                                            </h4>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        {loading && <div className="center"><Roller /></div>}

                        {entries.length == 0 && <RecordNotFound />}

                        {entries.length > 0 &&

                            <div className="container  pull-up">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card">

                                            <div className="card-body">
                                                <div className="table-responsive p-t-10">
                                                    <table id="example-height" className="table   " style={{ width: "100%" }}>
                                                        <thead>
                                                            <tr>
                                                                <th>Name</th>
                                                                <th>Username</th>
                                                                <th>Mobile</th>
                                                                <th>Address</th>
                                                                <th>Avl. Credit</th>
                                                                <th>Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {entries.map((item, index) =>
                                                                <tr key={item.id} id={'RecordID_' + item.id}>
                                                                    <td>{item.name}</td>
                                                                    <td>{item.username}</td>
                                                                    <td>{item.mobile}</td>
                                                                    <td>{item.address}</td>
                                                                    <td className="right">{item.credit}</td>
                                                                    <td>
                                                                        <span className="changeStatus">
                                                                            {item.status ? (
                                                                                <button type="button" className="btn btn-sm m-b-15 ml-2 mr-2 btn-rounded-circle btn-success" title="Disable"><i className="mdi mdi-check"></i></button>
                                                                            ) : (
                                                                                    <button type="button" className="btn btn-sm m-b-15 ml-2 mr-2 btn-rounded-circle btn-warning" title="Enable"><i className="mdi mdi-close"></i></button>
                                                                                )}
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            )}

                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                    </section>

                </main>
            </>
        );

    }
}

export default MasterWisePlayers;
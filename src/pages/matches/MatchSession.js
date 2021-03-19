import React from 'react';
import * as GlobalProvider from '../../providers/globals/globals';
import Header from '../../components/elements/Header';
import RecordNotFound from '../../components/elements/RecordNotFound';
import * as ApisService from "../../providers/apis/apis";
import { Roller } from "react-awesome-spinners";
import SideMenuData from '../../components/elements/SideMenuData';


class MatcheSession extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            entries:  [],
            errors: {},
            loading: false,
            currentUser: GlobalProvider.getUser(),
        }
    }

    componentDidMount() {
        let event_id = this.props.match.params.event_id;
        this.MatchSessionsloadData(event_id);
    }

    MatchSessionsloadData = (event_id) => {

        this.setState({
            loading: true,
            errors: {},
        });

        ApisService.getListMatcheSessions(event_id)
            .then(response => {

                console.log('response:::::::::::', response)

                if (response.status) {
                    this.setState({
                        loading: false,
                        entries: response.data,
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

    changesessionStatus = (session_id, status) => {

        let _this = this;

        GlobalProvider.confirmBox("Are you Sure? You want to change status of this record.", (isTrue) => {
            if (isTrue) {
                ApisService.addremoveMatchStatus(session_id, status)
                    .then(response => {

                        if (response.status) {

                            // update item status and set updated value into state
                            const { entries } = _this.state;

                            let entriesNew = entries.filter((item) => {
                                if (item.session_id == session_id) {
                                    
                                    item.is_allowed = status;
                                }

                                return item;
                            });

                            _this.setState({
                                entries: entriesNew,
                            });

                            GlobalProvider.successMessage(response.message);

                        } else {
                            GlobalProvider.errorMessage(response.message);
                        }

                    }).catch(error => {
                        GlobalProvider.errorMessage(error.message);
                    });
            }
        });
    }

    abandonedsession = (session_id) => {

        let _this = this;

        GlobalProvider.confirmBox("Are you Sure? You want to change status of this record.", (isTrue) => {
            if (isTrue) {
                ApisService.abandonedMatchStatus(session_id)
                    .then(response => {

                        if (response.status) {

                            // update item status and set updated value into state
                            const { entries } = _this.state;

                            let entriesNew = entries.filter((item) => {
                                if (item.session_id == session_id) {
                                    
                                    item.is_abandoned = !item.is_abandoned;
                                }

                                return item;
                            });

                            _this.setState({
                                entries: entriesNew,
                            });

                            GlobalProvider.successMessage(response.message);

                        } else {
                            GlobalProvider.errorMessage(response.message);
                        }

                    }).catch(error => {
                        GlobalProvider.errorMessage(error.message);
                    });
            }
        });
    }

    render() {

        const { entries, loading } = this.state;

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
                                        <h4 className="">Matches</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {loading && <div className="center"><Roller /></div>}

                        {!loading && entries.length == 0 && <RecordNotFound />}

                        {entries.length > 0 &&

                            <div className="container  pull-up">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card">

                                            <div className="card-body">
                                                <div className="table-responsive p-t-10">
                                                    <table id="listingTable" className="table " style={{ width: "100%" }}>
                                                        <thead>
                                                            <tr>
                                                                <th>Selection ID</th>
                                                                <th>RunnerName</th>
                                                                <th>GameStatus</th>
                                                                <th>Allowed</th>
                                                                <th>abandoned</th>
                                                                
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {entries.map((item, index) =>
                                                                
                                                                
                                                                    (item.is_abandoned==0)?
                                                                <tr key={item.session_id} id={'RecordID_' + item.session_id}>
                                                                    <td>{item.SelectionId}</td>
                                                                    <td>{item.RunnerName}</td>
                                                                    <td>{item.GameStatus}</td>
                                                                    <td className="text-align-center">
                                                                    <span className="changeStatus">
                                                                       
                                                                     {
                                                                          (item.is_allowed===0)  ? (
                                                                                <button type="button" onClick={() => this.changesessionStatus(item.session_id, 1)} className="btn btn-sm m-b-15 ml-2 mr-2 btn-rounded-circle btn-success" title="Allowed"><i className="mdi mdi-check"></i></button>
                                                                            )  : (
                                                                                    <button type="button" onClick={() => this.changesessionStatus(item.session_id, 0)} className="btn btn-sm m-b-15 ml-2 mr-2 btn-rounded-circle btn-warning" title="Allowed Request Cancel"><i className="mdi mdi-close"></i></button>
                                                                                )
                                                                     }
                                                                     </span>
                                                                     </td>
                                                                    
                                                                     <td className="text-align-center">
                                                                     <button type="button" onClick={() => this.abandonedsession(item.session_id)} className="btn btn-sm m-b-15 ml-2 mr-2  btn-danger" title="Abandoned">Abandoned</button>
                                                                      </td>
                                                                </tr>:null
                                                                
                                                                
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

export default MatcheSession;
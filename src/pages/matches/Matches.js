import React from 'react';
import * as GlobalProvider from '../../providers/globals/globals';
import Header from '../../components/elements/Header';
import Pagenation from '../../components/elements/Pagenation';
import RecordNotFound from '../../components/elements/RecordNotFound';
import * as ApisService from "../../providers/apis/apis";
import { Roller } from "react-awesome-spinners";
import SideMenuData from '../../components/elements/SideMenuData';
import queryString from 'query-string';

class Matches extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            entries: [],
            errors: {},
            loading: false,
            queryString: queryString.parse(props.location.search),
            currentUser: GlobalProvider.getUser(),
        }
    }

    componentDidMount() {

        this.loadData();
    }

    loadData = () => {

        this.setState({
            loading: true,
            errors: {},
        });

        const { queryString } = this.state;

        let params = {seriesID: queryString.seriesID};
        ApisService.getMatches(params)
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

    changeStatus = (id, status) => {

        let _this = this;

        GlobalProvider.confirmBox("Are you Sure? You want to change status of this record.", (isTrue) => {
            if (isTrue) {
                ApisService.changeMatchStatus(id, status)
                    .then(response => {

                        if (response.status) {

                            // update item status and set updated value into state
                            const { entries } = _this.state;

                            let entriesNew = entries.filter((item) => {
                                if (item.id == id) {
                                    item.status = status;
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
                                                    <table id="example-height" className="table   " style={{ width: "100%" }}>
                                                        <thead>
                                                            <tr>
                                                                <th>Matches ID</th>
                                                                <th>Matches Name</th>
                                                                <th>Event Open Date</th>
                                                                <th>Series Name</th>
                                                                <th>Sports Name</th>
                                                                <th>Status</th>
                                                                <th>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {entries.map((item, index) =>
                                                                <tr key={item.id} id={'RecordID_' + item.id}>
                                                                    <td>{item.event_id}</td>
                                                                    <td>{item.event_name}</td>
                                                                    <td>{item.event_open_date}</td>
                                                                    <td>{item.competition_name}</td>
                                                                    <td>{item.sports_name}</td>
                                                                    <td className="text-align-center">
                                                                        <span className="changeStatus" onClick={() => this.changeStatus(item.id, !item.status)}>
                                                                            {item.status ? (
                                                                                <button type="button" className="btn btn-sm m-b-15 ml-2 mr-2 btn-rounded-circle btn-success" title="Disable"><i className="mdi mdi-check"></i></button>
                                                                            ) : (
                                                                                    <button type="button" className="btn btn-sm m-b-15 ml-2 mr-2 btn-rounded-circle btn-warning" title="Enable"><i className="mdi mdi-close"></i></button>
                                                                                )}
                                                                        </span>
                                                                    </td>
                                                                    <td className="text-align-center">
                                                                        <a href={"/match-detail/" + item.id} className="btn btn-sm m-b-15 ml-2 mr-2 btn-rounded-circle btn-info" title="Match Detail"><i className="mdi mdi-eye"></i></a>
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

export default Matches;
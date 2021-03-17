import React from 'react';
import * as GlobalProvider from '../../providers/globals/globals';
import Header from '../../components/elements/Header';
import Pagenation from '../../components/elements/Pagenation';
import * as ApisService from "../../providers/apis/apis";
import { Roller } from "react-awesome-spinners";
import SideMenuData from '../../components/elements/SideMenuData';

class MatchDetail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            detail: {},
            errors: {},
            loading: false,
            currentUser: GlobalProvider.getUser(),
        }
    }

    componentDidMount() {

        let id = this.props.match.params.id;

        // this.getAccountDetail(id);
    }

    getMatchDetail = (id) => {

        this.setState({
            loading: true,
            errors: {},
        });

        ApisService.getSubAdminAccountDetail(id)
            .then(response => {

                if (response.status) {
                    this.setState({
                        loading: false,
                        detail: response.data,
                    });
                } else {
                    GlobalProvider.errorMessage(response.message);
                }

            }).catch(error => {
                GlobalProvider.errorMessage(error);
            });
    }

    render() {

        const { detail, loading } = this.state;
        let count = 1;

        return (
            <>
                <SideMenuData />

                <main className="admin-main">

                    <Header />
                    
                    <section className="admin-content ">
                        <div className="bg-dark bg-dots m-b-30">
                            <div className="container">
                                <div className="row p-b-60 p-t-60">
                                    <div className="col-lg-8 mx-auto text-white p-b-30">
                                        <h3>Match Detail </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <section className="pull-up">
                            <div className="container">
                                <div className="row ">
                                    <div className="col-lg-8 mx-auto  mt-2">
                                        <div className="card py-3 m-b-30">
                                            <div className="card-body">

                                                <h1>Coming Soon...</h1>
                                                
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </section>
                    </section>
                </main>

            </>
        );

    }
}

export default MatchDetail;
import React from 'react';
import * as GlobalProvider from '../../providers/globals/globals';
import Header from '../../components/elements/Header';
import Pagenation from '../../components/elements/Pagenation';
import * as ApisService from "../../providers/apis/apis";
import { Roller } from "react-awesome-spinners";
import SideMenuData from '../../components/elements/SideMenuData';

class MasterView extends React.Component {

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

        this.getAccountDetail(id);
    }

    getAccountDetail = (id) => {

        this.setState({
            loading: true,
            errors: {},
        });

        ApisService.getMasterAccountDetail(id)
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
                                        <h3>Master Form </h3>
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
                                                <form>
                                                    <h3 className="">Information</h3>
                                                    
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <label>Name</label>
                                                            <input type="text" value={detail.name} className="form-control" readOnly />
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label>Email</label>
                                                            <input type="email" value={detail.email} className="form-control" readOnly />
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <label>Username</label>
                                                            <input type="text" value={detail.username} className="form-control" readOnly />
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label>Mobile</label>
                                                            <input type="text" value={detail.mobile} className="form-control" readOnly />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Address</label>
                                                        <input type="text" value={detail.address} className="form-control" readOnly />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Available Credit</label>
                                                        <input type="text" value={detail.credit} className="form-control" readOnly />
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <label>Margin in %</label>
                                                            <input type="text" value={detail.margin_per} className="form-control" readOnly />
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label for="inputPassword4">Margin in fix</label>
                                                            <input type="text" value={detail.margin_fix} className="form-control" readOnly />
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <label>Created At</label>
                                                            <input type="text" value={detail.created_at} className="form-control" readOnly />
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label>Updated At</label>
                                                            <input type="text" value={detail.updated_at} className="form-control" readOnly />
                                                        </div>
                                                    </div>
                                                    
                                                    <a href={"/masters-edit/"+detail.id} className="btn btn-success btn-cta">Edit</a>
                                                    &nbsp;&nbsp;
                                                    <a href={"/masters"} className="btn btn-dark btn-cta">Back</a>

                                                </form>
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

export default MasterView;
import React from 'react';
import * as GlobalProvider from '../../providers/globals/globals';
import Header from '../../components/elements/Header';
import Pagenation from '../../components/elements/Pagenation';
import * as ApisService from "../../providers/apis/apis";
import { Roller } from "react-awesome-spinners";
import SideMenuData from '../../components/elements/SideMenuData';
import * as CustomValidators from '../../providers/shared/validator';

class PlayerEdit extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formData: {}, // Contains form data
            errors: {}, // Contains field errors
            formSubmitted: false, // Indicates submit status of form
            loading: false, // Indicates in progress state of form
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

        ApisService.getPlayerAccountDetail(id)
            .then(response => {

                if (response.status) {
                    this.setState({
                        loading: false,
                        formData: response.data,
                    });
                } else {
                    GlobalProvider.errorMessage(response.message);
                }

            }).catch(error => {
                GlobalProvider.errorMessage(error);
            });
    }

    handleChange = (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;

        let { formData } = this.state;
        formData[name] = value;

        this.setState({
            formData: formData
        });
    }

    validateLoginForm = (e) => {

        let errors = {};
        const { formData } = this.state;

        if (CustomValidators.isEmpty(formData.name)) {
            errors.name = "Name can't be blank";
        }

        if (!CustomValidators.isEmpty(formData.email) && !CustomValidators.isEmail(formData.email)) {
            errors.email = "Please enter a valid email";
        }

        if (!CustomValidators.isEmpty(formData.mobile) && !CustomValidators.isPhoneNumber(formData.mobile)) {
            errors.mobile = "Please inter valid mobile number.";
        }

        if (!CustomValidators.numberOnly(formData.max_profit)) {
            errors.max_profit = "Please inter number only.";
        }
        else if(formData.max_profit < 0) {
            errors.max_profit = "Please inter minimum 0.";
        }
        else if(formData.max_profit > 100000) {
            errors.max_profit = "You can inter maximum 100000.";
        }

        if (CustomValidators.isEmpty(errors)) {
            return null;
        } else {
            return errors;
        }
    }

    update = (e) => {

        e.preventDefault();

        const { formData } = this.state;
        console.log('formData::::::', formData)

        this.setState({
            loading: true,
            formSubmitted: true,
            errors: {},
        });

        let errors = this.validateLoginForm();
        console.log('errors::::::', errors)

        if (!errors) {

            ApisService.updatePlayerAccount(formData)
                .then(response => {

                    if (response.status) {
                        this.setState({
                            formSubmitted: false,
                            loading: false,
                        });
                        GlobalProvider.successMessage(response.message);
                        this.props.history.push('/players');
                    } else {
                        this.setState({
                            formSubmitted: false,
                            loading: false,
                        });
                        GlobalProvider.errorMessage(response.message);
                    }

                }).catch(error => {
                    this.setState({
                        formSubmitted: false,
                        loading: false,
                    });
                    GlobalProvider.errorMessage(error);
                });

        } else {
            this.setState({
                errors: errors,
                formSubmitted: false,
                loading: false,
            });
        }
    }

    render() {

        const { formData, loading, errors } = this.state;

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
                                        <h3>Player Form </h3>
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

                                                <form className="needs-validation" onSubmit={this.update}>

                                                    <h3 className="">Update Information</h3>

                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <label for="inputEmail6">Name*</label>
                                                            <input type="text" className="form-control" name="name" defaultValue={formData.name} onKeyUp={this.handleChange} />
                                                            {errors.name && <span className="error">{errors.name}</span>}
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label for="inputEmail4">Email</label>
                                                            <input type="email" className="form-control" name="email" defaultValue={formData.email} onKeyUp={this.handleChange} />
                                                            {errors.email && <span className="error">{errors.email}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <label for="asd">Username</label>
                                                            <input type="text" className="form-control" name="username" defaultValue={formData.username} readOnly />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="inputAddress">Address</label>
                                                        <input type="text" className="form-control" name="address" defaultValue={formData.address} onKeyUp={this.handleChange} />
                                                        {errors.address && <span className="error">{errors.address}</span>}
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <label for="inputPassword4">Mobile</label>
                                                            <input type="phone" className="form-control" name="mobile" defaultValue={formData.mobile} onKeyUp={this.handleChange} />
                                                            {errors.mobile && <span className="error">{errors.mobile}</span>}
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label for="inputPassword4">Max Profit</label>
                                                            <input type="number" className="form-control" name="max_profit" defaultValue={formData.max_profit} onKeyUp={this.handleChange} />
                                                            <small>Note: 0 maines unlimited.</small><br />
                                                            {errors.max_profit && <span className="error">{errors.max_profit}</span>}
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <label for="inputEmail4">Betting Status</label>
                                                            <select className="form-control" name="is_betting" value={formData.is_betting} onChange={this.handleChange}>
                                                                <option value={1}>Open</option>
                                                                <option value={0}>Locked</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label for="inputEmail4">Account Status</label>
                                                            <select className="form-control" name="status" value={formData.status} onChange={this.handleChange}>
                                                                <option value={1}>Active</option>
                                                                <option value={0}>In-Active</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <button type="submit" className="btn btn-primary btn-cta" disabled={loading}>{loading ? 'Waiting...' : 'Submit'}</button>
                                                    &nbsp;&nbsp;
                                                    <a href={"/players"} className="btn btn-dark btn-cta">Cancel</a>

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

export default PlayerEdit;
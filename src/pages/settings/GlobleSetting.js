import React from 'react';
import * as GlobalProvider from '../../providers/globals/globals';
import Header from '../../components/elements/Header';
import Pagenation from '../../components/elements/Pagenation';
import * as ApisService from "../../providers/apis/apis";
import { Roller } from "react-awesome-spinners";
import SideMenuData from '../../components/elements/SideMenuData';
import * as CustomValidators from '../../providers/shared/validator';

class GlobleSetting extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formData: {
               
            }, // Contains form data
            errors: {}, // Contains field errors
            formSubmitted: false, // Indicates submit status of form
            loading: false, // Indicates in progress state of form
            currentUser: GlobalProvider.getUser(),
        }
    }

    componentDidMount() {
        this.getGlobleSetting();
    }

    getGlobleSetting = () => {

        this.setState({
            loading: true,
            errors: {},
        });

        ApisService.getGlobleSettingData()
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

        if (CustomValidators.isEmpty(formData.app_name)) {
            errors.app_name = "App Name can't be blank";
        }
        
       if (CustomValidators.numberOnly(formData.is_bat_allowed)) {
            errors.is_bat_allowed = "Please Enter number only.";
        }
        
       if (CustomValidators.numberOnly(formData.user_max_profit_on_session)) {
            errors.user_max_profit_on_session = "Please Enter number only.";
        }
        
       if (CustomValidators.numberOnly(formData.user_max_profit_on_odds) ) {
            errors.user_max_profit_on_odds = "Please Enter number only.";
        }
        
       if (CustomValidators.numberOnly(formData.margin_per)) {
            errors.margin_per = "Please Enter number only.";
        }
        if (!CustomValidators.numberOnly(formData.margin_fix)) {
            errors.margin_fix = "Please Enter number only.";
        }
      
console.log("Err:::::: ",errors)
        if (CustomValidators.isEmpty(errors)) {
            return null;
        } else {
            return errors;
        }
    }

    update = (e) => {

        e.preventDefault();

        const { formData, currentUser } = this.state;
        console.log('formData::::::', formData)

        this.setState({
            loading: true,
            formSubmitted: true,
            errors: {},
        });

        let errors = this.validateLoginForm();
        console.log('errors::::::', errors)

        if (!errors) {

            ApisService.updateAccount(formData)
                .then(response => {

                    if (response.status) {
                        this.setState({
                            formSubmitted: false,
                            loading: false,
                        });

                        // let userInfo = currentUser;
                        // userInfo.name = formData.name;
                        // userInfo.email = formData.email;
                        // userInfo.mobile = formData.mobile;
                        // userInfo.address = formData.address;
                       // console.log('userInfo:', userInfo)

                       // GlobalProvider.setUser(userInfo);
                        GlobalProvider.successMessage(response.message);
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
                                        <h3>Globle Setting Information </h3>
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
                                                            <label for="inputEmail6">App Name*</label>
                                                            <input type="text" className="form-control" name="app_name" defaultValue={formData.app_name} onKeyUp={this.handleChange} />
                                                            {errors.app_name && <span className="error">{errors.app_name}</span>}
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label for="inputEmail4">Bat allowed</label>
                                                            <input type="text" className="form-control" name="is_bat_allowed" defaultValue={formData.is_bat_allowed} onKeyUp={this.handleChange} />
                                                            {errors.is_bat_allowed && <span className="error">{errors.is_bat_allowed}</span>}
                                                           </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <label for="asd">Margin Per</label>
                                                            <input type="text" className="form-control" name="margin_per" defaultValue={formData.margin_per}  onKeyUp={this.handleChange} />
                                                            {errors.margin_per && <span className="error">{errors.margin_per}</span>}
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                            <label for="inputPassword4">Margin Fix</label>
                                                            <input type="text" className="form-control" name="margin_fix" defaultValue={formData.margin_fix} onKeyUp={this.handleChange} />
                                                            {errors.margin_fix && <span className="error">{errors.margin_fix}</span>}
                                                           </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label for="inputAddress">Max Profit Session</label>
                                                        <input type="text" className="form-control" name="user_max_profit_on_session" defaultValue={formData.user_max_profit_on_session} onKeyUp={this.handleChange} />
                                                        {errors.user_max_profit_on_session && <span className="error">{errors.user_max_profit_on_session}</span>}
                                                       </div>
                                                 <div className="form-group">
                                                        <label for="inputAddress">Max Profit odds</label>
                                                        <input type="text" className="form-control" name="user_max_profit_on_odds" defaultValue={formData.user_max_profit_on_odds} onKeyUp={this.handleChange} />
                                                        {errors.user_max_profit_on_odds && <span className="error">{errors.user_max_profit_on_odds}</span>}
                                                       </div>

                                                    <button type="submit" className="btn btn-primary btn-cta" disabled={loading}>{loading ? 'Waiting...' : 'Submit'}</button>
                                                    &nbsp;&nbsp;
                                                    <a href={"/sub-admins"} className="btn btn-dark btn-cta">Cancel</a>

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

export default GlobleSetting;
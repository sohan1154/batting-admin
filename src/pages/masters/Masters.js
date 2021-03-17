import React from 'react';
import * as GlobalProvider from '../../providers/globals/globals';
import Header from '../../components/elements/Header';
import Pagenation from '../../components/elements/Pagenation';
import RecordNotFound from '../../components/elements/RecordNotFound';
import * as ApisService from "../../providers/apis/apis";
import { Roller } from "react-awesome-spinners";
import SideMenuData from '../../components/elements/SideMenuData';
import * as CustomValidators from '../../providers/shared/validator';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

class Masters extends React.Component {

    constructor(props) {
        super(props);

        let currentUser = GlobalProvider.getUser();

        this.state = {
            formData: {
                action_user_id: currentUser.id,
                user_id: 0,
                credit: 0,
                remark: '',
            }, // Contains form data
            entries: [],
            errors: {},
            loading: false,
            currentUser: GlobalProvider.getUser(),
            open: false,
        }
    }

    componentDidMount() {

        this.getUsers('Master');
    }

    getUsers = (role) => {

        this.setState({
            loading: true,
            errors: {},
        });

        ApisService.getMasterUsers(role)
            .then(response => {

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

        // document.body.classList.add('display-loader');

        GlobalProvider.confirmBox("Are you Sure? You want to change status of this account.", (isTrue) => {
            if (isTrue) {
                ApisService.changeMasterAccountStatus(id, status)
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

    deleteAccount = (id, index) => {

        let _this = this;

        GlobalProvider.confirmBox("Are you Sure? You want to delete this account.", (isTrue) => {
            if (isTrue) {
                ApisService.deleteMasterAccount(id)
                    .then(response => {

                        if (response.status) {

                            // remove item from array 
                            const { entries } = _this.state;

                            let entriesNew = entries.filter((item) => {
                                if (item.id != id) {
                                    return item;
                                }
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
        })
    }

    openCreditForm = (id) => {

        let { formData } = this.state;
        formData['user_id'] = id;

        this.setState({
            formData: formData,
            errors: {},
        });

        this.setState({ open: true });
    }

    onCloseModal = () => {
        this.setState({ open: false });
    }

    addCredit = (e) => {

        let _this = this;

        e.preventDefault();
        const { formData } = this.state;

        this.setState({
            loading: true,
            formSubmitted: true,
            errors: {},
        });

        let errors = this.validateForm();

        if (!errors) {

            ApisService.addMasterCredit(formData)
                .then(response => {

                    if (response.status) {

                        // update item status and set updated value into state
                        const { entries } = _this.state;

                        let entriesNew = entries.filter((item) => {
                            if (item.id == formData.user_id) {
                                item.credit = response.availableCredit;
                            }

                            return item;
                        });

                        _this.setState({
                            entries: entriesNew,
                            formSubmitted: false,
                            loading: false,
                            errors: {},
                        });

                        GlobalProvider.successMessage(response.message);

                    } else {
                        this.setState({
                            loading: false,
                            formSubmitted: false,
                            errors: {
                                message: response.message
                            }
                        });
                    }
                }).catch(error => {
                    this.setState({
                        loading: false,
                        formSubmitted: false,
                        errors: {
                            message: error
                        }
                    });
                });

        } else {
            this.setState({
                errors: errors,
                formSubmitted: false,
                loading: false,
            });
        }
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

    validateForm = (e) => {

        let errors = {};
        const { formData } = this.state;

        if (!CustomValidators.isMoreThenZero(formData.credit)) {
            errors.credit = "Please enter credit value.";
        }
        else if (!CustomValidators.isEmpty(formData.credit) && !CustomValidators.numberOnly(formData.credit)) {
            errors.credit = "Please inter valid number.";
        }

        if (CustomValidators.isEmpty(formData.remark)) {
            errors.remark = "Please inter remark.";
        }

        if (CustomValidators.isEmpty(errors)) {
            return null;
        } else {
            return errors;
        }
    }

    render() {

        const { entries, loading, open, errors } = this.state;
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
                                        <h4 className="">Masters</h4>
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
                                                                <th>Actions</th>
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
                                                                        <span className="changeStatus" onClick={() => this.changeStatus(item.id, !item.status)}>
                                                                            {item.status ? (
                                                                                <button type="button" className="btn btn-sm m-b-15 ml-2 mr-2 btn-rounded-circle btn-success" title="Disable"><i className="mdi mdi-check"></i></button>
                                                                            ) : (
                                                                                    <button type="button" className="btn btn-sm m-b-15 ml-2 mr-2 btn-rounded-circle btn-warning" title="Enable"><i className="mdi mdi-close"></i></button>
                                                                                )}
                                                                        </span>
                                                                    </td>
                                                                    <td>
                                                                        <a href={"/master-wise-players/" + item.id} className="btn btn-sm m-b-15 ml-2 mr-2 btn-rounded-circle btn-secondary" title="Players"><i className="mdi mdi-account-details"></i></a>
                                                                        <button className="btn btn-sm m-b-15 ml-2 mr-2 btn-rounded-circle btn-dark" title="Add Credit" onClick={() => this.openCreditForm(item.id)}><i className="mdi mdi-wallet"></i></button>
                                                                        <a href={"/masters-reset-password/" + item.id} className="btn btn-sm m-b-15 ml-2 mr-2 btn-rounded-circle btn-primary" title="Reset Password"><i className="mdi mdi-key"></i></a>
                                                                        <a href={"/masters-view/" + item.id} className="btn btn-sm m-b-15 ml-2 mr-2 btn-rounded-circle btn-info" title="Detail"><i className="mdi mdi-eye"></i></a>
                                                                        <a href={"/masters-edit/" + item.id} className="btn btn-sm m-b-15 ml-2 mr-2 btn-rounded-circle btn-warning" title="Edit"><i className="mdi mdi-square-edit-outline"></i></a>
                                                                        <button className="btn btn-sm m-b-15 ml-2 mr-2 btn-rounded-circle btn-danger" title="Delete" onClick={() => this.deleteAccount(item.id, index)}><i className="mdi mdi-delete"></i></button>
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

                <Modal open={open} onClose={this.onCloseModal} center>

                    <div className="modal-content m-t-80">
                        <div className="modal-body">
                            <div className="">

                                <h3 className="text-center">ADD CREDIT </h3>

                                <form className="needs-validation" onSubmit={this.addCredit}>
                                    <div className="form-group">

                                        <div className="input-group input-group-flush mb-3">
                                            <input type="number" step="any" className="form-control form-control-prepended"
                                                placeholder="Credit" name="credit" onKeyUp={this.handleChange} />

                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <span className=" mdi mdi-wallet "></span>
                                                </div>
                                            </div>
                                        </div>
                                        {errors.credit && <span className="error">{errors.credit}</span>}

                                        <div className="input-group input-group-flush mb-3">
                                            <textarea maxlength="255" className="form-control form-control-prepended" rows="4" cols="50"
                                                placeholder="Remark" name="remark" onKeyUp={this.handleChange}></textarea>

                                            <div className="input-group-prepend">
                                                <div className="input-group-text">
                                                    <span className=" mdi mdi-note "></span>
                                                </div>
                                            </div>
                                        </div>
                                        {errors.remark && <span className="error">{errors.remark}</span>}

                                    </div>

                                    {errors.message && <><span className="error-response">{errors.message}</span></>}

                                    <div className="form-group">
                                        <button type="submit" data-dismiss="modal" className="btn text-uppercase btn-block  btn-primary"
                                            disabled={loading}>{loading ? 'Waiting...' : 'Add'}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </Modal>

            </>
        );

    }
}

export default Masters;
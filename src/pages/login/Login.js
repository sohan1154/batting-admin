import React, { Component } from "react";
import './login.css';
import * as CustomValidators from '../../providers/shared/validator';
import * as GlobalProvider from '../../providers/globals/globals';
import * as ApisService from "../../providers/apis/apis";

class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      formData: {}, // Contains login form data
      errors: {}, // Contains login field errors
      formSubmitted: false, // Indicates submit status of login form
      loading: false // Indicates in progress state of login form
    }
  }

  componentDidMount() {
    document.body.classList.add('loginbody');
  }

  componentWillUnmount() {
    document.body.classList.remove('loginbody');
  }

  handleInputChange = (event) => {

    const target = event.target;
    const value = target.value;
    const name = target.name;

    let { formData } = this.state;
    formData[name] = value;

    this.setState({
      formData: formData
    });
  }

  validateLoginForm = (e) => {

    let errors = {};
    const { formData } = this.state;

    if (CustomValidators.isEmpty(formData.username)) {
      errors.username = "Username can't be blank";
    }
    // else if (!CustomValidators.isEmail(formData.username)) {
    //   errors.username = "Please enter a valid email";
    // }

    if (CustomValidators.isEmpty(formData.password)) {
      errors.password = "Password can't be blank";
    }
    else if (CustomValidators.isContainWhiteSpace(formData.password)) {
      errors.password = "Password should not contain white spaces";
    }
    else if (!CustomValidators.isLength(formData.password, { gte: 6, lte: 16, trim: true })) {
      errors.password = "Password's length must between 6 to 16";
    }

    if (CustomValidators.isEmpty(errors)) {
      return null;
    } else {
      return errors;
    }
  }

  login = (e) => {

    e.preventDefault();
    const { formData } = this.state;

    this.setState({
      loading: true,
      formSubmitted: true,
      errors: {},
    });

    console.log('formData::::', formData)

    let errors = this.validateLoginForm();

    if (!errors) {

      ApisService.login(formData)
        .then(response => {

          if(response.status) {
            // store user information
            GlobalProvider.setToken(response.token);
            GlobalProvider.setUser(response.data);
            this.props.history.push('/dashboard');
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

  render() {

    const { loading, errors } = this.state;

    return (

      <main className="bg-pattern">
        <div className="container">
          <div className="row m-h-100 ">
            <div className="col-md-8 col-lg-4 m-auto">
              <div className="card shadow-lg ">
                <div className="card-body ">
                  <div className=" padding-box-2 ">
                    <div className="p-b-20 text-center">
                      <p>
                        <img src="assets/logos/logo.png" width="200" alt="" />
                      </p>
                    </div>

                    <form className="needs-validation" onSubmit={this.login}>
                      <div className="form-row">
                        <div className="form-group floating-label col-md-12">
                          <label>Username</label>
                          <input name="username" type="text" placeholder="Username" className="form-control" onChange={this.handleInputChange} />
                          {errors.username && <span className="error">{errors.username}</span>}
                        </div>
                        <div className="form-group floating-label col-md-12">
                          <label>Password</label>
                          <input name="password" type="password" placeholder="Passward" className="form-control" onChange={this.handleInputChange} />
                          {errors.password && <span className="error">{errors.password}</span>}
                        </div>
                      </div>

                      {errors.message && <><span className="error-response">{errors.message}</span></>}
                      <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>{loading ? 'Loading...' : 'Login'}</button>

                    </form>

                    <p className="text-right p-t-10">
                      {/* <a href="#!" className="text-underline">Forgot Password?</a> */}
                    </p>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Login;
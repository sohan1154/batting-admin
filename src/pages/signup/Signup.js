import React, { Component } from "react";
import Footer from '../../components/elements/Footer';

class Signup extends Component {

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

  render() {

    return (
      <main className="logincontainer">
        <div className="login_outer center_login_page">
          <form action="login.html">
            <div className="login_page clearfix">
              <div className="loginbody">
                <a href="javascript:void(0);" className="logo_login"><img src="images/redlogo.png" alt="logo" /></a>
                <p className="logac">Please Sign Up </p>
                <div className="form-group">
                  <input type="text" placeholder="First Name" className="form-control" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Last Name" className="form-control" />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Email" className="form-control" />
                </div>
                <div className="form-group logbtnrow">
                  <button className="btn btn-red ripplelink"> Submit</button>
                </div>
                <div className="wantregcontent">
                  <a href="/login">Already have account, Login</a>
                </div>
              </div>
              <div className="loginfootpt">
                <a href="/contact"><img src="images/logincontactico.png" alt="contact" /> Contact us and learn more</a>
              </div>
            </div>
          </form>
        </div>

        <Footer />
      </main>
    );
  }
}

export default Signup;
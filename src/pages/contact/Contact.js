import React, { Component } from "react";
import Footer from '../../components/elements/Footer';

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

  render() {

    return (

      <main class="logincontainer contactqueries">
         <div class="login_outer center_login_page">
            <form>
               <div class="login_page clearfix">
                  <div class="loginbody">
                     <a href="#" class="logo_login"><img src="images/redlogo.png" alt="logo"/></a>
                     <p class="logac">Please ask your queries</p>
                     <div class="form-group">
                        <input type="text" placeholder="First Name" class="form-control" />
                     </div>
                     <div class="form-group">
                        <input type="text" placeholder="Last Name" class="form-control" />
                     </div>
                     <div class="form-group"> 
                        <textarea placeholder="Message" class="form-control"></textarea>
                     </div>
                     <div class="form-group">
                        <div class="squecheckbox d-flex align-items-center">
                           <label>
                             <input type="checkbox" data-ng-model="example.check" />
                             <span class="box"></span>
                             I have read and accept the  <a href="#">Terms of sevice</a> &  <a href="#">Privacy Policy</a>
                           </label>
                          
                         </div>
                     </div>
                     <div class="form-group logbtnrow justify-content-between">
                        <a href="/login" class="btn btn-gray ripplelink"> Back</a>
                        <button class="btn btn-red ripplelink"> Submit</button>
                     </div>
                      
                  </div>
                  {/* <div class="loginfootpt contqueryfoot">
                     <a href="signup.html" class="btn-pt ripplelink">Register</a>
                     <a href="login.html" class="btn-pt ripplelink">Login Now</a>
                  </div> */}
               </div>
            </form>
         </div>

         <Footer />
      </main>
    )
  }
}

export default Login;
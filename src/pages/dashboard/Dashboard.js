import React from 'react';
import Header from '../../components/elements/Header';
import SideMenuData from '../../components/elements/SideMenuData';
import * as GlobalProvider from '../../providers/globals/globals';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

    setTimeout(() => {
      GlobalProvider.loadDashboardCharts();
    }, 100);
  }

  render() {

    return (
      <>
        <SideMenuData />

        <main className="admin-main">
          
          <Header />

          <section className="admin-content ">
            <div className="container py-5">

              <div className="row ">
                <div className="col-lg-8 col-md-12  ">
                  <div className="card bg-gray-900 m-b-30">
                    <div className="card-header text-white">
                      <h5 className="card-title m-b-0">Users Annual Retention Rate </h5>

                      <div className="card-controls">
                        <a href="#" className="js-card-refresh icon"></a>
                        <div className="dropdown">
                          <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="icon mdi  mdi-dots-vertical"></i> </a>

                          <div className="dropdown-menu dropdown-menu-right">
                            <button className="dropdown-item" type="button">Action</button>
                            <button className="dropdown-item" type="button">Another action</button>
                            <button className="dropdown-item" type="button">Something else here</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body bg-gray-900 rounded">
                      <div id="chart-02" className="invert-colors"></div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4  m-b-30 ">
                  {/* <!--widget card begin--> */}
                  <div className="card m-b-30">
                    <div className="card-header">
                      <h5 className="card-title m-b-0">Social Interactions</h5>

                      <div className="card-controls">
                        <a href="#" className="js-card-refresh icon"></a>
                        <div className="dropdown">
                          <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="icon mdi  mdi-dots-vertical"></i> </a>

                          <div className="dropdown-menu dropdown-menu-right">
                            <button className="dropdown-item" type="button">Action</button>
                            <button className="dropdown-item" type="button">Another action</button>
                            <button className="dropdown-item" type="button">Something else here</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="row p-t-15 ">
                        <div className="col-sm-6 my-auto ">
                          <h5 className="m-0">Total Sales <a href="#"
                            className="mdi mdi-information text-muted"></a></h5>
                        </div>

                      </div>
                      <div className="row p-t-10">
                        <div className="col-sm-6 my-auto ">
                          <h3 className="">$82.99</h3>
                        </div>
                        <div className="col-sm-6 my-auto  text-right ">
                          <h3 className="text-success"><i className="mdi mdi-arrow-up"></i> 2.6%</h3>
                        </div>
                      </div>

                      <ul className="list-group m-t-10">
                        <li
                          className="list-group-item list-group-item d-flex justify-content-between align-items-center">
                          <span>
                            <span className="d-block"> <i className="mdi mdi-facebook-box"></i> Facebook</span>
                          </span>
                          <span>
                            <span className="text-success d-block"> +15% </span>
                          </span>
                        </li>
                        <li
                          className="list-group-item list-group-item d-flex justify-content-between align-items-center">
                          <span>
                            <span className="d-block"> <i className="mdi mdi-instagram"></i> Instagram</span>
                          </span>
                          <span>
                            <span className="text-success d-block"> +36% </span>
                          </span>
                        </li>
                        <li
                          className="list-group-item list-group-item d-flex justify-content-between align-items-center">
                          <span>
                            <span className="d-block"> <i className="mdi mdi-twitter"></i> Twitter</span>
                          </span>
                          <span>
                            <span className="text-danger d-block"> -5% </span>
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="card-img">
                      <div id="chart-03"></div>

                    </div>
                  </div>

                </div>


              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="table-responsive bg-white shadow rounded">

                    <table className="table  table-hover align-td-middle">
                      <thead>
                        <tr>
                          <th>Role</th>
                          <th>Workspaces</th>
                          <th>Team</th>
                          <th>Active</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            Manager
                                        </td>
                          <td>
                            <div className="avatar-group">

                              <div className="avatar avatar-xs">
                                <span className="avatar-title rounded-circle">AB</span>
                              </div>
                              <div className="avatar avatar-xs">
                                <img className="avatar-img rounded-circle"
                                  src="assets/img/logos/tinder.jpg" alt="ML" />
                              </div>

                              <div className="avatar avatar-xs">
                                <span className="avatar-title bg-success rounded-circle">R</span>
                              </div>
                              <div className="avatar avatar-xs">
                                <img className="avatar-img rounded-circle"
                                  src="assets/img/logos/mailchimp.jpg" alt="ML" />
                              </div>
                            </div>

                          </td>
                          <td>
                            <div className="avatar-group">

                              <div className="avatar avatar-xs">
                                <span className="avatar-title rounded-circle">AB</span>
                              </div>
                              <div className="avatar avatar-xs">
                                <span className="avatar-title bg-primary rounded-circle">J</span>
                              </div>
                              <div className="avatar avatar-xs">
                                <span className="avatar-title bg-dark rounded-circle">H</span>
                              </div>
                              <div className="avatar avatar-xs">
                                <span className="avatar-title bg-success rounded-circle">B</span>
                              </div>
                              <div className="avatar avatar-xs">
                                <span className="avatar-title rounded-circle">5+</span>
                              </div>

                            </div>
                          </td>
                          <td>
                            <label className="cstm-switch">
                              <input type="checkbox" name="option" checked value="1"
                                className="cstm-switch-input" />
                              <span className="cstm-switch-indicator bg-success"></span>

                            </label>
                          </td>
                          <td className="text-center">
                            <a href="#" className="btn  btn-primary"> View</a>

                          </td>
                        </tr>
                        <tr>
                          <td>
                            Floor Manager
                                        </td>
                          <td>
                            <div className="avatar-group">

                              <div className="avatar avatar-xs">
                                <span className="avatar-title rounded-circle bg-success">X</span>
                              </div>
                              <div className="avatar avatar-xs">
                                <img className="avatar-img rounded-circle"
                                  src="assets/img/logos/americanexpress.jpg" alt="ML" />
                              </div>


                              <div className="avatar avatar-xs">
                                <img className="avatar-img rounded-circle"
                                  src="assets/img/logos/nytimes.jpg" alt="ML" />
                              </div>
                            </div>

                          </td>
                          <td>
                            <div className="avatar-group">

                              <div className="avatar avatar-xs">
                                <span className="avatar-title rounded-circle">R</span>
                              </div>
                              <div className="avatar avatar-xs">
                                <span className="avatar-title bg-info rounded-circle">CJ</span>
                              </div>
                              <div className="avatar avatar-xs">
                                <span className="avatar-title bg-warning rounded-circle">H</span>
                              </div>


                            </div>
                          </td>
                          <td>
                            <label className="cstm-switch">
                              <input type="checkbox" name="option" checked value="1"
                                className="cstm-switch-input" />
                              <span className="cstm-switch-indicator bg-success"></span>

                            </label>
                          </td>
                          <td className="text-center">
                            <a href="#" className="btn  btn-primary"> View</a>

                          </td>
                        </tr>
                        <tr>
                          <td>
                            Interns
                                        </td>
                          <td>
                            <div className="avatar-group">

                              <div className="avatar avatar-xs">
                                <span className="avatar-title bg-soft-danger rounded-circle">RD</span>
                              </div>
                              <div className="avatar avatar-xs">
                                <span className="avatar-title bg-soft-info rounded-circle">PF</span>
                              </div>
                              <div className="avatar avatar-xs">
                                <span className="avatar-title bg-soft-success rounded-circle">L</span>
                              </div>
                              <div className="avatar avatar-xs">
                                <span className="avatar-title bg-danger rounded-circle">V</span>
                              </div>
                              <div className="avatar avatar-xs">
                                <span className="avatar-title bg-dark rounded-circle">SM</span>
                              </div>


                            </div>

                          </td>
                          <td>
                            <div className="avatar-group">

                              <div className="avatar avatar-xs">
                                <span className="avatar-title bg-soft-warning rounded-circle">B</span>
                              </div>
                              <div className="avatar avatar-xs">
                                <span className="avatar-title bg-soft-success rounded-circle">U</span>
                              </div>

                              <div className="avatar avatar-xs">
                                <span className="avatar-title bg-soft-primary rounded-circle">LK</span>
                              </div>


                            </div>
                          </td>
                          <td>
                            <label className="cstm-switch">
                              <input type="checkbox" name="option" value="1"
                                className="cstm-switch-input" />
                              <span className="cstm-switch-indicator bg-success"></span>

                            </label>
                          </td>
                          <td className="text-center">
                            <a href="#" className="btn  btn-primary"> View</a>

                          </td>
                        </tr>
                        <tr>
                          <td>
                            Designers
                                        </td>
                          <td>
                            <div className="avatar-group">

                              <div className="avatar avatar-xs">
                                <span className="avatar-title bg-soft-warning rounded-circle">B</span>
                              </div>
                              <div className="avatar avatar-xs">
                                <span className="avatar-title bg-soft-success rounded-circle">U</span>
                              </div>
                              <div className="avatar avatar-xs">
                                <span className="avatar-title bg-soft-dark rounded-circle">U</span>
                              </div>
                              <div className="avatar avatar-xs">
                                <span className="avatar-title bg-soft-primary rounded-circle">LK</span>
                              </div>

                            </div>
                          </td>
                          <td>
                            <span className="text-muted">Not Assigned</span>

                          </td>

                          <td>
                            <label className="cstm-switch">
                              <input type="checkbox" disabled="" name="option" value="1"
                                className="cstm-switch-input" />
                              <span className="cstm-switch-indicator bg-success"></span>

                            </label>
                          </td>
                          <td className="text-center">
                            <a href="#" className="btn  btn-primary"> View</a>

                          </td>
                        </tr>
                        <tr>
                          <td>
                            Developers
                                        </td>
                          <td>
                            <div className="avatar-group">
                              <div className="avatar avatar-xs">
                                <span className="avatar-title bg-soft-danger rounded-circle">S</span>
                              </div>
                              <div className="avatar avatar-xs">
                                <span className="avatar-title bg-soft-secondary rounded-circle">E</span>
                              </div>
                              <div className="avatar avatar-xs">
                                <span className="avatar-title bg-soft-info rounded-circle">QW</span>
                              </div>
                              <div className="avatar avatar-xs">
                                <span className="avatar-title bg-soft-primary rounded-circle">V</span>
                              </div>

                              <div className="avatar avatar-xs">
                                <span className="avatar-title bg-soft-success rounded-circle">RE</span>
                              </div>
                            </div>

                          </td>
                          <td>
                            <div className="avatar-group">

                              <div className="avatar avatar-xs">
                                <span className="avatar-title bg-soft-warning rounded-circle">B</span>
                              </div>
                              <div className="avatar avatar-xs">
                                <span className="avatar-title bg-soft-success rounded-circle">U</span>
                              </div>

                              <div className="avatar avatar-xs">
                                <span className="avatar-title bg-soft-primary rounded-circle">LK</span>
                              </div>


                            </div>
                          </td>
                          <td>
                            <label className="cstm-switch">
                              <input type="checkbox" name="option" value="1"
                                className="cstm-switch-input" />
                              <span className="cstm-switch-indicator bg-success"></span>

                            </label>
                          </td>
                          <td className="text-center">
                            <a href="#" className="btn  btn-primary"> View</a>

                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                </div>
              </div>
            
            </div>
          </section>
        </main>

      </>
    );
  }
}

export default Dashboard;

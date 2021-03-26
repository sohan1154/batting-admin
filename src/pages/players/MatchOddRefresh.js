import React from 'react';
import * as GlobalProvider from '../../providers/globals/globals';
import Header from '../../components/elements/Header';
import RecordNotFound from '../../components/elements/RecordNotFound';
import * as ApisService from "../../providers/apis/apis";
import { Roller } from "react-awesome-spinners";
import SideMenuData from '../../components/elements/SideMenuData';
import 'react-responsive-modal/styles.css';

class MatchRefresh extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      entries: [],
      eventTypeId: "",
      matchType: "",
      markets: [],
      score: {
        home: {
          inning1: { runs: "", wickets: "", overs: "" },
          inning2: { runs: "", wickets: "", overs: "" },
          gameSequence: []
        },
        away: {
          inning1: { runs: "", wickets: "", overs: "" },
          inning2: { runs: "", wickets: "", overs: "" },
          gameSequence: []
        }
      },
      sessions: [],
      values: [],
      showResults: false,
      showStakes: false,
      staketype: "",
      stakesval: "",
      stakesvaltype: "",
      selectedStakeVal: "",
      errors: {},
      loading: false,
      currentUser: GlobalProvider.getUser(),
      open: false,
      stakes: {},
      disabled: true,
      marketbats: [],
      fancybats: [],
      market_wise_profit_loss_info: [{ profit_loss: "" }],
      session_wise_profit_loss_info: [],
      user_available_credit: ""
    }
  }

  componentDidMount() {

    let event_id = this.props.match.params.id;
    var data = JSON.parse(sessionStorage.getItem("user"));
    this.setState({ values: data.stakes });
    this.getMatchRefresh(event_id);
    this.getMatchBatlist(event_id);

  }
  onHideShow = () => {
    this.setState({ showResults: true });
  }
  onUpdate = () => {
    this.updateStake({ stakes: this.state.values });
  }

  updateStake(param) {

    const { currentUser } = this.state;

    this.setState({
      loading: true,
      errors: {},
    });

    ApisService.updateStakeData(param)
      .then(response => {

        if (response.status) {
          console.log(param);
          let userInfo = currentUser;
          userInfo.stakes = param.stakes;
          console.log('userInfo:', userInfo)
          // this.setState({values:userInfo.stakes});
          GlobalProvider.setUser(userInfo)
          GlobalProvider.successMessage(response.message);
          this.setState({ showResults: false });

        } else {

          GlobalProvider.errorMessage(response.message);
        }

      }).catch(error => {

        GlobalProvider.errorMessage(error);
      });
  }

  onShow = (type, value, valuetype, bat_type, event_id, marketId, selectionId, market_runner_id, isback) => {
    this.setState({ showStakes: true });
    this.setState({ staketype: type });
    this.setState({ stakesval: value });
    this.setState({ stakesvaltype: valuetype });
    this.setState({ selectedStakeVal: '' })

    this.setState({
      data: {
        "bat_type": bat_type,
        "event_id": event_id,
        "marketId": marketId,
        "selectionId": selectionId,
        "market_runner_id": market_runner_id,
        "odd_price": value,
        "is_back": isback
      }
    });


  }
  onShowSession = (type, value, valuetype, bat_type, event_id, selectionId, session_run, session_size, isback) => {
    this.setState({ showStakes: true });
    this.setState({ staketype: type });
    this.setState({ stakesval: value });
    this.setState({ stakesvaltype: valuetype });
    this.setState({ selectedStakeVal: '' })

    this.setState({
      datasession: {
        "bat_type": bat_type,
        "event_id": event_id,
        "selectionId": selectionId,
        "session_run": session_run,
        "session_size": session_size,
        "is_back": isback
      }
    });


  }

  onHideUpade = () => {
    console.log(this.state.fulldata.bat_type);
    console.log(this.state.fulldatasession.bat_type);
    if (this.state.fulldatasession.bat_type == "session") {
      this.newBatsAddon(this.state.fulldatasession);

    }
    else if (this.state.fulldata.bat_type == "odd") {
      this.newBatsAddon(this.state.fulldata);

    }

    //this.setState({ showStakes: false });
  }
  selectedStake = (val) => {
    this.setState({ selectedStakeVal: val });

    this.setState({ fulldata: { stack: val, ...this.state.data } });
    this.setState({ fulldatasession: { stack: val, ...this.state.datasession } });

    this.setState({ profit_loss: (((this.state.stakesval - 1) * val) - val) });

  }

  getMatchRefresh = (event_id) => {
    console.log(event_id);
    this.setState({
      loading: true,
      errors: {},
    });

    ApisService.GetMatchRefresh(event_id)
      .then(response => {

        if (response.status) {
          console.log(response.score.home);
          this.setState({
            loading: false,
            score: (response.score),
            eventTypeId: response.eventTypeId,
            matchType: response.matchType,
            markets: response.markets,
            sessions: response.sessions
          });
          this.getMatchScore(event_id);
        } else {

          this.setState({
            loading: false,
          });
          GlobalProvider.errorMessage(response.message);
        }

        GlobalProvider.loadDataTable();

      }).catch(error => {
        console.log(error);
        console.log("error");
        this.setState({
          loading: false,
        });
        GlobalProvider.errorMessage(error);
      });
  }

  getMatchBatlist = (event_id) => {

    this.setState({
      loading: true,
      errors: {},
    });

    ApisService.GetMatchbatoddSession(event_id)
      .then(response => {

        if (response.status) {
          this.setState({
            loading: false,
            marketbats: response.odds,
            fancybats: response.sessions
          });
        } else {

          this.setState({
            loading: false,
          });
          GlobalProvider.errorMessage(response.message);
        }

      }).catch(error => {

        this.setState({
          loading: false,
        });
        GlobalProvider.errorMessage(error);
      });
  }


  newBatsAddon = (params) => {
    console.log(params);
    this.setState({
      loading: true,
      errors: {},
    });
    ApisService.NewBatsAddon(params)
      .then(response => {
        if (response.status) {
          this.getMatchBatlist(params.event_id);
          GlobalProvider.successMessage(response.message);
          this.setState({ showStakes: false });
        } else {
          GlobalProvider.errorMessage(response.message);
        }

      }).catch(error => {

        GlobalProvider.errorMessage(error);
      });
  }



  getMatchScore = (event_id) => {

    this.setState({
      loading: true,
      errors: {},
    });

    ApisService.GetMatchscore(event_id)
      .then(response => {

        if (response.status) {
          this.setState({
            loading: false,
            market_wise_profit_loss_info: response.market_wise_profit_loss_info,
            session_wise_profit_loss_info: response.session_wise_profit_loss_info,
            user_available_credit: response.user_available_credit
          });
        } else {

          this.setState({
            loading: false,
          });
          GlobalProvider.errorMessage(response.message);
        }

      }).catch(error => {

        this.setState({
          loading: false,
        });
        GlobalProvider.errorMessage(error);
      });
  }

  creaditAmount() {

  }
  handleSubmit(event) {
    event.preventDefault();
  }
  handleChange(i, event) {
    let values = [...this.state.values];
    values[i] = event.target.value;
    this.setState({ values });
  }
  render() {
    const { user_available_credit, market_wise_profit_loss_info, session_wise_profit_loss_info, marketbats, fancybats, score, eventTypeId, matchType, sessions, markets, loading, values, open, errors, stakesval, value, staketype, stakesvaltype, selectedStakeVal } = this.state;
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
                    <h4 className="">
                      {
                        (eventTypeId == 4) ?
                          <h3>Cricket</h3> : (eventTypeId == 2) ? <h3>Tennis</h3> : <h3>Soccer</h3>

                      }
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="row">

                <div className="col-md-8">
                  {loading && <div className="center"><Roller /></div>}
                  {
                    (eventTypeId == 4) ?
                      <div className="container  pull-up">
                        <div className="row">
                          <div className="col-12">
                            <div className="card">

                              <div className="card-body">
                                <div className="table-responsive p-t-10">

                                  <nav className="navbar navbar-light bg-light">
                                    <span > {score.home.name} v {score.away.name}</span>

                                  </nav>
                                  <div className="container">
                                    <div className="row" style={{ innerHeight: '20px' }}>
                                      {(score.home.inning1 != undefined && score.home.inning2 == undefined) ?
                                        <div className="col"><p style={{ marginTop: "15px" }}> <span>{score.home.name} - </span>
                                          <span>
                                            {
                                              score.home.inning1.runs
                                            }/{score.home.inning1.wickets} ({score.home.inning1.overs})
                                                        </span>
                                        </p></div> : (score.home.inning1 == undefined) ?
                                          <div className="col"><p style={{ marginTop: "15px" }}> <span>{score.home.name} - </span>
                                            <span>
                                              {
                                                0
                                              }/{0} ({0})
                                                        </span> </p></div> :

                                          (score.home.inning1 != undefined && score.home.inning2 != undefined) ?
                                            <div className="col" style={{ fontSize: "smaller" }}><p style={{ marginTop: "15px" }}> <span>{score.home.name} - </span>
                                              <span>
                                                {
                                                  score.home.inning2.runs
                                                }/{score.home.inning2.wickets} ({score.home.inning2.overs})
                                                        </span>
                                              <span>
                                                {
                                                  score.home.inning1.runs
                                                }/{score.home.inning1.wickets} ({score.home.inning1.overs})
                                                        </span>
                                            </p></div> : null


                                      }


                                      {(score.away.inning1 != undefined && score.away.inning2 == undefined) ?
                                        <div className="col"><p style={{ marginTop: "15px" }}> <span>{score.away.name} - </span>
                                          <span>
                                            {
                                              score.away.inning1.runs
                                            }/{score.away.inning1.wickets} ({score.away.inning1.overs})
                                                        </span>
                                        </p></div> : (score.away.inning1 == undefined) ?
                                          <div className="col"><p style={{ marginTop: "15px" }}> <span>{score.away.name} - </span>
                                            <span>
                                              {
                                                0
                                              }/{0} ({0})
                                                        </span> </p></div> :

                                          (score.away.inning1 != undefined && score.away.inning2 != undefined) ?
                                            <div className="col" style={{ fontSize: "smaller" }}><p style={{ marginTop: "15px" }}> <span>{score.away.name} - </span>
                                              <span>
                                                {
                                                  score.away.inning2.runs
                                                }/{score.away.inning2.wickets} ({score.away.inning2.overs})
                                                        </span>
                                              <span>
                                                {
                                                  score.away.inning1.runs
                                                }/{score.away.inning1.wickets} ({score.away.inning1.overs})
                                                        </span>
                                            </p></div> : null


                                      }
                                    </div>
                                  </div>


                                  {/* Match Odd Start */}
                                  {!loading && markets.length == 0 && <RecordNotFound />}
                                  {markets.length > 0 &&
                                    <div className="container">
                                      <div className="row">
                                        <div className="col-12">
                                          <div className="card">

                                            <div className="card-body">
                                              <div className="table-responsive p-t-10">
                                                {markets[0] != undefined &&
                                                  <table id="listingTable" className="table " style={{ width: "100%" }}>
                                                    <thead>
                                                      <tr>
                                                        <th>{markets[0].marketName}</th>
                                                        <th colSpan="2" style={{ textAlign: "right" }}>Back</th>
                                                        <th colSpan="2" style={{ textAlign: "center" }}></th>
                                                        <th colSpan="2" >Lay</th>
                                                      </tr>
                                                    </thead>
                                                    <tbody>

                                                      {markets[0].runners.map((item, index) =>
                                                        <tr key={item.market_runner_id} id={'RecordID_' + item.market_runner_id}>

                                                          <td style={{ width: '40%' }}> {item.runnerName}
                                                            {<p>[ {(typeof market_wise_profit_loss_info[item.market_runner_id] !== 'undefined' && market_wise_profit_loss_info[item.market_runner_id].profit_loss)} ] </p>}
                                                            <p></p>
                                                          </td>

                                                          {
                                                            item.prices.map((val, index) =>
                                                              (index < 2) ?
                                                                <td className="td_bg_bluelight" style={{ textAlign: "center" }}>{val.price}<p>{val.size}</p></td>
                                                                : (index == 2) ?

                                                                  <td className="td_bg_blue pointer" onClick={() => this.onShow(item.runnerName, val.price, "Back", "odd", markets[0].event_id, markets[0].marketId, item.selectionId, item.market_runner_id, 1)} style={{ textAlign: "center" }}>{val.price}<p>{val.size}</p></td>

                                                                  : (index == 3) ?

                                                                    <td className="td_bg_pink pointer" onClick={() => this.onShow(item.runnerName, val.price, "Lay", "odd", markets[0].event_id, markets[0].marketId, item.selectionId, item.market_runner_id, 0)} style={{ textAlign: "center" }}>{val.price}<p>{val.size}</p></td>

                                                                    : <td className="td_bg_pinklight" style={{ textAlign: "center" }}>{val.price}<p>{val.size}</p></td>


                                                            )

                                                          }
                                                        </tr>
                                                      )}


                                                    </tbody>
                                                  </table>
                                                }{markets[1] != undefined &&
                                                  <table id="listingTable1" className="table " style={{ width: "100%" }}>
                                                    <thead>
                                                      <tr>
                                                        <th>{markets[1].marketName}</th>
                                                        <th colSpan="2" style={{ textAlign: "right" }}>Back</th>
                                                        <th colSpan="2" style={{ textAlign: "center" }}></th>
                                                        <th colSpan="2" >Lay</th>
                                                      </tr>
                                                    </thead>
                                                    <tbody>

                                                      {markets[1].runners.map((item, index) =>
                                                        <tr key={item.market_runner_id} id={'RecordID_' + item.market_runner_id}>
                                                          <td style={{ width: '40%' }}> {item.runnerName}</td>

                                                          {
                                                            item.prices.map((val, index) =>
                                                              (index < 2) ?
                                                                <td className="td_bg_bluelight" style={{ textAlign: "center" }}>{val.price}<p>{val.size}</p></td>
                                                                : (index == 2) ?
                                                                  <td className="td_bg_blue pointer" onClick={() => this.onShow(item.runnerName, val.price, "Back", "odd", markets[1].event_id, markets[1].marketId, item.selectionId, item.market_runner_id, 1)} style={{ textAlign: "center" }}>{val.price}<p>{val.size}</p></td>
                                                                  : (index == 3) ?
                                                                    <td className="td_bg_pink pointer" onClick={() => this.onShow(item.runnerName, val.price, "Lay", "odd", markets[1].event_id, markets[1].marketId, item.selectionId, item.market_runner_id, 0)} style={{ textAlign: "center" }}>{val.price}<p>{val.size}</p></td>
                                                                    : <td className="td_bg_pinklight" style={{ textAlign: "center" }}>{val.price}<p>{val.size}</p></td>


                                                            )

                                                          }
                                                        </tr>
                                                      )}



                                                    </tbody>
                                                  </table>
                                                }{markets[2] != undefined && <table id="listingTable2" className="table " style={{ width: "100%" }}>
                                                  <thead>
                                                    <tr>
                                                      <th>{markets[2].marketName}</th>
                                                      <th colSpan="2" style={{ textAlign: "right" }}>Back</th>
                                                      <th colSpan="2" style={{ textAlign: "center" }}></th>
                                                      <th colSpan="2" >Lay</th>
                                                    </tr>
                                                  </thead>
                                                  <tbody>

                                                    {markets[2].runners.map((item, index) =>
                                                      <tr key={item.market_runner_id} id={'RecordID_' + item.market_runner_id}>
                                                        <td style={{ width: '40%' }}> {item.runnerName}</td>

                                                        {
                                                          item.prices.map((val, index) =>
                                                            (index < 2) ?
                                                              <td className="td_bg_bluelight" style={{ textAlign: "center" }}>{val.price}<p>{val.size}</p></td>
                                                              : (index == 2) ?
                                                                <td className="td_bg_blue pointer" onClick={() => this.onShow(item.runnerName, val.price, "Back", "odd", markets[2].event_id, markets[2].marketId, item.selectionId, item.market_runner_id, 1)} style={{ textAlign: "center" }}>{val.price}<p>{val.size}</p></td>
                                                                : (index == 3) ?
                                                                  <td className="td_bg_pink pointer" onClick={() => this.onShow(item.runnerName, val.price, "Lay", "odd", markets[2].event_id, markets[2].marketId, item.selectionId, item.market_runner_id, 0)} style={{ textAlign: "center" }}>{val.price}<p>{val.size}</p></td>
                                                                  : <td className="td_bg_pinklight" style={{ textAlign: "center" }}>{val.price}<p>{val.size}</p></td>


                                                          )

                                                        }
                                                      </tr>
                                                    )}



                                                  </tbody>
                                                </table>
                                                }


                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  }

                                  {/* Match Odd End */}
                                  {/* Match Session Start */}
                                  {sessions.length > 0 &&

                                    <div className="container">
                                      <div className="row">
                                        <div className="col-12">
                                          <div className="card">

                                            <div className="card-body">
                                              <div className="table-responsive p-t-10">
                                                <p>Session Runs</p>

                                                <div className="row" style={{ width: '99%' }}>
                                                  <div className="col-7"></div>
                                                  <div className="col">No</div>
                                                  <div className="col">Yes</div>
                                                </div>
                                                <div className="container">
                                                  {sessions.map((item, index) =>

                                                    <div className="row" key={item.session_id} id={'RecordID_' + item.session_id}>
                                                      <div className="col sessionlist" >
                                                        {item.RunnerName} 
                                                        <span><i className="icon-placeholder pointer sessionicon mdi mdi-view-list" data-toggle="collapse" data-target={"#multiCollapseExample" + index} aria-expanded="false" aria-controls={"multiCollapseExample" + index}></i></span>
                                                        {<p className="textRed">{(typeof session_wise_profit_loss_info[item.session_id] !== 'undefined' && 'Max Exposure: ' + session_wise_profit_loss_info[item.session_id].max_exposure)}</p>}
                                                      </div>

                                                      <div className="col">
                                                        <div className="container">

                                                          <div className="row">
                                                            <div className="col pointer sessionlist trpink" onClick={() => this.onShowSession(item.runnerName, 10, "Lay", "session", item.event_id, item.SelectionId, item.LayPrice1, item.LaySize1, 0)}>{item.LayPrice1}<p>{item.LaySize1}</p></div>
                                                            <div className="col pointer sessionlist trblue" onClick={() => this.onShowSession(item.runnerName, 10, "Back", "session", item.event_id, item.SelectionId, item.BackPrice1, item.BackSize1, 1)}>{item.BackPrice1}<p>{item.BackSize1}</p></div>
                                                          </div>
                                                        </div>

                                                        {(typeof session_wise_profit_loss_info[item.session_id] !== 'undefined') ?
                                                          <>
                                                            <table style={{ width: '100%' }} className="matchodd collapse multi-collapse" id={"multiCollapseExample" + index}>
                                                              <thead>
                                                                <tr>
                                                                  <th scope="col">Runs</th>
                                                                  <th scope="col">P&L</th>
                                                                </tr>
                                                              </thead>
                                                              <tbody>
                                                                {session_wise_profit_loss_info[item.session_id].bats.map((item3, index3) =>
                                                                  <tr className="trdarkwhite">
                                                                    <td>{item3[0]}</td>
                                                                    <td>{item3[1]}</td>
                                                                  </tr>
                                                                )}
                                                              </tbody>
                                                            </table>
                                                          </>
                                                          : null

                                                        }

                                                      </div>
                                                    </div>

                                                  )}
                                                </div>


                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  }
                                  {/* Match Session End */}

                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      : (eventTypeId == 2) ?
                        <div className="container  pull-up">
                          {(score.length !== 0) ?
                            <div className="row">
                              <div className="col-12">
                                <div className="card">

                                  <div className="card-body">
                                    <div className="table-responsive p-t-10">
                                      <nav className="navbar navbar-light bg-light">
                                        <span > {score.home.name} v {score.away.name}</span>

                                      </nav>


                                      <table id="listingTable" className="table " style={{ width: "50%", float: 'right' }}>

                                        <tbody>


                                          <tr>
                                            {(score.home.highlight == true) ?
                                              <td style={{ width: '40%', color: 'green' }}> {score.home.name} </td> :
                                              <td style={{ width: '40%' }}> {score.home.name} </td>

                                            }
                                            {
                                              score.home.gameSequence.map((item, index) =>
                                                <td style={{ textAlign: "center" }}>{item}</td>

                                              )
                                            }
                                            <td style={{ textAlign: "center" }}>{score.home.games}</td>

                                            <td style={{ textAlign: "center" }}>{score.home.score}</td>


                                          </tr>
                                          <tr>
                                            {(score.away.highlight == true) ?
                                              <td style={{ width: '40%', color: 'green' }}> {score.away.name}* </td> :
                                              <td style={{ width: '40%' }}> {score.away.name} </td>

                                            }
                                            {
                                              score.away.gameSequence.map((item, index) =>
                                                <td style={{ textAlign: "center" }}>{item}</td>

                                              )
                                            }
                                            <td style={{ textAlign: "center" }}>{score.away.games}</td>

                                            <td style={{ textAlign: "center" }}>{score.away.score}</td>


                                          </tr>


                                        </tbody>
                                      </table>

                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div> : null
                          }
                          {!loading && markets.length == 0 && <RecordNotFound />}
                          {markets.length > 0 &&
                            <div className="container">
                              <div className="row">
                                <div className="col-12">
                                  <div className="card">

                                    <div className="card-body">
                                      <div className="table-responsive p-t-10">
                                        {markets[0] != undefined &&
                                          <table id="listingTable" className="table " style={{ width: "100%" }}>
                                            <thead>
                                              <tr>
                                                <th>{markets[0].marketName}</th>
                                                <th colSpan="2" style={{ textAlign: "right" }}>Back</th>
                                                <th colSpan="2" style={{ textAlign: "center" }}></th>
                                                <th colSpan="2" >Lay</th>
                                              </tr>
                                            </thead>
                                            <tbody>

                                              {markets[0].runners.map((item, index) =>
                                                <tr key={item.market_runner_id} id={'RecordID_' + item.market_runner_id}>
                                                  <td style={{ width: '40%' }}> {item.runnerName}</td>

                                                  {
                                                    item.prices.map((val, index) =>
                                                      (index < 2) ?
                                                        <td className="td_bg_bluelight" style={{ textAlign: "center" }}>{val.price}<p>{val.size}</p></td>
                                                        : (index == 2) ?
                                                          <td className="td_bg_blue" style={{ textAlign: "center" }}>{val.price}<p>{val.size}</p></td>
                                                          : (index == 3) ?
                                                            <td className="td_bg_pink" style={{ textAlign: "center" }}>{val.price}<p>{val.size}</p></td>
                                                            : <td className="td_bg_pinklight" style={{ textAlign: "center" }}>{val.price}<p>{val.size}</p></td>

                                                    )

                                                  }
                                                </tr>
                                              )}
                                            </tbody>
                                          </table>
                                        }
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </div>
                          }
                        </div> : (eventTypeId == 1) ?
                          <div className="container  pull-up"> {score.length}
                            {(score.length !== 0) ?
                              <div className="row">
                                <div className="col-12">
                                  <div className="card">

                                    <div className="card-body">
                                      <div className="table-responsive p-t-10">
                                        <nav className="navbar navbar-light bg-light">
                                          <span > {score.home.name} v {score.away.name}</span>

                                        </nav>

                                        {(score.length !== 0) ?
                                          <table id="listingTable" className="table " style={{ width: "50%", float: 'right' }}>

                                            <tbody>


                                              <tr>
                                                <td style={{ width: '40%' }}> {score.home.name} </td>
                                                <td style={{ textAlign: "center" }}>{score.home.score}</td>


                                              </tr>
                                              <tr>
                                                <td style={{ width: '40%' }}> {score.away.name} </td>
                                                <td style={{ textAlign: "center" }}>{score.away.score}</td>


                                              </tr>


                                            </tbody>
                                          </table>
                                          : null
                                        }

                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div> : null
                            }
                            {!loading && markets.length == 0 && <RecordNotFound />}
                            {markets.length > 0 &&
                              <div className="container">
                                <div className="row">
                                  <div className="col-12">
                                    <div className="card">

                                      <div className="card-body">
                                        <div className="table-responsive p-t-10">
                                          {markets[2] != undefined &&
                                            <table id="listingTable" className="table " style={{ width: "100%" }}>
                                              <thead>
                                                <tr>
                                                  <th>{markets[2].marketName}</th>
                                                  <th colSpan="2" style={{ textAlign: "right" }}>Back</th>
                                                  <th colSpan="2" style={{ textAlign: "center" }}></th>
                                                  <th colSpan="2" >Lay</th>
                                                </tr>
                                              </thead>
                                              <tbody>

                                                {markets[2].runners.map((item, index) =>
                                                  <tr key={item.market_runner_id} id={'RecordID_' + item.market_runner_id}>
                                                    <td style={{ width: '40%' }}> {item.runnerName}</td>

                                                    {
                                                      item.prices.map((val, index) =>
                                                        (index < 2) ?
                                                          <td className="td_bg_bluelight" style={{ textAlign: "center" }}>{val.price}<p>{val.size}</p></td>
                                                          : (index == 2) ?
                                                            <td className="td_bg_blue" style={{ textAlign: "center" }}>{val.price}<p>{val.size}</p></td>
                                                            : (index == 3) ?
                                                              <td className="td_bg_pink" style={{ textAlign: "center" }}>{val.price}<p>{val.size}</p></td>
                                                              : <td className="td_bg_pinklight" style={{ textAlign: "center" }}>{val.price}<p>{val.size}</p></td>


                                                      )

                                                    }
                                                  </tr>
                                                )}



                                              </tbody>
                                            </table>
                                          }


                                          {markets[1] != undefined &&
                                            <table id="listingTable11" className="table " style={{ width: "100%" }}>
                                              <thead>
                                                <tr>
                                                  <th>{markets[1].marketName}</th>
                                                  <th colSpan="2" style={{ textAlign: "right" }}>Back</th>
                                                  <th colSpan="2" style={{ textAlign: "center" }}></th>
                                                  <th colSpan="2" >Lay</th>
                                                </tr>
                                              </thead>
                                              <tbody>

                                                {markets[1].runners.map((item, index) =>
                                                  <tr key={item.market_runner_id} id={'RecordID_' + item.market_runner_id}>
                                                    <td style={{ width: '40%' }}> {item.runnerName}</td>

                                                    {
                                                      item.prices.map((val, index) =>
                                                        (index < 2) ?
                                                          <td className="td_bg_bluelight" style={{ textAlign: "center" }}>{val.price}<p>{val.size}</p></td>
                                                          : (index == 2) ?
                                                            <td className="td_bg_blue" style={{ textAlign: "center" }}>{val.price}<p>{val.size}</p></td>
                                                            : (index == 3) ?
                                                              <td className="td_bg_pink" style={{ textAlign: "center" }}>{val.price}<p>{val.size}</p></td>
                                                              : <td className="td_bg_pinklight" style={{ textAlign: "center" }}>{val.price}<p>{val.size}</p></td>


                                                      )

                                                    }
                                                  </tr>
                                                )}



                                              </tbody>
                                            </table>
                                          }
                                          {markets[0] != undefined &&
                                            <table id="listingTable111" className="table " style={{ width: "100%" }}>
                                              <thead>
                                                <tr>
                                                  <th>{markets[0].marketName}</th>
                                                  <th colSpan="2" style={{ textAlign: "right" }}>Back</th>
                                                  <th colSpan="2" style={{ textAlign: "center" }}></th>
                                                  <th colSpan="2" >Lay</th>
                                                </tr>
                                              </thead>
                                              <tbody>

                                                {markets[0].runners.map((item, index) =>
                                                  <tr key={item.market_runner_id} id={'RecordID_' + item.market_runner_id}>
                                                    <td style={{ width: '40%' }}> {item.runnerName}</td>

                                                    {
                                                      item.prices.map((val, index) =>
                                                        (index < 2) ?
                                                          <td className="td_bg_bluelight" style={{ textAlign: "center" }}>{val.price}<p>{val.size}</p></td>
                                                          : (index == 2) ?
                                                            <td className="td_bg_blue" style={{ textAlign: "center" }}>{val.price}<p>{val.size}</p></td>
                                                            : (index == 3) ?
                                                              <td className="td_bg_pink" style={{ textAlign: "center" }}>{val.price}<p>{val.size}</p></td>
                                                              : <td className="td_bg_pinklight" style={{ textAlign: "center" }}>{val.price}<p>{val.size}</p></td>


                                                      )

                                                    }
                                                  </tr>
                                                )}



                                              </tbody>
                                            </table>
                                          }

                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                              </div>
                            }
                          </div> : null


                  }

                </div>
                <div className="col-md-4">
                  <div className="container  pull-up">
                    <div className="row">
                      <div className="col-12">
                        <div className="card">
                          <nav class="navbar navbar-light bg-light">
                            <a class="navbar-brand">Available Credits ({this.state.user_available_credit})</a>
                          </nav>
                          <div className="card-body">
                            <div className="table-responsive p-t-10">

                              <div style={{ marginBottom: "10px" }}>
                                <button type="button" class="btn btn-light">Open Bets</button>
                                <button type="button" class="btn btn-success" style={{ float: 'right' }} onClick={this.onHideShow}>Edit Stakes</button>
                              </div>
                              {
                                this.state.showResults == true &&
                                <div>
                                  {values.map((item, index) =>

                                    <div key={index} class="form-group">
                                      <div class="col-xs-1">
                                        <input class="form-control" value={item || ''} onChange={this.handleChange.bind(this, index)} type="text" />
                                      </div>
                                    </div>
                                  )}
                                  <button type="button" class="btn btn-light">Cancel</button>
                                  <button type="button" class="btn btn-success" style={{ float: 'right' }} onClick={this.onUpdate}>Update</button>
                                </div>
                              }


                              {this.state.showStakes == true &&
                                <div>
                                  {(stakesvaltype == "Back") &&
                                    <div>
                                      <div style={{ width: '7px', height: '7px', position: 'relative', top: '15px' }} className="div_bg_blue"></div><p style={{ marginLeft: '10px' }}>{stakesvaltype}</p>

                                      <div className="div_bg_blue">
                                        <div style={{ width: '80%', margin: "auto" }}>
                                          <div class="form-group">
                                            <div class="col-xs-1">
                                              {this.state.staketype} Odds <input class="form-control" value={this.state.stakesval || ''} type="text" />
                                            </div>
                                          </div>
                                          <div class="form-group">
                                            <div class="col-xs-1">
                                              Stakes  <input class="form-control" value={this.state.selectedStakeVal || ''} type="text" />
                                            </div>
                                          </div>
                                                   profit <p>{this.state.profit_loss}</p>


                                          {values.map((item, index) =>

                                            <div class="btn-group" key={index} role="group" aria-label="Basic example">
                                              <button type="button" class="btn btn-dark" onClick={() => this.selectedStake(item)}>{item}</button>
                                            </div>
                                          )}
                                          <div style={{ marginTop: "5px" }}>
                                            <button type="button" class="btn btn-light">Cancel</button>
                                            <button type="button" class="btn btn-success" style={{ float: 'right' }} onClick={this.onHideUpade}>Place Bets</button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  }
                                  {(stakesvaltype == "Lay") &&

                                    <div>
                                      <div style={{ width: '7px', height: '7px', position: 'relative', top: '15px' }} className="div_bg_pink"></div><p style={{ marginLeft: '10px' }}>{stakesvaltype}</p>

                                      <div className="div_bg_pink">
                                        <div style={{ width: '80%', margin: "auto" }}>
                                          <div class="form-group">
                                            <div class="col-xs-1">
                                              {this.state.staketype} Odds <input class="form-control" value={this.state.stakesval || ''} type="text" />
                                            </div>
                                          </div>
                                          <div class="form-group">
                                            <div class="col-xs-1">
                                              Stakes  <input class="form-control" value={this.state.selectedStakeVal || ''} type="text" />
                                            </div>
                                          </div>
                                                   Liability <p>0.00</p>


                                          {values.map((item, index) =>

                                            <div class="btn-group" key={index} role="group" aria-label="Basic example">
                                              <button type="button" class="btn btn-secondary" onClick={() => this.selectedStake(item)}>{item}</button>
                                            </div>
                                          )}
                                          <div style={{ marginTop: "5px" }}>
                                            <button type="button" class="btn btn-light">Cancel</button>
                                            <button type="button" class="btn btn-success" style={{ float: 'right' }} onClick={this.onHideUpade}>Place Bets</button>
                                          </div>
                                        </div>
                                      </div>

                                    </div>
                                  }

                                </div>
                              }



                            </div>

                          </div>
                        </div>
                      </div>
                      {/* Listing Session or Market */}
                      <div className="col-12">

                        <div class="accordion" id="accordionExample">
                          <div class="card">
                            <div class="card-header" id="headingOne">
                              <h2 class="mb-0">
                                <a class="btn-link collapsed" style={{ fontSize: '18px' }} data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                  Un-match bets(0)
        </a>
                              </h2>
                            </div>

                            <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                              <div class="card-body">

                              </div>
                            </div>
                          </div>
                          <div class="card">
                            <div class="card-header" id="headingTwo">
                              <h2 class="mb-0">
                                <a class="btn-link collapsed" style={{ fontSize: '18px' }} data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                  Match Bets ({marketbats.length > 0 ? marketbats.length : 0})
        </a>
                              </h2>
                            </div>
                            {marketbats.length > 0 &&
                              <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                <div class="card-body">


                                  <table className="matchodd">
                                    <thead>
                                      <tr>
                                        <th scope="col">Sr.No</th>
                                        <th scope="col" style={{ width: '60%' }}>Runner Name</th>
                                        <th scope="col">Odds</th>
                                        <th scope="col">Stakes</th>
                                        <th scope="col">P&L</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {
                                        marketbats.map((item, index) =>

                                          (item.is_back === 1) ?
                                            <tr className="trblue" key={item.bat_id}>
                                              <td style={{ width: '10%' }}>{index + 1}</td>
                                              <td style={{ width: '60%' }}>{item.runnerName} <p style={{ margin: '0' }}>{item.getFormatedDate}</p></td>
                                              <td style={{ width: '10%' }}>{item.odds}</td>
                                              <td style={{ width: '10%' }}>{item.stack}</td>
                                              <td style={{ width: '10%' }}>{item.profit_loss}</td>
                                            </tr> : (item.is_back === 0) ?
                                              <tr className="trpink" key={item.bat_id}>
                                                <td style={{ width: '10%' }}>{index + 1}</td>
                                                <td style={{ width: '60%' }}>{item.runnerName} <p style={{ margin: '0' }}>{item.getFormatedDate}</p></td>
                                                <td style={{ width: '10%' }}>{item.odds}</td>
                                                <td style={{ width: '10%' }}>{item.stack}</td>
                                                <td style={{ width: '10%' }}>-{item.profit_loss}</td>
                                              </tr> : null

                                        )
                                      }

                                    </tbody>
                                  </table>

                                </div>
                              </div>
                            }

                          </div>
                          <div class="card">
                            <div class="card-header" id="headingThree">
                              <h2 class="mb-0">
                                <a class="btn-link collapsed" style={{ fontSize: '18px' }} data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                  Fancy Bets ({fancybats.length > 0 ? fancybats.length : 0})
        </a>
                              </h2>
                            </div>
                            <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                              <div class="card-body">

                                <table className="matchodd">
                                  <thead>
                                    <tr>
                                      <th scope="col">Sr.No</th>
                                      <th scope="col" style={{ width: '60%' }}>Runner Name</th>
                                      <th scope="col">Runs</th>
                                      <th scope="col">Stakes</th>
                                      <th scope="col">P&L</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {
                                      fancybats.map((item, index) =>
                                        (item.is_back === 1) ?
                                          <tr className="trblue" key={item.bat_id}>
                                            <td style={{ width: '10%' }}>{index + 1}</td>
                                            <td style={{ width: '60%' }}>{item.runnerName} <p style={{ margin: '0' }}>{item.getFormatedDate}</p></td>
                                            <td style={{ width: '10%' }}>{item.session_run}</td>
                                            <td style={{ width: '10%' }}>{item.stack}</td>
                                            <td style={{ width: '10%' }}>{item.profit_loss}</td>
                                          </tr> : (item.is_back === 0) ?
                                            <tr className="trpink" key={item.bat_id}>
                                              <td style={{ width: '10%' }}>{index + 1}</td>
                                              <td style={{ width: '60%' }}>{item.runnerName} <p style={{ margin: '0' }}>{item.getFormatedDate}</p></td>
                                              <td style={{ width: '10%' }}>{item.session_run}</td>
                                              <td style={{ width: '10%' }}>{item.stack}</td>
                                              <td style={{ width: '10%' }}>-{item.profit_loss}</td>
                                            </tr> : null
                                      )
                                    }
                                  </tbody>
                                </table>


                              </div>
                            </div>
                          </div>
                        </div>



                      </div>

                    </div>
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

export default MatchRefresh;
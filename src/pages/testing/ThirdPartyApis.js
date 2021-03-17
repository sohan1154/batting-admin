import React from 'react';
import * as GlobalProvider from '../../providers/globals/globals';
import Header from '../../components/elements/Header';
import Pagenation from '../../components/elements/Pagenation';
import RecordNotFound from '../../components/elements/RecordNotFound';
import * as ApisService from "../../providers/apis/apis";
import { Roller } from "react-awesome-spinners";
import SideMenuData from '../../components/elements/SideMenuData';
import queryString from 'query-string'

class ThirdPartyApis extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            entries: [],
            errors: {},
            loading: false,
            currentUser: GlobalProvider.getUser(),
        }
    }

    componentDidMount() {

        let params = queryString.parse(this.props.location.search)
        console.log(params.api);

        switch(params.api) {
            case 'sports' :
                // call-third-party-apis?api=sports
                this.getSports();
                break;
            case 'series' :
                // call-third-party-apis?api=series&sportsID=4
                this.getSeries(params.sportsID);
                break;                
            case 'matches' :
                // call-third-party-apis?api=matches&sportsID=4&seriesID=11893330
                this.getMatches(params.sportsID, params.seriesID);
                break;
            case 'markets' :
                // call-third-party-apis?api=markets&eventID=29993410
                this.getMarkets(params.eventID);
                break;
            case 'markets-selection' :
                // call-third-party-apis?api=markets-selection&marketID=1.172716521
                this.getMarketsSelection(params.marketID);
                break;
            case 'market-odds' :
                // call-third-party-apis?api=market-odds&marketID=1.172716521
                this.getMarketOdds(params.marketID);
                break;
            case 'session' :
                // call-third-party-apis?api=session&matchID=4
                this.getSession(params.matchID);
                break;
            case 'score' :
                // call-third-party-apis?api=score&matchID=4
                this.getScore(params.matchID);
                break;
            default :
                console.log('Please pass proper api url')
        }
    }

    getSports = () => {

        this.setState({
            loading: true,
            errors: {},
        });

        ApisService.callThirtPartyAPI_getSports()
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

    getSeries = (sportsID) => {

        this.setState({
            loading: true,
            errors: {},
        });

        ApisService.callThirtPartyAPI_getSeries(sportsID)
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

    getMatches = (sportsID, seriesID) => {

        this.setState({
            loading: true,
            errors: {},
        });

        ApisService.callThirtPartyAPI_getMatches(sportsID, seriesID)
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

    getMarkets = (eventID) => {

        this.setState({
            loading: true,
            errors: {},
        });

        ApisService.callThirtPartyAPI_getMarkets(eventID)
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

    getMarketsSelection = (marketID) => {

        this.setState({
            loading: true,
            errors: {},
        });

        ApisService.callThirtPartyAPI_getMarketsSelection(marketID)
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

    getMarketOdds = (marketID) => {

        this.setState({
            loading: true,
            errors: {},
        });

        ApisService.callThirtPartyAPI_getMarketOdds(marketID)
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

    getSession = (matchID) => {

        this.setState({
            loading: true,
            errors: {},
        });

        ApisService.callThirtPartyAPI_getSession(matchID)
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

    getScore = (matchID) => {

        this.setState({
            loading: true,
            errors: {},
        });

        ApisService.callThirtPartyAPI_getScore(matchID)
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

    render() {

        const { entries, loading } = this.state;
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
                                        <h4 className="">External APIs</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {loading && <div className="center"><Roller /></div>}

                        {!loading && <p>API is called successfully.</p>}

                    </section>

                </main>

            </>
        );

    }
}

export default ThirdPartyApis;
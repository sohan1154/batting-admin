import React from 'react';
import * as GlobalProvider from '../../providers/globals/globals';
import Header from '../../components/elements/Header';
import RecordNotFound from '../../components/elements/RecordNotFound';
import * as ApisService from "../../providers/apis/apis";
import { Roller } from "react-awesome-spinners";
import SideMenuData from '../../components/elements/SideMenuData';
import 'react-responsive-modal/styles.css';

class PlayersInPlay extends React.Component {

    constructor(props) {
        super(props);
     
        this.state = {
            entries:  [],
            dataMarquee:[],
            errors: {},
            loading: false,
            currentUser: GlobalProvider.getUser(),
            open: false,
        }
    }

    componentDidMount() {
        this.getadvertisements();
        this.getInPlayMatch();
    }

    getInPlayMatch = () => {

        this.setState({
            loading: true,
            errors: {},
        });

        ApisService.getListMatchesInplay()
            .then(response => {

                if (response.status) {
                    console.log(response.data);
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
    getadvertisements  = () => {

        this.setState({
            loading: true,
            errors: {},
        });

        ApisService.getadvertisements()
            .then(response => {

                if (response.status) {
                    console.log(response.data);
                    this.setState({
                        loading: false,
                        dataMarquee: response.data,
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

   
    render() {

        const { entries, loading, dataMarquee,open, errors } = this.state;
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
                                        <h4 className="">In-Play</h4>
                                        <div className="marquee">
                                    <div className="track">
                                        <div className="content">
                                        {
                                                    dataMarquee.length > 0 &&
                                                        dataMarquee.map((item, index) =>
                                                    <span style={{color:'#000000'}}>{item.title} !! </span>
                                                    )                                        
                                                }
                                    </div>
                                </div>
                            </div>
                                    </div>
                                  
                                </div>
                            </div>
                        </div>
                      

                        {loading && <div className="center"><Roller /></div>}

                        {!loading && entries.length == 0 && <RecordNotFound />}

                        {entries.length > 0 &&

                            <div className="container  pull-up">
                                <div className="row">
                               
                                                                  <div className="col-12">

                                        <div className="card">
                   
                                            <div className="card-body">
                                                <div className="table-responsive p-t-10">
                                                    <table id="listingTable" className="table " style={{ width: "100%" }}>
                                                        <thead>
                                                            <tr>
                                                                <th>Match</th>
                                                                <th colSpan="2" style={{textAlign:"center"}}>1</th>
                                                                <th colSpan="2" style={{textAlign:"center"}}>x</th>
                                                                <th colSpan="2" style={{textAlign:"center"}}>2</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {entries.map((item, index) =>
                                                                <tr key={item.event_id} id={'RecordID_' + item.event_id}>
                                                                    <td><a href={"/match-refresh/" + item.event_id}> {item.event_name}</a></td>
                                                                    {
                                                                            item.prices.map((val,index)=>{
                                                                             if(item.prices.length<6){
                                                                                if(index==2){
                                                                                    item.prices.splice(2,0,'-')
                                                                                }else if(index==3){
                                                                                    item.prices.splice(3,0,'-')
                                                                                }
                                                                            }                                                                       
                                                                        }
                                                                    )}   
                                                                    {      
                                                                      item.prices.map((val,index) =>
                                                                       (index % 2 == 0) ? <td className="td_bg_blue" style={{textAlign:"center"}}>{val}</td> : <td className="td_bg_pink" style={{textAlign:"center"}}>{val}</td>
                                                                    )}
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

        
            </>
        );

    }
}

export default PlayersInPlay;
import React from 'react';
import * as GlobalProvider from '../../providers/globals/globals';
import RecordNotFound from '../../components/elements/RecordNotFound';
import * as ApisService from "../../providers/apis/apis";
import 'react-responsive-modal/styles.css';


class TennisRefresh extends React.Component {

    constructor(props) {
        super(props);
     
        this.state = {
            entries:  [],
            eventTypeId:"",
            matchType:"",
            markets:[],
            score:{
                home:{
                    gameSequence:[]
                },
                away:{
                    gameSequence:[]
                }
            },
            sessions:[],
            errors: {},
            loading: false,
            currentUser: GlobalProvider.getUser(),
            open: false,
        }
    }

    componentDidMount() {
        // event_id = this.props.match.params.event_id;
        //console.log(":::: ",event_id);//30338808 soccer//30363774 / 30357082cricket//30368042,30370130,30372032 tennis
        this.getMatchRefresh("30337303");
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
                        eventTypeId:response.eventTypeId,
                        matchType:response.matchType,
                        markets:response.markets,
                        sessions:response.sessions
                    });
                } else {
                    console.log(response.message);
                console.log("error2");
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

   
    render() {
        const { score,eventTypeId,matchType, markets,loading, open, errors } = this.state;
        let count = 1;
      
        return (
           
            <>
            {
                    (eventTypeId==1)?
                        <div className="container  pull-up"> {score.length}
                        {(score.length !== 0 )?
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card">

                                            <div className="card-body">
                                                <div className="table-responsive p-t-10">
                                                <nav className="navbar navbar-light bg-light">
                                                 <span > {score.home.name} v {score.away.name}</span>
                                               
                                                </nav>
                                               
                                                {(score.length !== 0 )?
                                                 <table id="listingTable" className="table " style={{ width: "50%", float:'right' }}>
                                                       
                                                        <tbody>

                                                       
                                                                <tr>
                                                                    <td style={{width:'40%'}}> {score.home.name} </td> 
                                                                    <td style={{textAlign:"center"}}>{score.home.score}</td>
  

                                                               </tr>
                                                               <tr>
                                                                    <td style={{width:'40%'}}> {score.away.name} </td> 
                                                                    <td style={{textAlign:"center"}}>{score.away.score}</td>


                                                               </tr>
                                                           

                                                        </tbody>
                                                    </table>
                                                :null
                                                }
                                             
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>:null
                        }

                          
                            {!loading && markets.length == 0 && <RecordNotFound />}
                             {markets.length > 0 &&
                             <div className="container">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card">

                                            <div className="card-body">
                                                <div className="table-responsive p-t-10">
                                                { (markets[2]!=undefined) ?
                                                    <table id="listingTable" className="table " style={{ width: "100%" }}>
                                                        <thead>
                                                            <tr>
                                                                <th>{markets[2].marketName}</th>
                                                                <th colSpan="2" style={{textAlign:"right"}}>Back</th>
                                                                <th colSpan="2" style={{textAlign:"center"}}></th>
                                                                <th colSpan="2" >Lay</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                        {markets[2].runners.map((item, index) =>
                                                                <tr key={item.market_runner_id} id={'RecordID_' + item.market_runner_id}>
                                                                    <td style={{width:'40%'}}> {item.runnerName}</td>
                                                                     
                                                                    {      
                                                                      item.prices.map((val,index) =>
                                                                      (index <2)?
                                                                        <td className="td_bg_bluelight" style={{textAlign:"center"}}>{val.price}<p>{val.size}</p></td> 
                                                                       :(index ==2)?
                                                                        <td className="td_bg_blue" style={{textAlign:"center"}}>{val.price}<p>{val.size}</p></td>
                                                                       :(index ==3)?
                                                                        <td className="td_bg_pink" style={{textAlign:"center"}}>{val.price}<p>{val.size}</p></td>
                                                                       :<td className="td_bg_pinklight" style={{textAlign:"center"}}>{val.price}<p>{val.size}</p></td>
                                                                      
                                                                     
                                                                        )
                                                                      
                                                                    }
                                                               </tr>
                                                            )}

                                                           

                                                        </tbody>
                                                    </table>:null
                                                    }


                                                    { (markets[1]!=undefined) ?
                                                    <table id="listingTable11" className="table " style={{ width: "100%" }}>
                                                        <thead>
                                                            <tr>
                                                                <th>{markets[1].marketName}</th>
                                                                <th colSpan="2" style={{textAlign:"right"}}>Back</th>
                                                                <th colSpan="2" style={{textAlign:"center"}}></th>
                                                                <th colSpan="2" >Lay</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                        {markets[1].runners.map((item, index) =>
                                                                <tr key={item.market_runner_id} id={'RecordID_' + item.market_runner_id}>
                                                                    <td style={{width:'40%'}}> {item.runnerName}</td>
                                                                     
                                                                    {      
                                                                      item.prices.map((val,index) =>
                                                                      (index <2)?
                                                                        <td className="td_bg_bluelight" style={{textAlign:"center"}}>{val.price}<p>{val.size}</p></td> 
                                                                       :(index ==2)?
                                                                        <td className="td_bg_blue" style={{textAlign:"center"}}>{val.price}<p>{val.size}</p></td>
                                                                       :(index ==3)?
                                                                        <td className="td_bg_pink" style={{textAlign:"center"}}>{val.price}<p>{val.size}</p></td>
                                                                       :<td className="td_bg_pinklight" style={{textAlign:"center"}}>{val.price}<p>{val.size}</p></td>
                                                                      
                                                                     
                                                                        )
                                                                      
                                                                    }
                                                               </tr>
                                                            )}

                                                           

                                                        </tbody>
                                                    </table>:null
                                                    }
                                                    { (markets[0]!=undefined) ?
                                                    <table id="listingTable111" className="table " style={{ width: "100%" }}>
                                                        <thead>
                                                            <tr>
                                                                <th>{markets[0].marketName}</th>
                                                                <th colSpan="2" style={{textAlign:"right"}}>Back</th>
                                                                <th colSpan="2" style={{textAlign:"center"}}></th>
                                                                <th colSpan="2" >Lay</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                        {markets[0].runners.map((item, index) =>
                                                                <tr key={item.market_runner_id} id={'RecordID_' + item.market_runner_id}>
                                                                    <td style={{width:'40%'}}> {item.runnerName}</td>
                                                                     
                                                                    {      
                                                                      item.prices.map((val,index) =>
                                                                      (index <2)?
                                                                        <td className="td_bg_bluelight" style={{textAlign:"center"}}>{val.price}<p>{val.size}</p></td> 
                                                                       :(index ==2)?
                                                                        <td className="td_bg_blue" style={{textAlign:"center"}}>{val.price}<p>{val.size}</p></td>
                                                                       :(index ==3)?
                                                                        <td className="td_bg_pink" style={{textAlign:"center"}}>{val.price}<p>{val.size}</p></td>
                                                                       :<td className="td_bg_pinklight" style={{textAlign:"center"}}>{val.price}<p>{val.size}</p></td>
                                                                      
                                                                     
                                                                        )
                                                                      
                                                                    }
                                                               </tr>
                                                            )}

                                                           

                                                        </tbody>
                                                    </table>:null
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            
                            </div>
                        }
                        </div> :null                     
                     }

                   
            </>
        );

    }
}

export default TennisRefresh;
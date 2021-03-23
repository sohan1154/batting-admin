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
            entries:  [],
            eventTypeId:"",
            matchType:"",
            markets:[],
            score:{
                home:{
                    inning1:{runs: "", wickets: "", overs: ""},
                    gameSequence:[]
                },
                away:{
                    inning1:{runs: "", wickets: "", overs: ""},
                    gameSequence:[]
                }
            },
            sessions:[],
            values:[],
            showResults: false,
            showStakes: false,
            staketype:"",
            stakesval:"",
            stakesvaltype:"",
            errors: {},
            loading: false,
            currentUser: GlobalProvider.getUser(),
            open: false,
        }
    }

    componentDidMount() {
        let event_id = this.props.match.params.id;
        var data=JSON.parse(sessionStorage.getItem("user"));
        this.setState({values:data.stakes});
        this.getMatchRefresh(event_id);
    }
    onHideShow=()=> {
        this.setState({ showResults: true });
    }
    onUpdate=()=>{
        console.log(this.state.values)
        this.setState({ showResults: false });
        
    }
    onShow=(type,value,valuetype)=> {
        this.setState({ showStakes: true });
        this.setState({ staketype: type });
        this.setState({ stakesval: value });
        this.setState({ stakesvaltype: valuetype });
        console.log(type)
        console.log(value)
        console.log(valuetype)
        
    }
    onHideUpade=()=> {
        this.setState({ showStakes: false });
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
    handleSubmit(event) {
       // alert('A name was submitted: ' + this.state.values.join(', '));
        event.preventDefault();
      }
      handleChange(i, event) {
        let values = [...this.state.values];
        values[i] = event.target.value;
        console.log(values);
        this.setState({ values });
     }
    render() {
        const { score,eventTypeId,matchType,sessions, markets,loading, values,open, errors,stakesval,value,staketype,stakesvaltype } = this.state;
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
                                           (eventTypeId==4)?
                                               <h3>Cricket</h3>:(eventTypeId==2)?<h3>Tennis</h3>:<h3>Soccer</h3>
                                               
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
                        (eventTypeId==4)?
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
                                                <div className="row" style={{innerHeight:'20px'}}>
                                                      {(score.home.inning1!=undefined) &&
                                                        <div className="col"><p style={{marginTop:"15px"}}> <span>{score.home.name} - </span>
                                                        <span>
                                                        {
                                                           score.home.inning1.runs  
                                                        }/{score.home.inning1.wickets} ({score.home.inning1.overs})
                                                        </span> </p></div>

                                                      }
                                                      {(score.home.inning1==undefined) &&
                                                        <div className="col"><p style={{marginTop:"15px"}}> <span>{score.home.name} - </span>
                                                        <span>
                                                        {
                                                           0 
                                                        }/{0} ({0})
                                                        </span> </p></div>

                                                      }


                                                      {(score.away.inning1!==undefined) &&
                                                       
                                                        <div className="col"><p style={{marginTop:"15px",float:"right"}}> <span>{score.away.name} - </span>
                                                        <span>

                                                         {score.away.inning1.runs}
                                                        /{score.away.inning1.wickets} 
                                                        ({score.away.inning1.overs})

                                                        </span></p></div>
                                                      }
                                                      {(score.away.inning1==undefined) &&
                                                       
                                                       <div className="col"><p style={{marginTop:"15px",float:"right"}}> <span>{score.away.name} - </span>
                                                       <span>

                                                        {0}
                                                       /{0} 
                                                       ({0})

                                                       </span></p></div>
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
                                              {   markets[0]!=undefined &&
                                                    <table id="listingTable" className="table " style={{ width: "100%" }}>
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
                                                                        <td className="td_bg_bluelight"  style={{textAlign:"center"}}>{val.price}<p>{val.size}</p></td> 
                                                                       :(index ==2)?

                                                                        <td className="td_bg_blue" onClick={() =>this.onShow(item.runnerName,val.price,"Back")} style={{textAlign:"center"}}>{val.price}<p>{val.size}</p></td>
                                                                       
                                                                       :(index ==3)?

                                                                        <td className="td_bg_pink"  onClick={() => this.onShow(item.runnerName,val.price,"Lay")} style={{textAlign:"center"}}>{val.price}<p>{val.size}</p></td>
                                                                       
                                                                       :<td className="td_bg_pinklight" style={{textAlign:"center"}}>{val.price}<p>{val.size}</p></td>
                                                                      
                                                                     
                                                                        )
                                                                      
                                                                    }
                                                               </tr>
                                                            )}

                                                           

                                                        </tbody>
                                                    </table>
                                              }{ markets[1]!=undefined &&
                                                    <table id="listingTable1" className="table " style={{ width: "100%" }}>
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
                                                                        <td className="td_bg_bluelight"  style={{textAlign:"center"}}>{val.price}<p>{val.size}</p></td> 
                                                                       :(index ==2)?
                                                                        <td className="td_bg_blue" onClick={() =>this.onShow(item.runnerName,val.price,"Back")} style={{textAlign:"center"}}>{val.price}<p>{val.size}</p></td>
                                                                       :(index ==3)?
                                                                        <td className="td_bg_pink" onClick={() =>this.onShow(item.runnerName,val.price,"Lay")} style={{textAlign:"center"}}>{val.price}<p>{val.size}</p></td>
                                                                       :<td className="td_bg_pinklight" style={{textAlign:"center"}}>{val.price}<p>{val.size}</p></td>
                                                                      
                                                                     
                                                                        )
                                                                      
                                                                    }
                                                               </tr>
                                                            )}

                                                           

                                                        </tbody>
                                                    </table>
                                                  }{ markets[2]!=undefined && <table id="listingTable2" className="table " style={{ width: "100%" }}>
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
                                                                        <td className="td_bg_bluelight"  style={{textAlign:"center"}}>{val.price}<p>{val.size}</p></td> 
                                                                       :(index ==2)?
                                                                        <td className="td_bg_blue"  onClick={() =>this.onShow(item.runnerName,val.price,"Back")} style={{textAlign:"center"}}>{val.price}<p>{val.size}</p></td>
                                                                       :(index ==3)?
                                                                        <td className="td_bg_pink"  onClick={() =>this.onShow(item.runnerName,val.price,"Lay")} style={{textAlign:"center"}}>{val.price}<p>{val.size}</p></td>
                                                                       :<td className="td_bg_pinklight"  style={{textAlign:"center"}}>{val.price}<p>{val.size}</p></td>
                                                                      
                                                                     
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
                                                <table id="listingTable3" className="table " style={{ width: "100%" }}>
                                                      
                                                        <tbody>

                                                        {sessions.map((item, index) =>
                                                                <tr key={item.session_id} id={'RecordID_' + item.session_id} style={{height:'30px'}}>
                                                                
                                                                    <td style={{width:'40%'}}> {item.RunnerName}</td>           
                                                                    <td className="td_bg_pink"   onClick={() =>this.onShow(item.RunnerName +" No",item.LayPrice1,"Lay")}style={{textAlign:"center"}}>{item.LayPrice1}<p>{item.LaySize1}</p></td>
                                                                    <td className="td_bg_blue" onClick={() =>this.onShow(item.RunnerName +" Yes",item.BackPrice1,"Back")} style={{textAlign:"center"}}>{item.BackPrice1}<p>{item.BackSize1}</p></td>
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
                                                 {/* Match Session End */}                     
                                           
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        : (eventTypeId==2) ?          
                        <div className="container  pull-up">
                        {(score.length !== 0 )?
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card">

                                            <div className="card-body">
                                                <div className="table-responsive p-t-10">
                                                <nav className="navbar navbar-light bg-light">
                                                 <span > {score.home.name} v {score.away.name}</span>
                                               
                                                </nav>
                                               

                                                <table id="listingTable" className="table " style={{ width: "50%", float:'right' }}>
                                                       
                                                        <tbody>

                                                       
                                                                <tr>
                                                                    {(score.home.highlight==true)?
                                                                    <td style={{width:'40%', color:'green'}}> {score.home.name} </td> :
                                                                    <td style={{width:'40%'}}> {score.home.name} </td> 
                                                                        
                                                                    }
                                                                    {
                                                                        score.home.gameSequence.map((item,index)=>
                                                                        <td style={{textAlign:"center"}}>{item}</td>
  
                                                                        )
                                                                    }
                                                                    <td style={{textAlign:"center"}}>{score.home.games}</td>
  
                                                                    <td style={{textAlign:"center"}}>{score.home.score}</td>
  

                                                               </tr>
                                                               <tr>
                                                               {(score.away.highlight==true)?
                                                                    <td style={{width:'40%',  color:'green'}}> {score.away.name}* </td> :
                                                                    <td style={{width:'40%'}}> {score.away.name} </td> 
                                                                        
                                                                    }    
                                                                    {
                                                                        score.away.gameSequence.map((item,index)=>
                                                                        <td style={{textAlign:"center"}}>{item}</td>
  
                                                                        )
                                                                    }
                                                                    <td style={{textAlign:"center"}}>{score.away.games}</td>
  
                                                                    <td style={{textAlign:"center"}}>{score.away.score}</td>


                                                               </tr>
                                                           

                                                        </tbody>
                                                    </table>
                                               
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
                                                { markets[0]!=undefined &&
                                                    <table id="listingTable" className="table " style={{ width: "100%" }}>
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
                                                    </table>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            
                            </div>
                        }
                        </div>:(eventTypeId==1) ? 
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
                                                { markets[2]!=undefined &&
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
                                                    </table>
                                                }


                                                    { markets[1]!=undefined &&
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
                                                    </table>
                                                    }
                                                    { markets[0]!=undefined &&
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
                                                    </table>
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

                        </div>
                         <div className="col-md-4">
                         <div className="container  pull-up">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card">

                                            <div className="card-body">
                                                <div className="table-responsive p-t-10">
                                              
                                                <div style={{marginBottom:"10px"}}>
                                                <button type="button" class="btn btn-light">Open Bets</button>
                                                <button type="button" class="btn btn-success" style={{float:'right'}} onClick={this.onHideShow}>Edit Stakes</button>
                                                </div>
                                                 { 
                                                     this.state.showResults ==true && 
                                                     <div>
                                                         {values.map((item,index)=>

                                                            <div key={index} class="form-group">
                                                                <div class="col-xs-1">
                                                                <input class="form-control" value={item||''}  onChange={this.handleChange.bind(this, index)}  type="text" />
                                                                </div>
                                                            </div>
                                                    )}
                                                    <button type="button" class="btn btn-light">Cancel</button>
                                                    <button type="button" class="btn btn-success" style={{float:'right'}} onClick={this.onUpdate}>Update</button>
                                                </div>
                                                }
                                                

                                                { this.state.showStakes==true && 
                                                <div>
                                                {(stakesvaltype=="Back") && 
                                                <div>  
                                                <div style={{width:'7px',height:'7px', position:'relative',top:'15px'}} className="div_bg_blue"></div><p style={{marginLeft:'10px'}}>{stakesvaltype}</p>
                                                
                                                <div className="div_bg_blue">
                                                    <div style={{width:'80%', margin:"auto"}}>
                                                <div class="form-group">
                                                    <div class="col-xs-1">
                                                      {this.state.staketype} Odds <input class="form-control" value={this.state.stakesval || ''}  type="text" />
                                                    </div>
                                                 </div>
                                                 <div  class="form-group">
                                                      <div class="col-xs-1">
                                                     Stakes  <input class="form-control"  type="text" />
                                                       </div>
                                                  </div>
                                                   profit <p>0.00</p>


                                                    {values.map((item,index)=>
                                                    
                                                    <div class="btn-group" key={index} role="group" aria-label="Basic example">
                                                    <button type="button" class="btn btn-secondary">{item}</button>
                                                    </div>
                                                    )}
                                                    <div style={{marginTop:"5px"}}>
                                                        <button type="button" class="btn btn-light">Cancel</button>
                                                        <button type="button" class="btn btn-success" style={{float:'right'}} onClick={this.onHideUpade}>Place Bets</button>
                                                    </div>
                                                    </div>
                                                </div>
                                                 </div> 
                                                }
                                            {(stakesvaltype=="Lay") && 
                                                    
                                                   <div> 
                                            <div style={{width:'7px',height:'7px', position:'relative',top:'15px'}} className="div_bg_pink"></div><p style={{marginLeft:'10px'}}>{stakesvaltype}</p>
                                                
                                                <div className="div_bg_pink">
                                                    <div style={{width:'80%', margin:"auto"}}>
                                                <div class="form-group">
                                                    <div class="col-xs-1">
                                                      {this.state.staketype} Odds <input class="form-control" value={this.state.stakesval || ''}  type="text" />
                                                    </div>
                                                 </div>
                                                 <div  class="form-group">
                                                      <div class="col-xs-1">
                                                     Stakes  <input class="form-control"  type="text" />
                                                       </div>
                                                  </div>
                                                   Liability <p>0.00</p>


                                                    {values.map((item,index)=>
                                                    
                                                    <div class="btn-group" key={index} role="group" aria-label="Basic example">
                                                    <button type="button" class="btn btn-secondary">{item}</button>
                                                    </div>
                                                    )}
                                                    <div style={{marginTop:"5px"}}>
                                                        <button type="button" class="btn btn-light">Cancel</button>
                                                        <button type="button" class="btn btn-success" style={{float:'right'}} onClick={this.onHideUpade}>Place Bets</button>
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
// import React, { Component } from "react";
// import io from "socket.io-client";
// const socket = io("http://localhost:3002",{'forceNew':true, query: "foo=30357082" });

// console.log(socket);
// class socketTest extends Component {
 
//     constructor(props) {
//         super(props);
    
//     this.state = {
//         connected:false,
//         formData: "",
       
//     }    
// }
// componentDidMount() {
//   socket.on("event",(data)=>{
//     //   this.setState({
//     //     connected:true,
//     //     formData: data,
//     //   })
//      console.log(data);
//   })
//   }
  
//     render() {

      
//         return (
//             <>
//        { this.state.connected==false? <p>Disconnected</p>:
//             <p>
//             {this.state.formData}
//             </p>

//         }
       
//             </>
//         )
//     }


// }
// export default socketTest;
import React from "react";
// import Auth from "../utils/Auth";
// import { Link } from "react-router-dom";

// THIS HOME DEPENDS IF A USER IS LOGGEDIN
// export default function Home() {
//   function showNav() {
//     if (Auth.loggedIn()) {
//       return (
//         <>
//           <div className="home-header">
//             <Link to="/" onClick={() => Auth.logout()}>
//               <button>Logout</button>
//             </Link>
//           </div>
//         </>
//       );
//     } else {
//       return (
//         <>
//           <div className="home-header">
//             {/* <Header as="h1" textAlign="center" inverted color="yellow" >
//               Checkbook
//             </Header> */}
//             <header textAlign="right">
//               <Link to="/login">
//                 <button color="yellow">Login</button>
//               </Link>
//               <Link to="/signup">
//               <button color="yellow">SignUp</button>
//               </Link>
//             </header>
//           </div>
//         </>
//       );
//     }
//   }

//   return <>{showNav()} </>;
// }

export default class Home extends React.Component {
  render() {
    return (
      <>
      <h1>insert image here</h1>
        {/* <img src={} alt=""/> */}
      </>
    )
  }
}
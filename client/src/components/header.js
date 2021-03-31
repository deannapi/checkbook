import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Sticky, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Auth from "../utils/Auth";
// import { AUTH_TOKEN } from "../constants";

export default function Header() {
  //   state = {};

  //   logout = (event) => {
  //     event.preventDefault();
  //     Auth.logout;
  //   };

  function showNav() {
    if (Auth.loggedIn()) {
      return (
        <Sticky>
          <Menu>
            <Menu.Item header>
              <Link to="/">Home</Link>
              <Link to="/checkbook">Checkbook</Link>
              <Link to="/" onClick={this.logout}>
                Logout
              </Link>
            </Menu.Item>
          </Menu>
        </Sticky>
      );
    }
  }

  return <>{showNav()}</>;
}

// const Header = () => {
//   const history = useHistory();
//   const authToken = localStorage.getItem(AUTH_TOKEN);
//   return (
//     <div className="flex pa1 justify-between nowrap orange">
//       <div className="flex flex-fixed black">
//         <div className="fw7 mr1">Hacker News</div>
//         <Link to="/" className="ml1 no-underline black">
//           new
//         </Link>
//         <div className="ml1">|</div>
//         <Link to="/top" className="ml1 no-underline black">
//           top
//         </Link>
//         <div className="ml1">|</div>
//         <Link to="/search" className="ml1 no-underline black">
//           search
//         </Link>
//         {authToken && (
//           <div className="flex">
//             <div className="ml1">|</div>
//             <Link to="/create" className="ml1 no-underline black">
//               submit
//             </Link>
//           </div>
//         )}
//       </div>
//       <div className="flex flex-fixed">
//         {authToken ? (
//           <div
//             className="ml1 pointer black"
//             onClick={() => {
//               localStorage.removeItem(AUTH_TOKEN);
//               history.push(`/`);
//             }}
//           >
//             logout
//           </div>
//         ) : (
//           <Link to="/login" className="ml1 no-underline black">
//             login
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Header;

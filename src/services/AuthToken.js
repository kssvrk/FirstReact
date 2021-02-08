import { useHistory, Redirect } from "react-router-dom";
import axios from "axios";
import { LOGOUT_URL, USER_URL } from "../config/Config";
import API from './Api';
// ------------- SAMPLE -----------------

// axios
//     .post(user_url, {}, config)
//     .then((res) => {})
//     .catch((err) => {
//       if (err.response) {
//         console.log("Backend error response");
//         console.log(error.response.data);
//         console.log(error.response.status);
//         console.log(error.response.headers);
//       } else if (err.request) {
//         alert(
//           "Unable to make the request: Likely issue is your internet connection"
//         );
//       } else {
//         alert("Something went wrong, please try later");
//       }
//     })
//     .then(() => {
//       window.localStorage.removeItem("AuthToken");
//       setLogin(false);
//     });

//---------------------------------------

export function LoggedIn() {
  console.log(window.localStorage.getItem("AuthToken"));
  if (window.localStorage.getItem("AuthToken") === null) {
    return false;
  } else {
    return true;
  }
}

export async function WhichUser(callback) {
  const user_url = USER_URL;
  
  let history = useHistory();
  

  API
    .get(user_url)
    .then((res) => {
      //console.log(res.data);
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        console.log("Backend error response");
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else if (err.request) {
        alert(
          "Unable to make the request: Likely issue is your internet connection"
        );
      } else {
        alert("Something went wrong, please try later");
      }
    })
    .then(() => {});
}

export const LogOut = (props) => {
  const { setLogin } = props;
  let history = useHistory();
  var token = window.localStorage.getItem("AuthToken");
  if (!(token === null)) {
    const logout_url = LOGOUT_URL;
    let config = {
      headers: {
        Authorization: "Token " + token,
      },
    };
    axios
      .post(logout_url, {}, config)
      .then((res) => {})
      .catch()
      .then(() => {
        window.localStorage.removeItem("AuthToken");
        setLogin(false);
      });
  }

  // Hit logout url.

  return <Redirect to={{ pathname: "/Home" }} />;
};

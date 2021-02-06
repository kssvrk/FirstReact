import { useHistory, Redirect } from "react-router-dom";
import axios from "axios";

export function LoggedIn() {
  console.log(window.localStorage.getItem("AuthToken"));
  if (window.localStorage.getItem("AuthToken") === null) {
    return false;
  } else {
    return true;
  }
}

export const LogOut = (props) => {
  const { setLogin } = props;
  let history = useHistory();
  var token = window.localStorage.getItem("AuthToken");
  if (!(token === null)) {
    const logout_url = "http://localhost:8000/auth/token/logout/";
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

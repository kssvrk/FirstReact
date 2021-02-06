//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "../../pages/Login/Login";
import { Link } from "react-router-dom";

function Header(props) {
  const { appState } = props;
  console.log(props);
  let LogButton;
  if (!appState.login) {
    LogButton = (
      <div class="d-flex flex-grow-1 text-right">
        <ul class="navbar-nav ms-auto flex-nowrap">
          <li class="nav-item menu-item navbut">
            <Link className="btn btn-outline-success my-2 my-sm-0" to="/Login">
              Login
            </Link>
          </li>
          <li class="nav-item menu-item navbut w-100">
            <Link
              className="btn btn-outline-success my-2 my-sm-0"
              to="/Register"
            >
              Register
            </Link>
          </li>
        </ul>
      </div>
    );
  } else {
    LogButton = (
      <Link class="btn btn-outline-success my-2 my-sm-0 mr-auto" to="/Logout">
        Logout
      </Link>
    );
  }
  return (
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
      <div class="container-fluid">
        <span class="navbar-brand mb-0 h1">
          <Link to="/Home">Aikops</Link>
        </span>
      </div>
      {LogButton}
    </nav>
  );
}

export default Header;

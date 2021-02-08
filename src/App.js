import logo from "./static/images/logo.svg";
import "./App.css";
import "./static/css/bootstrap.min.css";
import Header from "./basic/Header/Header";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

//--------------- ROUTES --------------------
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import { LoggedIn, LogOut } from "./services/AuthToken";
//-------------------------------------------

function App() {
  // ------------------- APP State ---------------------------

  //const [login, setLogin] = useState(0);
  const [login, setLogin] = useState(LoggedIn());
  console.log(login);
  // ----------------------------------------------------------

  return (
    <Router>
      <div className="app">
        <Header appState={{ login: login }}></Header>
      </div>
      <Switch>
        <Route path="/Login">
          <Login setLogin={setLogin} />
        </Route>
        <Route path="/Register">
          <Register />
        </Route>
        <PrivateRoute authed={login} path="/Home" component={Home} />
        <Route path="/LogOut">
          <LogOut setLogin={setLogin} />
        </Route>
      </Switch>
    </Router>
  );
}

function PrivateRoute({ component: Component, authed, ...rest }) {
  
  return (
    <Route
      {...rest}
      render={(props) =>
        authed ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/Login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default App;

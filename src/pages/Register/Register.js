import React, { useState, useEffect } from "react";
import axios from "axios";
// ------ TO DO --------------
// 1) Implement validation for the fields

function Register(props) {
  const { item } = props;
  // ---- hooks ----------------
  //   useEffect(() => {
  //     service_login(1, 2);
  //   });

  let [username, cun] = useState("");
  let [password, cpw] = useState("");
  let [email, cem] = useState("");
  let [msgs, cmsgs] = useState([]);
  //----------------------------

  function MsgPanel(props) {
    const { msgs } = props;
    console.log(msgs);
    let rows = [];
    if (!msgs.length > 0) {
      console.log("error nuill");
      return null;
    }
    for (var i = 0; i < msgs.length; i++) {
      if (msgs[i].mode == "error") {
        rows.push(
          <div class="alert alert-danger" role="alert">
            {msgs[i].content}
          </div>
        );
      } else if (msgs[i].mode == "good") {
        rows.push(
          <div class="alert alert-success" role="alert">
            {msgs[i].content}
          </div>
        );
      }
    }

    rows.unshift(
      <hr style={{ border: "2px solid white", marginTop: "2em" }} />
    );

    return rows;
  }
  return (
    <div class="row">
      <div
        class="col-sm-4 offset-sm-4"
        style={{ marginTop: "2em", color: "white" }}
      >
        <h1
          style={{
            color: "white",
            textAlign: "center",
          }}
        >
          REGISTER ON AIKOPS{" "}
        </h1>{" "}
        <br />
        <div class="row container-fluid" style={{ border: "0px solid red" }}>
          <div class="form-group mb-3">
            <label class="control-label" id="basic-addon1">
              Email
            </label>
            <input
              class="form-control"
              type="text"
              placeholder="Email"
              aria-label="default input example"
              value={email}
              onChange={(e) => {
                cem(e.target.value);
              }}
            ></input>
          </div>
          <div class="form-group mb-3">
            <label class="control-label" id="basic-addon1">
              Username
            </label>
            <input
              class="form-control"
              type="text"
              placeholder="Username"
              aria-label="default input example"
              value={username}
              onChange={(e) => {
                cun(e.target.value);
              }}
            ></input>
          </div>
          <div class="form-group mb-3">
            <label class="control-label" id="basic-addon1">
              Password
            </label>
            <input
              class="form-control"
              type="password"
              placeholder="password"
              aria-label="default input example"
              value={password}
              onChange={(e) => cpw(e.target.value)}
            ></input>
          </div>
          <button
            type="button"
            class="btn btn-primary"
            style={{ width: "20%", display: "block", margin: "auto" }}
            onClick={() => {
              service_register(username, password, email, cmsgs);
            }}
          >
            Submit
          </button>
          <MsgPanel msgs={msgs} />
        </div>
      </div>
    </div>
  );

  function service_register(username, password, email, cmsgs) {
    const register_url = "http://localhost:8000/auth/users/";
    console.log(username + password + email);
    let user = {
      username,
      password,
      email,
    };
    axios
      .post(register_url, user)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        var keys = Object.keys(res.data);
        var msgs = [];
        cmsgs([
          {
            mode: "good",
            content:
              "User registered succesfully, check your mail for further instructions",
          },
        ]);
      })
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          console.log("Backend error response");
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);

          var keys = Object.keys(error.response.data);
          var errors = [];
          for (var k = 0; k < keys.length; k++) {
            errors.push({
              mode: "error",
              content: keys[k] + " : " + error.response.data[keys[k]],
            });
            cmsgs(errors);
          }
        } else if (error.request) {
          // The request was made but no response was received
          console.log("NO RESPONSE");
          console.log(error.request);
          cmsgs([
            {
              mode: "error",
              content:
                "Unable to make the request , likely issue with your internet connection or our server is down",
            },
          ]);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Something went wrong");
          console.log("Error", error.message);
          cmsgs([
            {
              mode: "error",
              content:
                "Something went wrong , please report this to our engineers , try later",
            },
          ]);
        }
      });
  }
}

export default Register;

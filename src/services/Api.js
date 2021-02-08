import axios from 'axios';
import { useHistory} from "react-router-dom";

const API=axios.create({
  
});

API.interceptors.request.use(req => {
    // `req` is the Axios request config, so you can modify
    // the `headers`.
    var token = window.localStorage.getItem("AuthToken");
    if(token!="")req.headers.Authorization = "Token " + token;
    return req;
  });

API.interceptors.response.use(res=>res,err=>{
    let history = useHistory();
    const{status,data,config}=err.response;
    if (err.response.status === 401) history.push("/Logout");
});

export default API;
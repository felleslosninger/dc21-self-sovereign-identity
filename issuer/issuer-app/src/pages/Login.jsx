import React from "react";
import {Link, useHistory} from "react-router-dom"

function Login() {

    let history = useHistory();

    //function

    const redirect = () =>{
        let path = `Wait`;
        history.push(path);
    }

    return (
        <div className="Login">
            <p>Innlogging</p>

            <button  onClick={redirect} >Logg inn med id-porten</button>
            <Link to="/Wait" className="btn btn-primary">Logg inn med id-porten</Link>
        </div>
    )
}

export default Login;

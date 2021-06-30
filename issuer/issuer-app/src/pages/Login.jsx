import React from "react";
import {Link, useHistory} from "react-router-dom"

function Login() {

    let history = useHistory();

    //function

    return (
        <div className="Login">
            <p>Innlogging</p>

            <button   >Logg inn med id-porten</button>
        </div>
    )
}

export default Login;

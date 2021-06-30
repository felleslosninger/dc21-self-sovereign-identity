import React from "react";
import {Link, useHistory} from "react-router-dom"

import { jsx } from "@emotion/react";
import {BallBeat, BallPulse} from "react-pure-loaders";

function Wait() {


    let history = useHistory();
    setTimeout(function() {
        redirect()
    }, 5000);

    const redirect = () =>{
        let path = `Mainpage`;
        history.push(path);
    }
    function oneSecondFunction() {
        return
    }

    return (
        <div className="Wait">
            <p>Venter..</p>
            <BallPulse color={'black'}/>

            {/*<button  onClick={} >Logg inn med id-porten</button>*/}
        </div>
    )
}

export default Wait;

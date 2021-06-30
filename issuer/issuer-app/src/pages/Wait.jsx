import React from "react";
import {Link, useHistory} from "react-router-dom"

function Wait() {

    let history = useHistory();

    //function

    return (
        <div className="Wait">
            <p>Venter..</p>

            {/*<button  onClick={} >Logg inn med id-porten</button>*/}
        </div>
    )
}

export default Wait;

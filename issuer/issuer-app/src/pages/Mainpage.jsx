import React from "react";
import {Link, useHistory} from "react-router-dom"

function Mainpage() {

    let history = useHistory();

    //function

    return (
        <div className="Mainpage">
            <a>Velg type bevis: </a>
            <select>
                <option>Over 18</option>
                <option>Over 20</option>
                <option>Fødselsattest</option>
            </select>

            <br/>
            <button onClick={} >Søk etter bevis</button>
        </div>
    )
}

export default Mainpage;

import React from "react";
import {Link, useHistory} from "react-router-dom"

function Mainpage() {

    let history = useHistory();

    async function getCredential() {
         console.log("Good day kind sir")
         let response = await fetch('/api/getCredential/test')
             .then(response => response.json())

        console.log(response);
    }

    return (
        <div className="Mainpage">
            <a>Velg type bevis: </a>
            <select>
                <option>Over 18</option>
                <option>Over 20</option>
                <option>Fødselsattest</option>
            </select>

            <br/>
            <button onClick={getCredential()} >Søk etter bevis</button>
        </div>
    )
}

export default Mainpage;

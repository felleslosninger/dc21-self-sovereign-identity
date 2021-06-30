import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom"

function Mainpage() {

    let history = useHistory();
    let chosenOption;

    async function getCredential() {
        console.log(chosenOption)

        let response = await fetch('/api/getCredential/' + chosenOption)
            .then(response => response.json())
        //
        // console.log(response);
    }
    const [type, setType] = useState("");

    function handleSelectChange(event){
        //console.log(event.target.value);
        chosenOption = event.target.value;
    }

    return (
        <div className="Mainpage">
            <a>Velg type bevis: </a>
            <select value={type}  onChange={handleSelectChange}>
                <option value={"Over-18"}>Over 18</option>
                <option value={"Over-20"}>Over 20</option>
                <option value={"Fødselsattest"}>Fødselsattest</option>
            </select>

            <br/>
            <button onClick={getCredential} >Søk etter bevis</button>
        </div>
    )
}

export default Mainpage;

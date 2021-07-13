import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom"
import Select from 'react-select';
import QRCode from "react-qr-code";

function Mainpage() {

    const types = [
        { value: 'over-18', label: 'Over 18' },
        { value: 'over-20', label: 'Over 20' },
        { value: 'fødselsattest', label: 'Fødselsattest' }
    ]
    let history = useHistory();


    async function getCredential() {
        //console.log(chosenOption)

        let response = await fetch('/api/getCredential/' + selectedOption.value)
            .then(response => response.json())


        console.log(selectedOption.value);

        console.log(response)

    }
    //const [type, setType] = useState("");

    // function handleSelectChange(event){
    //     //console.log(event.target.value);
    //     chosenOption = event.target.value;
    //
    // }

    const [selectedOption, setSelectedOption] = useState(null);

    return (
        <div className="Mainpage">
            <a>Velg type bevis: </a>
            {/*<select  defaultValue={"Over-18"} value={type}  onChange={handleSelectChange}>*/}
            {/*    <option value={"Over-18"}>Over 18</option>*/}
            {/*    <option value={"Over-20"}>Over 20</option>*/}
            {/*    <option value={"Fødselsattest"}>Fødselsattest</option>*/}
            {/*</select>*/}

            <br/>


            <Select

                className="basic-single"
                classNamePrefix="select"
                defaultValue={types[0]}
                name="VCType"
                options={types}

                onChange = {setSelectedOption}
            />
            <br/> <br/>
            <button onClick={getCredential}  >Søk etter bevis</button>

            <br/><br/> <br/>

            <QRCode  value={selectedOption.value} />
        </div>
    )
}

export default Mainpage;

import React, {useState} from "react";
import {useHistory} from "react-router-dom"
import Select from 'react-select';
import QRCode from "react-qr-code";
import OauthPopup from "react-oauth-popup";


function Mainpage() {

    const types = [
        { value: 'over-18', label: 'Over 18' },
        { value: 'over-20', label: 'Over 20' },
        { value: 'fødselsattest', label: 'Fødselsattest' }
    ]
    let history = useHistory();


    const [selectedOption, setSelectedOption] = useState(null);
    const [bID, setBID] = useState('123');
    const [param, setParam] = useState('')


    async function getBaseID() {

        const baseID = await fetch('http://localhost:8083/'+ param).then(baseID => baseID.text());
        setBID(baseID);
    }
    const onCode = (code, params) => {
        console.log('wooo a code', code);
        setParam(params)
        console.log('hei', params);
    }

    const onClose = (url) => console.log(url);


    function verifyIDPort() {
        return true;
    }




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
            <button onClick={() => getBaseID()}  >Søk etter bevis</button>


            <OauthPopup
                url={ 'http://localhost:8083/protectedpage'}
                onCode={onCode}
                onClose={onClose}
            >IDPorten</OauthPopup>
            <br/><br/> <br/>

            <QRCode value={bID}/>
        </div>
    )
}

export default Mainpage;

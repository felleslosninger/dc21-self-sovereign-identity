import React, {useState} from "react";
import {Link} from "react-router-dom";

function VerifyAge() {


    let [path, setPath] = useState('')


    function verifyAge() {
        /* fetch('/api/hello')
             .then(response=>response.text())
             .then(response => console.log(response))*/

        let response = fetch('/api/verify')
            .then(response => response.text())
        console.log(response)

        response ? setPath('/verified') : setPath('/notVerified')

       /* if (response) {
            setPath('/verified')
            console.log("hei")
        } else {
            setPath('/notVerified')
            console.log('hallo')
        }*/



    }


    return (
        <div className="VerifyAge">
            <p>You must be over 18 to continue</p>
            {/*<button onClick={verifyAge}>Verify age</button>*/}
            <Link to={path} onClick={verifyAge}>Verify age</Link>
        </div>
    );
}

export default VerifyAge;
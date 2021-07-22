import React from "react";
import {Link, useHistory} from "react-router-dom";
import QRCode from "react-qr-code";
import localIpUrl from 'local-ip-url';

function VerifyAge() {

    let history = useHistory()

    async function checkAge() {
        let response = await fetch('/api/sendVP')
            .then(response => response.json())
            //.catch(err => console.log('There was an error:' + err))
        console.log(response)

        if (response === false) {
            console.log(response)
            history.push('/notVerified')
        } else {
            history.push('/verified')
            console.log(response)
        }
    }

    const path = localIpUrl() + ':3000/api/sendVP'
    const userID = Math.random() * 100
    sessionStorage.setItem('userID', userID.toString())


    return (
        <div className="VerifyAge">
            <p>You must be over 18 to continue</p>
            <QRCode value={path + '|over-18|' + userID}/>
            <br/>
            <br/>
            <br/>
            <Link className="btn" to={history} onClick={checkAge}>Verify age</Link>
        </div>
    );
}

export default VerifyAge;
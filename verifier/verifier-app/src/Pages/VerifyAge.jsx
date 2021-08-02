import React from "react";
import {Link, useHistory} from "react-router-dom";
import QRCode from "react-qr-code";
import localIpUrl from 'local-ip-url';


function VerifyAge() {

    let history = useHistory()
    const path = localIpUrl() + ':3000/api/sendVP'
    const userID = Math.floor((Math.random() * 100000))

    async function checkAge(id) {
        let response = await fetch('/api/checkVerified?id='+ id)
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

    async function httpSendUserId(id) {
        console.log(userID)
        try {
            const response = await fetch("/api/sendUserID", {
                method: "POST",
                body: JSON.stringify(id)
            })
            console.log(response.text())
            if (response.ok) {
                return true;
            }
            return false;
        }
        catch (error) {
            console.log("feil");
            return false;
        }
    }


    return (
        <div className="VerifyAge">
            <p>You must be over 18 to continue</p>
            <QRCode value={path + '|over-18|' + userID}/>
            <br/>
            <br/>
            <br/>
            <button className="btn" onClick={() => httpSendUserId(userID)}>Send proof</button>
            <br/>
            <br/>
            <br/>
            <Link className="btn" to={history} onClick={() => checkAge(userID)}>Verify age</Link>
        </div>
    );
}

export default VerifyAge;
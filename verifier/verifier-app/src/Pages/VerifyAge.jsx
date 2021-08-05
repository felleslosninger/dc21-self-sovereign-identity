import React, {useState, useEffect} from "react";
import QRCode from "react-qr-code";
import localIpUrl from 'local-ip-url';
import { useInterval } from "../hooks/useInterval";

export default function VerifyAge() {

    const path = localIpUrl() + ':3000/api/sendVP'
    const VERIFY_REFRESH_INTERVAL = 2000;

    const [userID, setUserID] = useState();
    const [verified, setVerified] = useState(false);

    function generateUserID() {
        const id = Math.floor((Math.random() * 100000));
        console.log("Generated userID: " + id);
        return id;
    }

    async function httpGetVerifiedAge(id) {
        let response = await fetch('/api/checkVerified?id='+ id)
            .then(response => response.json());
            //.catch(err => console.log('There was an error:' + err))
        console.log("GET verified: " + response);
        return response;
    }
    
    async function httpSendUserId(id) {
        console.log("POST userID argument: " + id)
        try {
            const response = await fetch("/api/sendUserID", {
                method: "POST",
                body: JSON.stringify(id)
            })
            console.log("POST userID response: " + response.text())
            if (response.ok) {
                return true;
            }
            return false;
        }
        catch (error) {
            console.log("feil under sending av userID");
            return false;
        }
    }

    // Called only once when page is loaded
    useEffect(() => {
        const generated = generateUserID();
        setUserID(generated);
    }, []);

    // Called when userID is changed
    useEffect(() => {
        httpSendUserId(userID)
    }, [userID]);

    // Called continuously with the specified interval delay
    useInterval(async () => {
        const verified = await httpGetVerifiedAge(userID);
        setVerified(verified);
    }, VERIFY_REFRESH_INTERVAL);

    return (
        <div className="VerifyAge">
            <p>Verifiser at du er over 18.</p>
            <QRCode value={path + '|over-18|' + userID}/>
            <br/>
            <br/>
            <p style={{color: verified ? "green" : "black"}}>Du er {!verified && "enda ikke"} verifisert.</p>
        </div>
    );
}
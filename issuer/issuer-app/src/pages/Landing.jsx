import React from "react";
import {Link, useHistory} from "react-router-dom"
import QRCode from "react-qr-code";

function Landing() {

    let history = useHistory();

    async function getCredential() {
        // console.log("Good day kind sir")
        // let response = await fetch('/api/getCredential/test')
        //     .then(response => response.json())

        let response2 = await fetch('/api/testBoolean/fisk')
            .then(response2 => response2.json())
        console.log(response2);
    }

    return (
        <div className="Landing">
            <p>Lets me see you take your pants off!</p>
            <p>Is a creepy thing to say in a mickey mouse voice :)</p>
            {/*<Link className={"btn"} to={history} onClick={getCredential}>Lets get yer diploma kid!</Link>*/}
            <button  onClick={getCredential}>Lets get yer diploma kid!, with a button</button>
            <QRCode value="http://vg.no"/>

        </div>
    )
}

export default Landing;

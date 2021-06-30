import React from "react";
import {Link, useHistory} from "react-router-dom"

function Landing() {

    let history = useHistory();

    async function getCredential() {
        console.log("Good day kind sir")
    }

    return (
        <div className="Landing">
            <p>Lets me see you take your pants off!</p>
            <p>Is a creepy thing to say in a mickey mouse voice :)</p>
            <Link className={"btn"} to={history} onClick={getCredential}>Lets get yer diploma kid!</Link>

        </div>
    )
}

export default Landing;

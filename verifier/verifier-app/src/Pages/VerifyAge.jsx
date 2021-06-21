import React from "react";
import {Link, useHistory} from "react-router-dom";

function VerifyAge() {


    let history = useHistory()

    async function checkAge() {
        let response = await fetch('/api/verify')
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


    return (
        <div className="VerifyAge">
            <p>You must be over 18 to continue</p>
            <Link to={history} onClick={checkAge}>Verify age</Link>
        </div>
    );
}

export default VerifyAge;
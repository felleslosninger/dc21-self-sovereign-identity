import React from "react";

function VerifyAge() {

    function verifyAge() {
        fetch('/api/hello')
            .then(response=>response.text())
            .then(response => console.log(response))
    }


    return (
        <div className="VerifyAge">
            <p>You must be over 18 to continue</p>
            <button onClick={verifyAge}>Verify age</button>
        </div>
    );
}

export default VerifyAge;
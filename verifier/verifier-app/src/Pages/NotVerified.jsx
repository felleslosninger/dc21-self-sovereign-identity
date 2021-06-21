import React from "react";
import {Link} from "react-router-dom";

function NotVerified() {

    return (
        <div className="NotVerified">
            <p>You were not verified!</p>
            <Link className="btn" to={'/'}>Back</Link>
        </div>
    );
}

export default NotVerified;
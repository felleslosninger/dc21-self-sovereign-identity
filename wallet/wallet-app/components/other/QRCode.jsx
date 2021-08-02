/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import QRCode from 'react-native-qrcode-svg';

/**
 * Making a QR code that takes in a jwt string that will be the information in the QR code
 * @param {string} props
 * @returns qr code containing string information (string: jwt)
 */
export default function CreateQR(props) {
    const [qrvalue] = useState(props.content); // content=a string with information(jwt) or url ++
    return (
        <QRCode
            value={qrvalue || 'NA'} // content to the QR code
            size={250}
            color="#1e2b3c"
            backgroundColor="white"
            // eslint-disable-next-line global-require
            logo={require('../../assets/digdir-logo.jpg')} // digdir logo in the middle :)
            logoSize={30} // 32 is also good
        />
    );
}

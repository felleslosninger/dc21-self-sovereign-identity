/* SIGN.JS
import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { RSA, RSAKeychain } from 'react-native-rsa-native';

const secret = 'secret message';
const keyTag = 'com.domain.mykey';

export default const signDemo = async () => {
    console.log('signDemo');
    const keys = await RSA.generate();
    const signature = await RSA.sign(secret, keys.private);
    console.log('signature', signature);
    const valid = await RSA.verify(signature, secret, keys.public);
    console.log('verified', valid);
};
*/

/* SIGNING.JS
import { RSA, RSAKeychain } from 'react-native-digital-signature';

// export function encrypting() {
const message = 'my secret message';

RSA.generateKeys(4096) // set key size
    .then((keys) => {
        console.log('4096 private:', keys.private); // the private key
        console.log('4096 public:', keys.public); // the public key
        RSA.encrypt(message, keys.public).then((encodedMessage) => {
            console.log(`the encoded message is ${encodedMessage}`);
            RSA.decrypt(encodedMessage, keys.private).then((decryptedMessage) => {
                console.log(`The original message was ${decryptedMessage}`);
            });
        });
    });
// };

export function main() {
    const keyTag = 'com.domain.mykey';
    const message = 'message to be verified';

    const publicKey = generateKeyPair(keyTag);
    // Share the generated public key with third parties as desired.

    const messageSignature = RSAKeychain.sign(message, keyTag);

    if (RSAKeychain.verify(messageSignature, message, keyTag)) {
        // The signature matches: trust this message.
    } else {
        // The signature does not match.
    }

    RSAKeychain.deletePrivateKey(keyTag);
}

export function generateKeyPair(keyTag) {
    const keys = RSAKeychain.generate(keyTag);
    return keys.public;
}
*/

/* SIGNNEW.JS
import { KEYUTIL, KJUR } from 'jsrsasign';

export const sign = async () => {
    const rsaKeypair = KEYUTIL.generateKeypair('RSA', 2048);

    // RSA signature generation
    const sig = new KJUR.crypto.Signature({ alg: 'SHA256withRSA' });
    console.log(sig);

    const publicKey = rsaKeypair.pubKeyObj;
    console.log(publicKey);
    const privateKey = rsaKeypair.prvKeyObj;
    console.log(privateKey);

    sig.init(privateKey);
    sig.updateString('hallo');
    const signature = sig.sign();
    console.log(signature);

    // DSA signature validation
    const sig2 = new KJUR.crypto.Signature({ alg: 'SHA256withRSA' });
    sig2.init(publicKey);
    sig2.updateString('hallo');
    const isValid = sig2.verify(signature);
    console.log(isValid);
};
*/

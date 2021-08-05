import forge from 'node-forge';

import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { exampleCredentialToken, httpPostPublicKey } from './httpRequests';

export async function generateKeys() {
    // Generates a RSA keypair, should perhaps be moved to global state
    console.log('keys generating...');
    const walletID = `wallet-id${uuid.v4()}`;
    await AsyncStorage.setItem('walletID', walletID);
    const keys = forge.pki.rsa.generateKeyPair(1024);
    const publicKey = forge.pki.publicKeyToPem(keys.publicKey);
    const privateKey = forge.pki.privateKeyToPem(keys.privateKey);

    // Store privateKey locally and publicKey on VDR
    AsyncStorage.setItem('privateKey', privateKey);
    await httpPostPublicKey(walletID, publicKey);
}

export async function getWalletID() {
    const id = await AsyncStorage.getItem('walletID');
    return id;
}

/**
 * Creates a RS256 JWT token for a verifiable presentation.
 *
 * @param {string[]} jwtCredentialsList List of one or more JWT string credentials.
 * @param {string} audience The intended receiver of the verifiable presentation.
 * @returns A verifiable presentation JWT signed with RS256.
 */
export default async function createVerifiablePresentationJWT(jwtCredentialsList, audience, user) {
    // Convert encode with base64 and sign using RSA SHA256.
    // Taken from 'react-native-jwt-rsa', https://github.com/alvarorece/react-native-jwt-rsa/blob/master/index.js

    const removeB64Padding = (base64) => base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    function encodeB64(str) {
        const encodedB64 = forge.util.encode64(str);
        return removeB64Padding(encodedB64);
    }

    // Could be extracted as a separate util function
    const time = Math.floor(Date.now() / 1000);

    // ### HEADER

    // Header for the JWT token, will always be the same
    const header = {
        alg: 'RS256',
        typ: 'JWT',
    };

    const strHeader = JSON.stringify(header);
    const header64 = encodeB64(strHeader);

    // ### END HEADER

    // ### PAYLOAD

    // Payload lacking JTI
    const tempPayload = {
        nbf: time,
        iss: await getWalletID(),
        sub: user,
        aud: audience,
        // Will expire in 5 minutes
        exp: time + 5 * 60,
        iat: time,
        cred: jwtCredentialsList,
        nonce: uuid.v4(),
    };

    // Create JTI as base64 encoded hash of the payload
    const tempStrPayload = JSON.stringify(tempPayload);
    const tempPayload64 = encodeB64(tempStrPayload);
    const hashedJTI = forge.md.sha256.create().update(tempPayload64, 'utf8').digest().toHex();
    const hashedJTI64 = encodeB64(hashedJTI);

    // Add the JTI to the payload
    const payload = {
        ...tempPayload,
        jti: hashedJTI64,
    };

    const strPayload = JSON.stringify(payload);
    const payload64 = encodeB64(strPayload);

    // ### END PAYLOAD

    // ### SIGNATURE

    // The message to be signed
    const md = forge.md.sha256.create();
    md.update(`${header64}.${payload64}`, 'utf8');

    const privateKeyPem = await AsyncStorage.getItem('privateKey');
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);

    // The signature for the header and payload message
    const signature = privateKey.sign(md);
    const signature64 = encodeB64(signature);

    // ### END SIGNATURE

    // Concatenate the base64 encoded header, payload and signature as a JWT.
    const token = `${header64}.${payload64}.${signature64}`;
    return token;
}

import forge from 'node-forge';
import { httpPostPublicKey } from './httpRequests';

/**
 * Creates a RS256 JWT token for a verifiable presentation.
 *
 * @param {string[]} jwtCredentialsList List of one or more JWT string credentials.
 * @param {string} audience The intended receiver of the verifiable presentation.
 * @returns A verifiable presentation JWT signed with RS256.
 */
export default async function createVerifiablePresentationJWT(jwtCredentialsList, audience = 'testVerifier', userID) {
    // Convert encode with base64 and sign using RSA SHA256.
    // Taken from 'react-native-jwt-rsa', https://github.com/alvarorece/react-native-jwt-rsa/blob/master/index.js

    const removeB64Padding = (base64) => base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    function encodeB64(str) {
        const encodedB64 = forge.util.encode64(str);
        return removeB64Padding(encodedB64);
    }

    // Could be extracted as a separate util function
    const time = Math.floor(Date.now() / 1000);

    // Header for the JWT token, will always be the same
    const header = {
        alg: 'RS256',
        typ: 'JWT',
    };

    // Create the payload using the provided parameters
    const payload = {
        // TODO: Assign proper subject
        iss: 'walletId5547981c-9477-4a83-918b-b22fe89bd3cb',
        sub: 'testSub',
        aud: audience,
        // Will expire in 5 minutes
        exp: time + 300,
        iat: time,
        // TODO: Improve random generation of unique ID
        jti: Math.floor(Math.random() * 100000000),
        cred: jwtCredentialsList,
        userID: userID,
    };

    const strHeader = JSON.stringify(header);
    const strPayload = JSON.stringify(payload);

    const header64 = encodeB64(strHeader);
    const payload64 = encodeB64(strPayload);

    // The message to be signed
    const preHash = `${header64}.${payload64}`;
    const md = forge.md.sha256.create();
    md.update(preHash, 'utf8');

    // Generates a RSA keypair, should perhaps be moved to global state
    const key = forge.pki.rsa.generateKeyPair(2048);
    const publicKey = forge.pki.publicKeyToPem(key.publicKey);
    await httpPostPublicKey(payload.iss, publicKey);
    console.log(forge.pki.publicKeyToPem(key.publicKey));
    console.log(forge.pki.privateKeyToPem(key.privateKey));

    // The signature for the header and payload message
    const signature = key.privateKey.sign(md);
    const signature64 = encodeB64(signature);

    // Concatenate the base64 encoded header, payload and signature as a JWT.
    const token = `${header64}.${payload64}.${signature64}`;
    return token;
}

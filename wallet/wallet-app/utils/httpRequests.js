const host = 'localhost';

const issuerUrl = `http://${host}:8083/api`;
const verifierUrl = `http://${host}:8080/api`;
const vdrUrl = `http://${host}:8083/vdr`;

/**
 * Fetches a verifiable credential from an issuer using HTTP GET.
 *
 * @param {string} vcType The type of credential to request
 * @param {string} baseVC JWT-encoded base VC (root identity)
 * @param {string} issuer The issuer to request from (should be removed when issuers are separated)
 * @returns {string} A verifiable credential JWT string
 */
export async function httpGetCredential(vcType, baseVC, issuer) {
    const url = `${issuerUrl}/getVC/`;
    const response = await fetch(`${url}?type=${vcType}&baseVC=${baseVC}&issuer=${issuer}`); // , requestOptions);
    const payload = await response.text();
    return payload;
}

/**
 * Sends a verifiable presnetation to a verifier using HTTP POST.
 *
 * @param {token} token A JWT-encoded Verifiable Presentation
 * @returns {boolean} True if the request was succesful, false if not
 */

export async function httpSendPresentation(token) {
    const url = `${verifierUrl}/sendVP`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: token,
        });
        if (response.ok) {
            return true;
        }
        return false;
    } catch (error) {
        // eslint-disable-next-line no-alert
        alert('Noe gikk galt...');
        return false;
    }
}

/**
 * Fetches the available VC types for a given issuer
 *
 * @param {string} issuer The issuer to get available types for
 * @returns {string[]} The VC types the selected issuer is offering
 */
export async function httpGetTypesFromIssuer(issuer) {
    const url = `${vdrUrl}/getTypes/${issuer}`;
    const response = await fetch(url);
    const payload = JSON.parse(await response.text());
    return payload;
}

/**
 * Fetches all the issuers available in the VDR
 *
 * @returns {string[]} List of available issuers
 */

export async function httpGetAllIssuers() {
    const url = `${vdrUrl}/getAllIssuers`;
    const response = await fetch(url);
    const payload = JSON.parse(await response.text());
    return payload;
}

/**
 * Publishes the wallet's public key to the VDR, using HTTP POST
 *
 * @param {string} id The id of the wallet
 * @param {string} key A PEM-encoded public key
 * @returns True if the key is successfully posted, false if not
 */
export async function httpPostPublicKey(id, key) {
    const url = `${vdrUrl}/postKey`;

    try {
        const response = await fetch(`${url}?userID=${id}`, {
            method: 'POST',
            body: key,
        });

        if (response.ok) {
            return true;
        }
        return false;
    } catch (error) {
        // eslint-disable-next-line no-alert
        alert('Noe gikk galt...');
        return false;
    }
}

/**
 * Fetches an issuer's public key (RS256)
 * The format of the key is not yet standardized (e.g. PEM)
 *
 * @param {string} id The id of the issuer
 * @returns {string} The public key as base64
 */
export async function httpGetIssuerKey(id) {
    const url = `${vdrUrl}/key/`;
    const response = await fetch(`${url}${id}`);
    const payload = await response.text();
    return payload;
}

/** Example VC JWT for development purposes */
export const exampleCredentialToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0U3ViIiwiaXNzIjoidGVzdElzcyIsImV4cCI6MTYyNjY4MTEwNCwiaWF0IjoxNjI1NDcxNTA0LCJ2YyI6Ik92ZXItMTgiLCJqdGkiOiJodHRwOi8vbG9jYWxob3N0OjgwODMvY3JlZGVudGlhbHMvMSJ9.Qv-dEjixipuDE_StkkmlpXecwOfdG0v6YgNHv5wJ3NQ';

/** Example VP JWT for development purposes */
export const examplePresentationToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0U3ViIiwiYXVkIjoidmVyaWZpZXIiLCJleHAiOjE3MTg0NDU2MDAsImlhdCI6MTYyMzc1MTIwMCwianRpIjoxMDAwMDAwMDAsImNyZWQiOlsiZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnpkV0lpT2lKMFpYTjBVM1ZpSWl3aWFYTnpJam9pVGxST1ZTSXNJbVY0Y0NJNk1UY3hPRFEwTlRZd01Dd2lhV0YwSWpveE5qSXpOelV4TWpBd0xDSjJZeUk2SW1WeUxYTjVhMlZ3YkdWcFpYSWlMQ0pxZEdraU9pSnlZVzVrYjIxSlJDMXplV3RsY0d4bGFXVnlJbjAuWWllZzRTQWpSMnJ6RmFRZjhJNzdmNnFPbFJuQ1R4Yk1DYTkzazV0MHRObyJdfQ.MFkCcDXQ6rZUJLCq5_tcGPgqkR0JlATlzlfRBUP7yPE';

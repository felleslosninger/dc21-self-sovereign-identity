const host = 'localhost';

const issuerUrl = `http://${host}:8083/`;
const verifierUrl = `http://${host}:8080/api/`;
const vdrUrl = `http://${host}:8083/vdr`;

export async function httpGetCredential(vcType, baseVC, issuer) {
    const url = `${issuerUrl}api/getVC/`;
    const response = await fetch(`${url}?type=${vcType}&baseVC=${baseVC}&issuer=${issuer}`); // , requestOptions);
    const payload = await response.text();

    return payload;
}

// Utdatert
/*
export async function httpSendCredential(token) {
    const url = `${verifierUrl}/sendCredential`;

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
*/

export async function httpSendPresentation(token) {
    const url = `${verifierUrl}sendVP`;

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

export async function httpGetTypesFromIssuer(issuer) {
    const url = `${vdrUrl}/getTypes/${issuer}`;
    const response = await fetch(url);
    const payload = await response.text();
    return payload;
}

export async function httpGetAllIssuers() {
    const url = `${vdrUrl}/getAllIssuers`;
    const response = await fetch(url);
    const payload = await response.text();
    return payload;
}

export async function httpPostPublicKey(id, key) {
    const url = `${issuerUrl}vdr/postKey`;

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

export async function httpGetIssuerKey(id) {
    const url = `${issuerUrl}vdr/key/`;
    const response = await fetch(`${url}${id}`);
    const payload = await response.text();
    return payload;
}

export const exampleCredentialToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0U3ViIiwiaXNzIjoidGVzdElzcyIsImV4cCI6MTYyNjY4MTEwNCwiaWF0IjoxNjI1NDcxNTA0LCJ2YyI6Ik92ZXItMTgiLCJqdGkiOiJodHRwOi8vbG9jYWxob3N0OjgwODMvY3JlZGVudGlhbHMvMSJ9.Qv-dEjixipuDE_StkkmlpXecwOfdG0v6YgNHv5wJ3NQ';

export const examplePresentationToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0U3ViIiwiYXVkIjoidmVyaWZpZXIiLCJleHAiOjE3MTg0NDU2MDAsImlhdCI6MTYyMzc1MTIwMCwianRpIjoxMDAwMDAwMDAsImNyZWQiOlsiZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnpkV0lpT2lKMFpYTjBVM1ZpSWl3aWFYTnpJam9pVGxST1ZTSXNJbVY0Y0NJNk1UY3hPRFEwTlRZd01Dd2lhV0YwSWpveE5qSXpOelV4TWpBd0xDSjJZeUk2SW1WeUxYTjVhMlZ3YkdWcFpYSWlMQ0pxZEdraU9pSnlZVzVrYjIxSlJDMXplV3RsY0d4bGFXVnlJbjAuWWllZzRTQWpSMnJ6RmFRZjhJNzdmNnFPbFJuQ1R4Yk1DYTkzazV0MHRObyJdfQ.MFkCcDXQ6rZUJLCq5_tcGPgqkR0JlATlzlfRBUP7yPE';

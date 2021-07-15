const issuerUrl = 'http://localhost:8083/';
const verifierUrl = 'http://localhost:8080/api/';

export async function httpGetCredential(vcType, baseVC) {
    const url = `${issuerUrl}api/getVC/`;
    const response = await fetch(`${url}?type=${vcType}&baseVC=${baseVC}`); // , requestOptions);
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

export async function httpPostPublicKey(id, key) {
    const url = `${issuerUrl}vdr/postKey`;

    try {
        
        const response = await fetch(`${url}?userID=${id}`, {
            method: 'POST',
            body: key,
        });
        
        if (response.ok) {
            console.log(response.text());
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
    console.log(payload);
    return payload;

}

export const exampleCredentialToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0U3ViIiwiaXNzIjoidGVzdElzcyIsImV4cCI6MTYyNjY4MTEwNCwiaWF0IjoxNjI1NDcxNTA0LCJ2YyI6Ik92ZXItMTgiLCJqdGkiOiJodHRwOi8vbG9jYWxob3N0OjgwODMvY3JlZGVudGlhbHMvMSJ9.Qv-dEjixipuDE_StkkmlpXecwOfdG0v6YgNHv5wJ3NQ';

export const examplePresentationToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0U3ViIiwiYXVkIjoidmVyaWZpZXIiLCJleHAiOjE3MTg0NDU2MDAsImlhdCI6MTYyMzc1MTIwMCwianRpIjoxMDAwMDAwMDAsImNyZWQiOlsiZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnpkV0lpT2lKMFpYTjBVM1ZpSWl3aWFYTnpJam9pVGxST1ZTSXNJbVY0Y0NJNk1UY3hPRFEwTlRZd01Dd2lhV0YwSWpveE5qSXpOelV4TWpBd0xDSjJZeUk2SW1WeUxYTjVhMlZ3YkdWcFpYSWlMQ0pxZEdraU9pSnlZVzVrYjIxSlJDMXplV3RsY0d4bGFXVnlJbjAuWWllZzRTQWpSMnJ6RmFRZjhJNzdmNnFPbFJuQ1R4Yk1DYTkzazV0MHRObyJdfQ.MFkCcDXQ6rZUJLCq5_tcGPgqkR0JlATlzlfRBUP7yPE';

export const exampleBaseVc =
'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwODA4OTQwOTM4MiIsImlzcyI6IkdydW5uSUQtcG9ydGFsZW4ubm8wZTQwOWRiZS00ZjI4LTQ2MjItYThhNS1mNjBmMjdhZjg5OWEiLCJleHAiOjE2Mjc1NDUxODMsImlhdCI6MTYyNjMzNTU4MywidmMiOnsiY3JlZGVudGlhbFN1YmplY3QiOnsiYmFzZWlkIjp7Im5hbWUiOiJCYXNlSUQiLCJ0eXBlIjoiQmFzZUlEIn19LCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiQmFzZUNyZWRlbnRpYWwiXSwiQGNvbnRleHQiOlsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiXX0sImp0aSI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4My9jcmVkZW50aWFscy8xIn0.fh1UZG5ERw_PfMR7C3Fjn8vdEjv1QCv2OwKhrIQ9X8QJmR2LDgrDJXpGbD8zI_f03Zk9gEReKkCRHVM5X5IkUhVel3uhIDhVMEn9w2QzNgjrouWoOPC3dlKq51yT6l_QL47pzgxp15bb2Z_yxfHzXYc8V4YCZl1KimyI04McbRrx2eyTHvD_o8SYdKzKymExuc7lsU5j_h5x76ZkfU0EwJIi28zNkaKNofiJwtOaTIWrYa688nRRAbeaeWroA83NFZd-2HUtrqYyNtAvOtra9hzYfzG545P2tq4JJNeuR8i4zzD5hgh3PrNg1P4ZgclM6_FUl-b-UN1ngSf6SrH5Yg';
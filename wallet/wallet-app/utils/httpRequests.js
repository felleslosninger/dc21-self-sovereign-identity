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
        /*
        const response = await fetch(url, {
            method: 'POST',
            body: key,
        });
        */
        const response = await fetch(`${url}?id=${id}&key=${key}`);
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

export const exampleCredentialToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0U3ViIiwiaXNzIjoidGVzdElzcyIsImV4cCI6MTYyNjY4MTEwNCwiaWF0IjoxNjI1NDcxNTA0LCJ2YyI6Ik92ZXItMTgiLCJqdGkiOiJodHRwOi8vbG9jYWxob3N0OjgwODMvY3JlZGVudGlhbHMvMSJ9.Qv-dEjixipuDE_StkkmlpXecwOfdG0v6YgNHv5wJ3NQ';

export const examplePresentationToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0U3ViIiwiYXVkIjoidmVyaWZpZXIiLCJleHAiOjE3MTg0NDU2MDAsImlhdCI6MTYyMzc1MTIwMCwianRpIjoxMDAwMDAwMDAsImNyZWQiOlsiZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnpkV0lpT2lKMFpYTjBVM1ZpSWl3aWFYTnpJam9pVGxST1ZTSXNJbVY0Y0NJNk1UY3hPRFEwTlRZd01Dd2lhV0YwSWpveE5qSXpOelV4TWpBd0xDSjJZeUk2SW1WeUxYTjVhMlZ3YkdWcFpYSWlMQ0pxZEdraU9pSnlZVzVrYjIxSlJDMXplV3RsY0d4bGFXVnlJbjAuWWllZzRTQWpSMnJ6RmFRZjhJNzdmNnFPbFJuQ1R4Yk1DYTkzazV0MHRObyJdfQ.MFkCcDXQ6rZUJLCq5_tcGPgqkR0JlATlzlfRBUP7yPE';

export const exampleBaseVc = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwODA4OTQwOTM4MiIsImlzcyI6IkdydW5uSUQtcG9ydGFsZW4ubm82NDY0ZmY5ZS03NjFkLTQ0ZDMtODU3Ni0wZDQ0MTY3Yzg1MDkiLCJleHAiOjE2Mjc0Nzk3MDEsImlhdCI6MTYyNjI3MDEwMSwidmMiOnsiY3JlZGVudGlhbFN1YmplY3QiOnsiYmFzZWlkIjp7Im5hbWUiOiJCYXNlSUQiLCJ0eXBlIjoiQmFzZUlEIn19LCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiQmFzZUNyZWRlbnRpYWwiXSwiQGNvbnRleHQiOlsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiXX0sImp0aSI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4My9jcmVkZW50aWFscy8xIn0.FlTiZx0to21bl_w_TZYSbjrVmCtd2Mci37YKQwTgRiQ7gmJEwb2zUTtAQTfpnx0dY6J-EKTcTUfXWTwTwXVNepyQXMVweyCTKW3SlmgQib6q_IeEtq0uVOM0n7qayO87M3g5eVqLZOhJaIj4_7Y7kon7biyIOeOVsuG-y_iTIcBs62NykuCFbybDSzKg3GncsdddgGN_nRWxJvzPZgyZHeNpXhE06gplhKajB3PQOJV_U40GAzGmWwd1lajNDOASeH2gLKuHZIxLKjTVhyYQ4YzN77gGM2Dojc_TJZGhcat29eBOwFlSU1BspjWOqYYIZFxR-C6qMuQvi3Jzq8MqLQ'
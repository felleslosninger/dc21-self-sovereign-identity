const issuerUrl = 'http://localhost:8083/api/';
const verifierUrl = 'http://localhost:8080/api/';

export async function httpGetCredential(statement) {
    const url = `${issuerUrl}getCredential/`;
    const response = await fetch(url + statement); // , requestOptions);
    const payload = await response.text();
    return payload;
}

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

export const exampleToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0U3ViIiwiaXNzIjoidGVzdElzcyIsImV4cCI6MTYyNjY4MTEwNCwiaWF0IjoxNjI1NDcxNTA0LCJ2YyI6Ik92ZXItMTgiLCJqdGkiOiJodHRwOi8vbG9jYWxob3N0OjgwODMvY3JlZGVudGlhbHMvMSJ9.Qv-dEjixipuDE_StkkmlpXecwOfdG0v6YgNHv5wJ3NQ';

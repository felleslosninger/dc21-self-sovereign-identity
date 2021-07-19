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
'eyJraWQiOiJjWmswME1rbTVIQzRnN3Z0NmNwUDVGSFpMS0pzdzhmQkFJdUZiUzRSVEQ0IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoiUTdGVHNfZFhfRk54UnVEdTFzM2lVZyIsInN1YiI6IksyV1FXbGRjTlhRS0NSUWFRVnE0VldHQWdjVWM1VzBtTWZhNmFzaGR2WW89IiwiYW1yIjpbIk1pbmlkLVBJTiJdLCJpc3MiOiJodHRwczpcL1wvb2lkYy10ZXN0MS5kaWZpLmVvbi5ub1wvaWRwb3J0ZW4tb2lkYy1wcm92aWRlclwvIiwicGlkIjoiMDgwODk0MDYzMTYiLCJsb2NhbGUiOiJuYiIsIm5vbmNlIjoiUkZkX3kxTk1JZk5lcGhobHNJMDdQZTJiMkY0WThSd3JCdzllUWpLMWQycyIsInNpZCI6IjJPMWRGWDVhRmxXY3hnaXRuVFZORUFDQldFYTF1bjB3U3hGT2tJRkJNVUUiLCJhdWQiOiJvaWRjX2RpZ2RpcmNhbXAyMV9pc3N1ZXJfdGVzdDEiLCJhY3IiOiJMZXZlbDMiLCJhdXRoX3RpbWUiOjE2MjY3MDE3MzUsImV4cCI6MTYyNjcwMjA5MiwiaWF0IjoxNjI2NzAxOTcyLCJqdGkiOiI4QmEydzl3UEV6NzNibnBvN1hqcmRYWVJaSWxTSkJHZjJ5WjkxMWhUVXNZIn0.UjKwSk1jL19HDLj8JrHpoDEA5B-ePxv28kW4NhyzYHS4CQkSPOKuloEF08ibpA7VzyYA--Viow6wUdGt9hYwtSvPUi7wtxSkISG31PRe4EuVApJpWkMAQgib1blDlbh1tZ-U3NAwo5L_wclcwIKN9V4vVBLO_nW7NjhWlzalEIDvUh4W2tE_yNTBNGmE5rkRrrEFlfnZ_eZD2qZHDzdSgtI90hYnH6eiTWcQJZlNNwWVm4mh_y0QO80AZFZ00npYCjS1AjzTHm4qo02Tvt3PP6pO8rSGWKnqWvo7K5V05VkE6cAR3AqlM5oHkT-9h4S2L7-ZDxNZFQlkjBuwD7CX0w';
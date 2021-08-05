/* eslint-disable no-alert */
const host = '192.168.137.191';

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
    const response = await fetch(`${url}?type=${vcType}&baseVC=${baseVC}&issuer=${issuer}`);
    const payload = await response.text();
    return payload;
}

/**
 * Sends a verifiable presentation to a verifier using HTTP POST.
 *
 * @param {string} token A JWT-encoded verifiable presentation
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
        alert('Noe gikk galt med presentation');
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
    const payload = await response.text();
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
    const payload = await response.text();
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
        alert('Noe gikk galt med public key');
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
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwODA4OTQwODA4NCIsImlzcyI6IlV0c2VkZXJBdkJldmlzLm5vZWQ4M2JlNDctYjJmNy00ZmIyLTkzNDEtOWE3MTBjOWM3ZWFkIiwiZXhwIjoxNjI3OTg5NDU5LCJpYXQiOjE2MjY3Nzk4NTksInZjIjp7ImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImFnZSI6eyJuYW1lIjoiT3ZlciAxOCIsInR5cGUiOiJvdmVyLTE4In19LCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiQWdlQ3JlZGVudGlhbCJdLCJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdfSwianRpIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgzL2NyZWRlbnRpYWxzLzEifQ.AGa0bo7lTdRqHfAx6bbS34sW4DwNhMMHsqd_riorZ2Yf3zEafMXV-_QmBIHxamuVy_8Neq7qz7vnAe6o5Ej8Vs6K98Z_H5IxeZ64bfN-qTq2WBadskSmggLCYveTl_O5xc5vKrV3i3YtTcFcaaMbOPCl3EszjKZNrh6YwZZXZkdOmSnqHHKalv1XXaJmc_pjr4s44DSxQoxf-y4zQxCUcFB8zIgRgIp1GMVGW2iyZhCEctMdI3oAQtoIG5umCZi-oDqBWZj1-PI1tnQyMxWNaHyWoqGuTP_XfAiXxZfF7LEpLp88WPtbVROw6l7x2qorFxWVLYmXFUYo1FYjAntVxA';

/** Example VP JWT for development purposes */
export const examplePresentationToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0U3ViIiwiYXVkIjoidmVyaWZpZXIiLCJleHAiOjE3MTg0NDU2MDAsImlhdCI6MTYyMzc1MTIwMCwianRpIjoxMDAwMDAwMDAsImNyZWQiOlsiZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6STFOaUo5LmV5SnpkV0lpT2lKMFpYTjBVM1ZpSWl3aWFYTnpJam9pVGxST1ZTSXNJbVY0Y0NJNk1UY3hPRFEwTlRZd01Dd2lhV0YwSWpveE5qSXpOelV4TWpBd0xDSjJZeUk2SW1WeUxYTjVhMlZ3YkdWcFpYSWlMQ0pxZEdraU9pSnlZVzVrYjIxSlJDMXplV3RsY0d4bGFXVnlJbjAuWWllZzRTQWpSMnJ6RmFRZjhJNzdmNnFPbFJuQ1R4Yk1DYTkzazV0MHRObyJdfQ.MFkCcDXQ6rZUJLCq5_tcGPgqkR0JlATlzlfRBUP7yPE';

export const exampleBaseVc =
    'eyJraWQiOiJjWmswME1rbTVIQzRnN3Z0NmNwUDVGSFpMS0pzdzhmQkFJdUZiUzRSVEQ0IiwiYWxnIjoiUlMyNTYifQ.eyJhdF9oYXNoIjoiUTdGVHNfZFhfRk54UnVEdTFzM2lVZyIsInN1YiI6IksyV1FXbGRjTlhRS0NSUWFRVnE0VldHQWdjVWM1VzBtTWZhNmFzaGR2WW89IiwiYW1yIjpbIk1pbmlkLVBJTiJdLCJpc3MiOiJodHRwczpcL1wvb2lkYy10ZXN0MS5kaWZpLmVvbi5ub1wvaWRwb3J0ZW4tb2lkYy1wcm92aWRlclwvIiwicGlkIjoiMDgwODk0MDYzMTYiLCJsb2NhbGUiOiJuYiIsIm5vbmNlIjoiUkZkX3kxTk1JZk5lcGhobHNJMDdQZTJiMkY0WThSd3JCdzllUWpLMWQycyIsInNpZCI6IjJPMWRGWDVhRmxXY3hnaXRuVFZORUFDQldFYTF1bjB3U3hGT2tJRkJNVUUiLCJhdWQiOiJvaWRjX2RpZ2RpcmNhbXAyMV9pc3N1ZXJfdGVzdDEiLCJhY3IiOiJMZXZlbDMiLCJhdXRoX3RpbWUiOjE2MjY3MDE3MzUsImV4cCI6MTYyNjcwMjA5MiwiaWF0IjoxNjI2NzAxOTcyLCJqdGkiOiI4QmEydzl3UEV6NzNibnBvN1hqcmRYWVJaSWxTSkJHZjJ5WjkxMWhUVXNZIn0.UjKwSk1jL19HDLj8JrHpoDEA5B-ePxv28kW4NhyzYHS4CQkSPOKuloEF08ibpA7VzyYA--Viow6wUdGt9hYwtSvPUi7wtxSkISG31PRe4EuVApJpWkMAQgib1blDlbh1tZ-U3NAwo5L_wclcwIKN9V4vVBLO_nW7NjhWlzalEIDvUh4W2tE_yNTBNGmE5rkRrrEFlfnZ_eZD2qZHDzdSgtI90hYnH6eiTWcQJZlNNwWVm4mh_y0QO80AZFZ00npYCjS1AjzTHm4qo02Tvt3PP6pO8rSGWKnqWvo7K5V05VkE6cAR3AqlM5oHkT-9h4S2L7-ZDxNZFQlkjBuwD7CX0w';

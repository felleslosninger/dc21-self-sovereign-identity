export async function httpGetCredential(statement) {
  let url = 'http://localhost:8083/api/getCredential/';

  /*const requestOptions = {
            method: 'GET',
            headers: {'Conent-Type': 'text/html',
                    "access-control-allow-origin" : "*"},
    };*/
  let response = await fetch(url + statement); //, requestOptions);
  let payload = await response.text();
  console.log(payload);
  return payload;
}

export async function httpSendCredential(credential) {
  let url = 'http://localhost:8080/api/verify/';
  let response = await fetch(url + credential);
  console.log(response);
  return true;
}

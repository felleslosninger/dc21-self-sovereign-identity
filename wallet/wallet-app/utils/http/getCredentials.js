{/* helt enkelt
getCredentials() {
fetch('https://examples.com/data.json'); */}

}
const saveCredentials = async () => {
    try {
        let response = await fetch(
          'https://jsonplaceholder.typicode.com/posts'
        );
        let json = await response.json();
        console.log(response);
        return json.posts; //??? movies og examples.com
      } catch (error) {
         console.error(error);
  }
};
{/* bruker then() i stedenfor await/async
fetch('http://example.com/movies.json')
  .then(response => response.json())
  .then(data => console.log(data));
*/}

saveCredentials() 
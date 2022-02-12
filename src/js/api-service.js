export const BASE_URL = 'https://restcountries.com';

function fetchCountries(name) {                        
   return fetch(`${BASE_URL}/v3.1/name/${name}`)
    .then(response => response.json())
    .catch(err => console.log(err));
}

 function filterCountries(name) {   
    return fetch(`${BASE_URL}/v2/name/${name}?fields=name,capital,population,flag,languages`)
        .then(response => response.json())
        .catch(error => console.log(error));
 }

 
export default {fetchCountries, filterCountries };
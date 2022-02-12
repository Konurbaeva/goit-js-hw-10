import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import BASE_URL from "./js/api-service.js";
import singleCountryTemplate from './templates/singleCountryTemplate.hbs';
import multipleCountriesTemplate from './templates/multipleCountriesTemplate.hbs';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('input#search-box');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(filterCountriesChange, DEBOUNCE_DELAY));

function filterCountriesChange() {
  BASE_URL.filterCountries(searchBox.value)
    .then(checkResponse)
    .catch(onFetchError);
}

function checkResponse(response) {
    if(response.message === 'Not Found' || response.message === 'Page Not Found'){
      Notiflix.Notify.failure("Oops, there is no country with that name");
    } else if (response.length > 10) {
      Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    } 
    
    renderCountry(response);
}
  function onFetchError(error) {
    console.error(error);
    Notiflix.Notify.failure('error: ', error);
   }

   function renderCountry(response) {
    if(response.length > 1 && response.length < 10) {
      const multipleCountriesMarkup = multipleCountriesTemplate(response).trim()
      countryInfo.innerHTML = multipleCountriesMarkup;
    } else if(response.length === 1){
      const singleCountryMarkup = singleCountryTemplate(response).trim()
      countryInfo.innerHTML = singleCountryMarkup;
    } else {
      countryInfo.innerHTML = '';
    }
   }
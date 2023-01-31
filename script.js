const $ = (selector) => document.getElementById(selector); // Function to not repeat "document.getElementById"

/* Grab documents elements */
const $form = $("form");
const $countriesSelect = $("countries-select");
const $button = $("button");
const $result = $("result");

/* Function to load the data of all countries */
const getCountries = async () => await fetch("https://restcountries.com/v3.1/all").then((response) => response.json());

/* Function to display country names in the "select" tag */
const showCountries = (countries) => {
  const fragment = document.createDocumentFragment();
  for (const country of countries) {
    const option = document.createElement("option");
    option.textContent = country.name.common;
    fragment.appendChild(option);
  }
  $countriesSelect.appendChild(fragment);
};

/* Function to display the country flag depending on the selected country */
const showFlag = (data, value) => {
  const country = data.find((country) => country.name.common === value);
  $result.innerHTML = `<img src="${country.flags.svg}" alt="${country.name.common} Flag">`;
};

getCountries().then((countries) => showCountries(countries)); // Calling the function "getCountries" to load the names at the first moment

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  $button.setAttribute("disabled", true);
  $button.setAttribute("aria-busy", true);
  getCountries().then((countries) => {
    setTimeout(() => { // This "setTimeOut" is just to simulate a charging time
      showFlag(countries, $countriesSelect.value);
      $button.removeAttribute("disabled");
      $button.removeAttribute("aria-busy");
    }, 300);
  });
});

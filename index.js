const countryCard = document.querySelector(".countries-container");
let rangeValue;
let allCountries = {};
let sortSettings = 2;


const fetchCountry = async () => {
    await fetch("https://restcountries.com/v3.1/all")
        .then((res) => res.json())
        .then((data) => allCountries = data);

    createCountryCard();
};
const createCountryCard = () => {
    countryCard.innerHTML = allCountries
    .filter((country) => country.name.common.toLowerCase().includes(inputSearch.value.toLowerCase()))
    .sort((a, b) => {
        if (sortSettings === 1) {
            return a.population - b.population;
        } else if (sortSettings === 2) {
            return b.population - a.population;
        } else if (sortSettings === 3) {
            if (a.name.common < b.name.common) {return -1;}
            if (a.name.common > b.name.common) {return 1;}
        }
    })
    .slice(0, rangeValue)
    .map((country) => `
    <div class="country-card">
        <img src="${country.flags.png}">
        <h2>${country.name.common}<h2>
        <h3>${country.capital}<h3>
        <p>Population : ${country.population}<p>
    </div>
    `).join("");
};
fetchCountry();

inputRange.addEventListener("input", (e) => {
    rangeValue = parseInt(e.target.value);
    rangeSpan.textContent = e.target.value;
    createCountryCard();
});
inputSearch.addEventListener("input", () => {
    createCountryCard();
});
minToMax.addEventListener("click", () => {
    sortSettings = 1;
    createCountryCard();
});
maxToMin.addEventListener("click", () => {
    sortSettings = 2;
    createCountryCard();
});
alpha.addEventListener("click", () => {
    sortSettings = 3;
    createCountryCard();
});
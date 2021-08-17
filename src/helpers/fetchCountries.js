
export const getAllCountries = async () => {
    const url = `https://restcountries.eu/rest/v2/all`;
    const dataCountries = await fetch(url);
    const dataJSON = await dataCountries.json();
    const dataFiltered = dataJSON.map(c => {
        return{
            name:c.name,
            population:c.population,
            region:c.region,
            capital:c.capital
        }
    });
    return dataFiltered ;
}


export const getCountryByName = (name) => {
    const url = `https://restcountries.eu/rest/v2/name/${name}`;
    const dataCountry = fetch(url);
    const dataCountryJson = dataCountry.json();
    const dataFiltered = dataCountryJson.map(c => {
        return{
            name:c.name,
            nativeName:c.nativeName,
            population:c.population,
            region:c.region,
            subregion:c.subregion,
            capital:c.capital,
            topLevelDomain:c.topLevelDomain,
            currencies:c.currencies,
            languages:c.languages,
            borderCountries:c.borders
        }
    });

    return dataFiltered;
}


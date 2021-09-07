import React from 'react';

import { CountryItem } from './CountryItem';

export const CountriesList = ({countries}) => {

    return (
        <div className="card__list">
            {
                countries && countries.map(c => ( 
                    <CountryItem 
                        key={c.id}
                        borders={c.borders}
                        id={c.id}
                        name={c.name}
                        nativeName={c.nativeName}
                        population={c.population}
                        subregion={c.subregion}
                        topLevelDomain={c.topLevelDomain}
                        currencies={c.currencies}
                        languages={c.languages}
                        borderCountries={c.borders}
                        region={c.region}
                        capital={c.capital}
                        flag={c.flag}/>    
                ))
            }
        </div>
    )
}

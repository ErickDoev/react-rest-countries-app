import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setActiveCountry } from '../slices/countrySlice';

export const CountryItem = (
    {   
        id,
        name,
        nativeName,
        population,
        region,
        subregion,
        topLevelDomain,
        capital,
        currencies,
        flag,
        languages,
        borderCountries
    }
    
    ) => {

    const dispatch = useDispatch();
    const handleActiveCountry = () => {
        dispatch(setActiveCountry({id,
            name,
            nativeName,
            population,
            region,
            subregion,
            topLevelDomain,
            capital,
            currencies,
            flag,
            languages,
            borderCountries}));
    }
    return (

        <Link 
            to={`./country/${name.replace(/\s+/g, "-").toLowerCase()}`}
            onClick={handleActiveCountry}>
            <div className="card">
                <div className="card__img">
                    <img src={flag} alt={name}/>
                </div>
                <div className="card__content">
                    <div className="card__title">
                        <h3>{name}</h3>
                    </div>
                    <div className="card__body">
                        <p>Population: {population}</p>
                        <p>Region: {region}</p>
                        <p>Capital: {capital}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export const Country = () => {
   
    const {active} = useSelector(state => state.country);
    if(!active){
        return <Redirect to='/'/>
    }
    console.log(active.borderCountries);
    return (
        <div >
            <p>{active.name}</p>
            <p>Native name: {active.nativeName}</p>
            <p>Population:{active.population}</p>
            <p>Region:{active.region}</p>
            <p>Subregion:{active.subregion}</p>
            <p>Capital:{active.subregion}</p>
            <p>Top Level Domain:{active.topLevelDomain}</p>
            <p>Currencies:{active.currencies.map(c=>c.name)}</p>
            <p>Languages:{active.languages.map(l=>l.name)}</p>  
            <p>Border Countries: </p>
        </div>
    )
}

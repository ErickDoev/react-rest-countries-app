import React, {  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterCountriesByName, filterCountriesByRegion } from '../slices/countrySlice';
import { CountriesList } from './CountriesList';

export const CountryInput = () => {

    const {countriesFiltered} = useSelector(state => state.country);
    const [inputValue, setInputValue] = useState({
        name:'',
        region:''
    });
    const {name} = inputValue;
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
            
        setInputValue({
            ...inputValue,
            [e.target.name]:e.target.value,
            
        });   
        
        dispatch(filterCountriesByName(e.target.value));
    }

    const handleSelectChange = (e) => {

        setInputValue({...inputValue})

        dispatch(filterCountriesByRegion({region:e.target.value,name}));
    }

    return (
        <div>
            
            <div className="input-main">
                <div className="input-content">
                    <i className="fas fa-search"></i>
                    <input 
                        placeholder="Search for a country..."
                        className="input"
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleInputChange}/>
                </div>
                
                <select 
                    className="input-region"
                    name="region" 
                    onChange={handleSelectChange}
                    >
                        <option selected disabled>Filter by a Region</option>
                        <option value="World">World</option>
                        <option value="Africa">Africa</option>
                        <option value="Americas">America</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                </select>
            </div>

            <CountriesList 
                countries={countriesFiltered}/>   
        </div>
    )
}

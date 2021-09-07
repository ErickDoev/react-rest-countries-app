import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCountries = createAsyncThunk(
    "countries/getCountries",
    async (sech,{dispatch}) => {
        const url = `https://restcountries.eu/rest/v2/all`;
        const response = await fetch(url);
        const data = await response.json();
        const dataFiltered = data.map(c => {
            return{
                name:c.name,
                borders:c.borders,
                nativeName:c.nativeName,
                population:c.population,
                region:c.region,
                subregion:c.subregion,
                capital:c.capital,
                topLevelDomain:c.topLevelDomain,
                currencies:c.currencies,
                languages:c.languages,
                borderCountries:c.borderCountries,
                flag:c.flag, 
                id:c.numericCode,
                code:c.alpha3Code
            }
        });
        dispatch(getAllCountries(dataFiltered));
        return dataFiltered;
    }
);

export const getCountryByName = createAsyncThunk(
    "countries/getCountyByName",
    async (name) => {
        const url = `https://restcountries.eu/rest/v2/name/${name}`;
        const response = await fetch(url);
        const data = await response.json();
        const dataFiltered = data.map(c => {
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
                borderCountries:c.borders,
                flag:c.flag, 
                id:c.numericCode,
                code:c.alpha3Code
            }
        });
        return dataFiltered;
    }
)

export const getCountriesByCodes = createAsyncThunk(
    "countries/getCountriesByCode",
    async (codes,{dispatch}) => {
        const url = `https://restcountries.eu/rest/v2/alpha?codes=${codes};`;
        const resp = await fetch(url);
        const data = await resp.json();
        const dataFiltered = data.map(e => {
            return {
                name:e.name,
                alphacode:e.alpha3Code
            }
        })
        dispatch(setCountriesByCode(dataFiltered)); 
        return dataFiltered;  
    }
)

const initialState = {
    data:null,
    countriesFiltered:null,
    active:null,
    loading:null,
    status:null,
    countryStatus:null,
    countriesByCode: null
}
export const countrySlice = createSlice({
    name: 'country',
    initialState,
    reducers: {
        getAllCountries:(state,action) => {
            state.countriesFiltered=action.payload
        },
        filterCountriesByName: (state,action) => {
            console.log(action.payload);
            if(action.payload === ''){
                state.countriesFiltered = state.data;
            }else{
                state.countriesFiltered = state.data.filter(c => c.name.toLowerCase().includes(action.payload.toLowerCase()));
            }
        },
        filterCountriesByRegion: (state,action) => {
            
            if(action.payload.name === '' && action.payload.region === 'World'){
                state.countriesFiltered = state.data;
            }else{
                state.countriesFiltered = state.data.filter(c => c.name.toLowerCase().includes(action.payload.name.toLowerCase()) && c.region === action.payload.region);
            }
        },
        setActiveCountry: (state,action) => {
            state.active=action.payload
        },
        setCountriesByCode:(state,action) => {
            state.countriesByCode=action.payload
        },
        setActiveCountryByAlphaCode: (state,action) => {
            state.active = state.data.filter(e => e.code === action.payload )
        }
        
    },
    extraReducers:{
        [getCountries.pending]: (state) => {
            state.loading = true
            state.status = "loading"
        },
        [getCountries.fulfilled]: (state,action) => {
            state.loading = false;
            state.status = "success"
            state.data = action.payload
        },
        [getCountries.rejected]: (state) => {
            state.status = "failed"
        },
        [getCountryByName.pending]: (state) => {
            state.countryStatus = "pending"
        },
        [getCountryByName.fulfilled]: (state,action) => {
            state.countryStatus = "success"
            state.active = action.payload
        },
        [getCountryByName.rejected]: (state,action) => {
            state.countryStatus = "failed"
        }
    }
});

export const {setActiveCountryByAlphaCode,setCountriesByCode,getAllCountries,filterCountries,filterCountriesByName,filterCountriesByRegion,setActiveCountry} = countrySlice.actions;

export default countrySlice.reducer;
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
                id:c.numericCode
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
                id:c.numericCode
            }
        });
        return dataFiltered;
    }
)

const initialState = {
    data:null,
    countriesFiltered:null,
    active:null,
    loading:null,
    status:null,
    countryStatus:null
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

export const {getAllCountries,filterCountries,filterCountriesByName,filterCountriesByRegion,setActiveCountry} = countrySlice.actions;

export default countrySlice.reducer;
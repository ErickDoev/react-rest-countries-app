import React from 'react'
import { AppRouter } from './routes/AppRouter'
import { store } from "./store/store";
import { Provider } from "react-redux";

export const CountriesApp = () => {
    return (
        <Provider store={store}>
            <AppRouter/>
        </Provider>
    )
}

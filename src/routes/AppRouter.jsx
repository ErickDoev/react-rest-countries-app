import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import { CountriesScreen } from '../components/CountriesScreen';
import { Country } from '../components/Country';
import { getCountries } from '../slices/countrySlice';

export const AppRouter = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        
        dispatch(getCountries());

        
    }, [dispatch]);
    return (
        <div>
            <Router>
                <nav>
                    <p>Where in the world?</p>
                    <div>
                        <span><i className="fas fa-moon"></i> Dark Mode</span>
                    </div>
                </nav>

                <Switch>
                    <Route exact path='/' component={CountriesScreen}/>
                    <Route exact path='/country/:id' component={Country}/>
                    <Redirect to='/'/>
                </Switch>
            </Router>
        </div>
    )
}

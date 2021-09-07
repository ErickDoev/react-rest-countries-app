import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';


export const Country = ({history}) => {
    
   
    const {active,countriesByCode} = useSelector(state => state.country);


    const handleBack = () => {
        history.push('/');
    }
    // useEffect(() => {
    //     dispatch(getCountriesByCodes(active.borders.join(';')));
        
    // }, [active.borders,dispatch]);

    console.log(countriesByCode);

    if(!active){
        return <Redirect to='/'/>
    }

    // const setCountryActive = (code) => {
    //     dispatch(setActiveCountryByAlphaCode(code));
    // }
    //console.log(active.borderCountries);[{...}]
    return (
        <div className="country__main">
            <div>
                <button 
                    className="country__button"
                    onClick={handleBack}><i className="fas fa-hand-point-left"></i> Back</button>
            </div>
            <div className="country__content">
                <div className="country__flag">
                    <img src={active.flag} alt={active.name} />
                </div>
                <div className="country__info">
                    <div className="country__name">
                        <p>{active.name}</p>
                    </div>
                    <div className="country__general">
                        
                        <div>
                            <p><strong>Native name: </strong> {active.nativeName}</p>
                            <p><strong>Population: </strong>{active.population}</p>
                            <p><strong>Region: </strong>{active.region}</p>
                            <p><strong>Subregion: </strong>{active.subregion}</p>
                            <p><strong>Capital: </strong>{active.subregion}</p>
                            
                        </div>
                        <div>
                            <p><strong>Top Level Domain: </strong>{active.topLevelDomain}</p>
                            <p><strong>Currencies: </strong>{active.currencies.map(c=>c.name)}</p>
                            <p><strong>Languages: </strong>{active.languages.map(l=>l.name)}</p>  
        
                        </div>
                    </div>
                    {/* <div className="country__borders">
                        {countriesByCode?.map(e => {
                            return <Link onClick={()=>{setCountryActive(e.alphacode)}} key={e.alphacode} to={`${e.name.replace(/\s+/g, "-")}`}>{e.name}</Link>
                        })} 
                    </div> */}
                </div>
            </div>
        </div>
    )
}

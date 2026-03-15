import React, { use } from 'react';
import Country from '../Country/Country';

const Countries = ({countriesPromise}) => {

    const countriesData = use(countriesPromise)
    const countries = countriesData.countries;

    return (
        <div>
            <h1>Countries : {countries.length}</h1>
            <div className='countries-grid'>
                {
                    countries.map(country => <Country 
                    key={country.cca3?.cca3 || country.name?.common} country={country} />)
                }
            </div>
        </div>
    );
};

export default Countries;
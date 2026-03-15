import React from 'react';
import './Country.css';
import { useState } from 'react';

const Country = ({country}) => {
    const name = country?.name?.common || 'Unknown country';
    const flagSrc = country?.flags?.flags?.png || country?.flags?.png || '';
    const flagAlt = country?.flags?.flags?.alt || `${name} flag`;
    const population = country?.population?.population ?? country?.population ?? 'N/A';
    const area = country?.area?.area ?? country?.area ?? 'N/A';
    const region = country?.region?.region ?? country?.region ?? 'N/A';
    const code = country?.cca3?.cca3 ?? country?.cca3 ?? 'N/A';
    const continents = country?.continents?.continents || country?.continents || [];
    const capital = country?.capital?.capital || country?.capital || [];
    const languagesObject = country?.languages?.languages || country?.languages || {};
    const languages = Object.values(languagesObject);
     

    const [visited, setVisited] = useState(false);
    
    const handleVisitedClick = () => {
        setVisited(!visited);
    };
    return (
        <div className={`country-card ${visited ? 'country-visited' : ''}`}>
            {flagSrc && <img className='country-flag' src={flagSrc} alt={flagAlt} />}
            <h3>Name: {name}</h3>
            <p>Code: {code}</p>
            <p>Region: {region}</p>
            <p>Population: {population}</p>
            <p>Area: {area}</p>
            <p>Capital: {Array.isArray(capital) ? capital.join(', ') || 'N/A' : capital}</p>
            <p>Continent: {Array.isArray(continents) ? continents.join(', ') || 'N/A' : continents}</p>
            <p>Languages: {languages.length ? languages.join(', ') : 'N/A'}</p>
            <button onClick={handleVisitedClick} className='btn'>{visited ? 'Visited' : 'Not Visited'}</button>
        </div>
    );
};

export default Country;
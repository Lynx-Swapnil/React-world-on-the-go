import React from 'react';
import './Country.css';

const Country = ({country, isVisited, handleVisitedCountries}) => {
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
    const formatNumber = (value) => (typeof value === 'number' ? new Intl.NumberFormat().format(value) : value);
    
    const handleVisitedClick = () => {
        handleVisitedCountries(country, !isVisited);
    };

    return (
        <article className={`country-card ${isVisited ? 'country-visited' : ''}`}>
            {flagSrc && <img className='country-flag' src={flagSrc} alt={flagAlt} />}
            <div className='country-body'>
                <p className='country-region'>{region}</p>
                <h3>{name}</h3>

                <div className='country-stats'>
                    <p><span>Code</span><strong>{code}</strong></p>
                    <p><span>Population</span><strong>{formatNumber(population)}</strong></p>
                    <p><span>Area</span><strong>{formatNumber(area)}</strong></p>
                    <p><span>Capital</span><strong>{Array.isArray(capital) ? capital.join(', ') || 'N/A' : capital}</strong></p>
                    <p><span>Continent</span><strong>{Array.isArray(continents) ? continents.join(', ') || 'N/A' : continents}</strong></p>
                    <p><span>Languages</span><strong>{languages.length ? languages.join(', ') : 'N/A'}</strong></p>
                </div>

                <button onClick={handleVisitedClick} className='btn'>
                    {isVisited ? 'Visited' : 'Mark as visited'}
                </button>
            </div>
        </article>
    );
};

export default Country;
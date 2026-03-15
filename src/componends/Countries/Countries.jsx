import React, { use, useEffect, useMemo, useState } from 'react';
import Country from '../Country/Country';
import './Countries.css';

const Countries = ({countriesPromise}) => {
    const countriesData = use(countriesPromise);
    const countries = countriesData?.countries || [];

    const [visitedCodes, setVisitedCodes] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [regionFilter, setRegionFilter] = useState('All');
    const [sortBy, setSortBy] = useState('name-asc');
    const [showScrollTop, setShowScrollTop] = useState(false);

    const getCountryCode = (country) => country?.cca3?.cca3 || country?.cca3 || country?.name?.common;

    const handleVisitedCountries = (country, isVisited) => {
        const countryCode = getCountryCode(country);
        if (!countryCode) {
            return;
        }

        setVisitedCodes((prevVisitedCodes) => {
            if (isVisited) {
                return prevVisitedCodes.includes(countryCode)
                    ? prevVisitedCodes
                    : [...prevVisitedCodes, countryCode];
            }

            return prevVisitedCodes.filter((itemCode) => itemCode !== countryCode);
        });
    };

    const regions = useMemo(() => {
        const uniqueRegions = [...new Set(countries.map((country) => country?.region?.region || country?.region).filter(Boolean))];
        return ['All', ...uniqueRegions.sort((a, b) => a.localeCompare(b))];
    }, [countries]);

    const visitedCountries = useMemo(
        () => countries.filter((country) => visitedCodes.includes(getCountryCode(country))),
        [countries, visitedCodes],
    );

    const filteredCountries = useMemo(() => {
        const query = searchText.trim().toLowerCase();
        const filtered = countries.filter((country) => {
            const name = country?.name?.common || '';
            const region = country?.region?.region || country?.region || '';
            const code = getCountryCode(country) || '';
            const matchesQuery =
                query.length === 0 ||
                name.toLowerCase().includes(query) ||
                code.toLowerCase().includes(query);
            const matchesRegion = regionFilter === 'All' || region === regionFilter;
            return matchesQuery && matchesRegion;
        });

        return filtered.sort((a, b) => {
            if (sortBy === 'name-desc') {
                return (b?.name?.common || '').localeCompare(a?.name?.common || '');
            }
            if (sortBy === 'population-desc') {
                return (b?.population?.population || b?.population || 0) - (a?.population?.population || a?.population || 0);
            }
            if (sortBy === 'area-desc') {
                return (b?.area?.area || b?.area || 0) - (a?.area?.area || a?.area || 0);
            }
            return (a?.name?.common || '').localeCompare(b?.name?.common || '');
        });
    }, [countries, regionFilter, searchText, sortBy]);

    useEffect(() => {
        const handleWindowScroll = () => {
            setShowScrollTop(window.scrollY > 900);
        };

        window.addEventListener('scroll', handleWindowScroll);
        handleWindowScroll();

        return () => {
            window.removeEventListener('scroll', handleWindowScroll);
        };
    }, []);

    return (
        <section className='countries-page'>
            <header className='hero'>
                <p className='eyebrow'>World Atlas</p>
                <h1>Explore every country with style</h1>
                <p className='hero-copy'>
                    Search, filter, and sort nations instantly. Mark where you have been and build your travel memory wall.
                </p>
            </header>

            <section className='controls-card'>
                <label className='control-field'>
                    <span>Search country or code</span>
                    <input
                        type='text'
                        value={searchText}
                        onChange={(event) => setSearchText(event.target.value)}
                        placeholder='Try: Japan, BRA, France...'
                    />
                </label>

                <label className='control-field'>
                    <span>Region</span>
                    <select value={regionFilter} onChange={(event) => setRegionFilter(event.target.value)}>
                        {regions.map((region) => (
                            <option key={region} value={region}>{region}</option>
                        ))}
                    </select>
                </label>

                <label className='control-field'>
                    <span>Sort</span>
                    <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                        <option value='name-asc'>Name (A-Z)</option>
                        <option value='name-desc'>Name (Z-A)</option>
                        <option value='population-desc'>Population (high to low)</option>
                        <option value='area-desc'>Area (large to small)</option>
                    </select>
                </label>

                <button
                    type='button'
                    className='clear-btn'
                    onClick={() => {
                        setSearchText('');
                        setRegionFilter('All');
                        setSortBy('name-asc');
                    }}
                >
                    Reset filters
                </button>
            </section>

            <section className='countries-layout'>
                <aside className='visited-sidebar'>
                    <div className='quick-stats'>
                        <h3>Quick stats</h3>
                        <p className='stat-line'>Total countries: <strong>{countries.length}</strong></p>
                        <p className='stat-line'>Results shown: <strong>{filteredCountries.length}</strong></p>
                        <p className='stat-line'>Visited: <strong>{visitedCountries.length}</strong></p>
                    </div>

                    <h3 className='visited-title'>Visited list</h3>
                    {visitedCountries.length === 0 ? (
                        <p className='visited-empty'>No country marked yet.</p>
                    ) : (
                        <ol className='visited-list'>
                            {visitedCountries.map((country) => (
                                <li key={getCountryCode(country)}>{country?.name?.common || 'Unknown country'}</li>
                            ))}
                        </ol>
                    )}
                </aside>

                <div className='countries-grid'>
                    {filteredCountries.map((country) => (
                        <Country
                            key={getCountryCode(country)}
                            country={country}
                            isVisited={visitedCodes.includes(getCountryCode(country))}
                            handleVisitedCountries={handleVisitedCountries}
                        />
                    ))}
                </div>
            </section>

            <button
                type='button'
                className={`scroll-top-btn ${showScrollTop ? 'scroll-top-btn-visible' : ''}`}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label='Scroll to top'
            >
                Go Up
            </button>
        </section>
    );
};

export default Countries;
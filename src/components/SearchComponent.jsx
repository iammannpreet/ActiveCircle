import React, { useState, useEffect } from 'react';
import EventModal from './eventModal';

const SearchComponent = ({ events, activities }) => {
    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isEvent, setIsEvent] = useState(true);
    const [placeholder, setPlaceholder] = useState('Step outside. Find an adventure.');

    useEffect(() => {
        const updatePlaceholder = () => {
            if (window.innerWidth < 768) {
                setPlaceholder('Step outside. Find an adventure.');
            } else {
                setPlaceholder('Search the perfect workout, event, or weekend adventure Here!');
            }
        };

        updatePlaceholder();

        window.addEventListener('resize', updatePlaceholder);

        return () => {
            window.removeEventListener('resize', updatePlaceholder);
        };
    }, []);

    const fetchSearchResults = async (query) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/search?query=${query}`);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error Response:', response.status, errorText);
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            setFilteredResults(data);
        } catch (err) {
            console.error('Error fetching search results:', err);
            setError('Failed to fetch search results.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const input = e.target.value;
        setSearchInput(input);

        if (input.length > 2) {
            fetchSearchResults(input);
        } else {
            setFilteredResults([]);
        }
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setIsEvent(!!item.type);
    };

    return (
        <div className="p-6 bg-lightGray text-darkGray shadow-lg max-w-3xl mx-auto h-full flex flex-col">
            {/* Search Input */}
            <input
                type="text"
                value={searchInput}
                onChange={handleInputChange}
                className="border border-gray-300 p-3 w-full rounded-lg bg-white text-darkGray placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={placeholder}
            />

            {/* Loading State */}
            {loading && <p className="text-primary text-center">Loading search results...</p>}

            {/* Error State */}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Display Search Results */}
            {!loading && filteredResults.length > 0 && (
                <div className="flex-grow overflow-y-auto mt-4" style={{ minHeight: '80vh' }}>
                    <h2 className="text-xl font-semibold mb-4">Search Results</h2>
                    <ul className="bg-white rounded-lg shadow-lg divide-y divide-gray-200">
                        {filteredResults.map((item, index) => (
                            <li
                                key={index}
                                className="p-4 cursor-pointer hover:bg-gray-100 transition-all duration-200 ease-in-out"
                                onClick={() => handleItemClick(item)}
                            >
                                <h4 className="font-semibold text-lg mb-1 text-primary">{item.type || item.details}</h4>
                                <p className="text-sm text-gray-600">{item.location}</p>
                                <p className="text-sm text-gray-500">Organized by: {item.organizer}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* No Results Message */}
            {!loading && filteredResults.length === 0 && searchInput.length > 2 && (
                <p className="text-center text-gray-600">No matching events or activities found.</p>
            )}

            {/* Display Modal for the selected item */}
            {selectedItem && (
                isEvent ? (
                    <EventModal event={selectedItem} onClose={() => setSelectedItem(null)} />
                ) : (
                    <EventModal activity={selectedItem} onClose={() => setSelectedItem(null)} />
                )
            )}
        </div>
    );
};

export default SearchComponent;

import React, { useState, useEffect } from 'react';
import EventModal from './eventModal'; // Import your EventModal component
import ActivityModal from './ActivityModal'; // Import your ActivityModal component

const SearchComponent = () => {
    const [searchInput, setSearchInput] = useState('');  // Store the user's search input
    const [filteredResults, setFilteredResults] = useState([]);  // Store results from the database
    const [loading, setLoading] = useState(false);  // Store loading state
    const [error, setError] = useState(null);  // Store error state
    const [selectedItem, setSelectedItem] = useState(null);  // Store selected item for the modal
    const [isEvent, setIsEvent] = useState(true);  // Track if the selected item is an event or activity

    // Function to fetch search results from the backend
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

    // Handle user input in the search bar
    const handleInputChange = (e) => {
        const input = e.target.value;
        setSearchInput(input);

        if (input.length > 2) {
            fetchSearchResults(input);  // Trigger search when input has more than 2 characters
        } else {
            setFilteredResults([]);  // Clear results if input is too short
        }
    };

    // Handle item click to show the modal
    const handleItemClick = (item) => {
        setSelectedItem(item);
        setIsEvent(!!item.type); // Determine if it's an event (based on the presence of type)
    };

    return (
        <div className="p-4 bg-gray-100 text-gray-900 rounded-lg shadow-md">
            {/* Search Input */}
            <input
                type="text"
                value={searchInput}
                onChange={handleInputChange}
                className="border p-2 mb-4 w-full rounded-lg bg-white text-gray-900 placeholder-gray-500"
                placeholder="Search activities or events (e.g., Weightlifting, Yoga, location, details)"
            />

            {/* Loading State */}
            {loading && <p>Loading search results...</p>}

            {/* Error State */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Display Search Results */}
            {!loading && filteredResults.length > 0 && (
                <div>
                    <h2 className="text-xl font-bold mb-4">Search Results</h2>
                    <ul className="bg-white rounded-lg shadow-lg">
                        {filteredResults.map((item, index) => (
                            <li
                                key={index}
                                className="p-4 border-b cursor-pointer hover:bg-blue-100"
                                onClick={() => handleItemClick(item)}  // Handle click to show modal
                            >
                                <h4 className="font-bold text-lg">{item.type || item.details}</h4>
                                <p>{item.location}</p>
                                <p>Organized by: {item.organizer}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* No Results Message */}
            {!loading && filteredResults.length === 0 && searchInput.length > 2 && (
                <p>No matching events or activities found.</p>
            )}

            {/* Display Modal for the selected item */}
            {selectedItem && (
                isEvent ? (
                    <EventModal event={selectedItem} onClose={() => setSelectedItem(null)} />  // Show event modal
                ) : (
                    <ActivityModal activity={selectedItem} onClose={() => setSelectedItem(null)} />  // Show activity modal
                )
            )}
        </div>
    );
};

export default SearchComponent;

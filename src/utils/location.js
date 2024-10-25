// utils/location.js

// Function to get location suggestions (autocomplete)
export const fetchLocationSuggestions = async (query) => {
    const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${process.env.REACT_APP_MAPBOX_KEY}&autocomplete=true&limit=5`
    );
    const data = await response.json();
    return data.features; // Return the list of suggested locations
};

// Function to geocode the final selected location
export const geocodeLocation = async (location) => {
    const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${process.env.REACT_APP_MAPBOX_KEY}`
    );
    const data = await response.json();
    if (data.features && data.features.length > 0) {
        const [longitude, latitude] = data.features[0].center; // Get coordinates from the response
        return { latitude, longitude };
    }
    throw new Error('Location not found');
};

// components/FilterButton.js

import React from 'react';

const FilterButton = ({ label, onClick }) => {
    return (
        <button onClick={onClick} className="px-4 py-2 border mb-2 rounded hover:bg-gray-200">
            {label}
        </button>
    );
};

export default FilterButton;

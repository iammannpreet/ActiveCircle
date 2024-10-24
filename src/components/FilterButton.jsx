// components/FilterButton.js
import React from 'react';
import Button from '@mui/material/Button';

const FilterButton = ({ label, onClick }) => {
    return (
        <Button
            onClick={onClick}
            className="px-4 py-2 border mb-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            variant="outlined"
            sx={{ borderColor: '#ff833f', color: '#545454', '&:hover': { borderColor: '#ff7043', backgroundColor: '#f5f5f5' } }}
        >
            {label}
        </Button>
    );
};

export default FilterButton;

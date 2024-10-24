// FilterButton.jsx
import React from 'react';
import Button from '@mui/material/Button';

const FilterButton = ({ label, activeDialog, dialogName, handleMouseEnter, handleMouseLeave, children }) => {
    return (
        <div
            className="mb-4 relative"
            onMouseEnter={() => handleMouseEnter(dialogName)}
            onMouseLeave={handleMouseLeave}
        >
            <Button
                sx={{
                    backgroundColor: 'Gray',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: '#ff833f',
                    },
                    borderRadius: '8px',
                    textTransform: 'none',
                    border: '2px solid darkGray',
                }}
            >
                {label}
            </Button>
            {activeDialog === dialogName && (
                <div className="absolute left-[40%] ml-4 top-0 bg-white border rounded shadow-lg p-4 z-10 w-72 transition-opacity duration-300">
                    {children}
                </div>
            )}
        </div>
    );
};

export default FilterButton;

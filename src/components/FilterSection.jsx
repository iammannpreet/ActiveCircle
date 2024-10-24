import React, { useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const FilterSection = ({
    filter,
    setFilter,
    selectedType,
    setSelectedType,
    contentFilter,
    setContentFilter,
    activeDialog,
    setActiveDialog,
}) => {
    const dialogRef = useRef(null);

    const FilterOptions = {
        ALL: 'all',
        TODAY: 'today',
        THIS_WEEKEND: 'this_weekend',
        NEXT_7_DAYS: 'next_7_days',
        NEXT_10_DAYS: 'next_10_days',
        THIS_MONTH: 'this_month',
    };

    const ContentFilterOptions = {
        EVENTS_ONLY: 'events_only',
        ACTIVITIES_ONLY: 'activities_only',
        ALL: 'all',
    };

    // Toggle active dialog on button click
    const handleButtonClick = (dialogName) => {
        setActiveDialog((prev) => (prev === dialogName ? null : dialogName));
    };

    // Close the dialog if the user clicks outside
    const handleClickOutside = (event) => {
        if (dialogRef.current && !dialogRef.current.contains(event.target)) {
            setActiveDialog(null);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const renderDialogContent = () => {
        switch (activeDialog) {
            case 'date':
                return (
                    <div className="flex flex-row">
                        {/* First List */}
                        <div className="w-1/2">
                            <h3 className="font-semibold mb-2">This Week</h3>
                            {Object.keys(FilterOptions).slice(0, 3).map((key) => (
                                <button
                                    key={key}
                                    onClick={() => {
                                        setFilter(FilterOptions[key]);
                                        setActiveDialog(null);
                                    }}
                                    className="block w-full text-left px-2 py-1 hover:bg-gray-200"
                                >
                                    {key.replace('_', ' ')}
                                </button>
                            ))}
                        </div>

                        {/* Second List */}
                        <div className="w-1/2">
                            <h3 className="font-semibold mb-2">This Month</h3>
                            {Object.keys(FilterOptions).slice(3).map((key) => (
                                <button
                                    key={key}
                                    onClick={() => {
                                        setFilter(FilterOptions[key]);
                                        setActiveDialog(null);
                                    }}
                                    className="block w-full text-left px-2 py-1 hover:bg-gray-200"
                                >
                                    {key.replace('_', ' ')}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 'type':
                return (
                    <div className="flex flex-row justify-between space-x-4">
                        <div className="w-1/2">
                            <h3 className="font-semibold mb-2">Indoor Types</h3>
                            {['GYM', 'YOGA', 'DANCE'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => {
                                        setSelectedType(type);
                                        setActiveDialog(null);
                                    }}
                                    className="block w-full text-left px-2 py-1 hover:bg-gray-200"
                                >
                                    {type.replace('_', ' ')}
                                </button>
                            ))}
                        </div>

                        <div className="w-1/2">
                            <h3 className="font-semibold mb-2">Outdoor Types</h3>
                            {['WALK_RUN', 'FISHING', 'SPORTS', 'WATER', 'CYCLING'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => {
                                        setSelectedType(type);
                                        setActiveDialog(null);
                                    }}
                                    className="block w-full text-left px-2 py-1 hover:bg-gray-200"
                                >
                                    {type.replace('_', ' ')}
                                </button>
                            ))}
                            <button
                                onClick={() => {
                                    setSelectedType('');
                                    setActiveDialog(null);
                                }}
                                className="block w-full text-left px-2 py-1 hover:bg-gray-200"
                            >
                                All Types
                            </button>
                        </div>
                    </div>
                );
            case 'content':
                return (
                    <div className="flex flex-row justify-between space-x-4">
                        <div className="w-1/2">
                            {['EVENTS_ONLY', 'ACTIVITIES_ONLY'].map((key) => (
                                <button
                                    key={key}
                                    onClick={() => {
                                        setContentFilter(ContentFilterOptions[key]);
                                        setActiveDialog(null);
                                    }}
                                    className="block w-full text-left px-2 py-1 hover:bg-gray-200"
                                >
                                    {key.replace('_', ' ')}
                                </button>
                            ))}
                        </div>

                        <div className="w-1/2">
                            <button
                                onClick={() => {
                                    setContentFilter(ContentFilterOptions.ALL);
                                    setActiveDialog(null);
                                }}
                                className="block w-full text-left px-2 py-1 hover:bg-gray-200"
                            >
                                All
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="justify-center md:justify-start">
            <ButtonGroup>
                <div className="mb-4 relative">
                    <Button
                        onClick={() => handleButtonClick('date')}
                        sx={{ backgroundColor: 'Gray', color: 'white', '&:hover': { backgroundColor: '#ff833f' }, borderRadius: '8px', textTransform: 'none' }}
                    >
                        {filter !== 'all' ? `${filter.replace('_', ' ')}` : 'Date'}
                    </Button>
                </div>
                <div className="mb-4 relative">
                    <Button
                        onClick={() => handleButtonClick('type')}
                        sx={{ backgroundColor: 'Gray', color: 'white', '&:hover': { backgroundColor: '#ff833f' }, borderRadius: '8px', textTransform: 'none' }}
                    >
                        {selectedType !== '' ? `${selectedType}` : 'Type'}
                    </Button>
                </div>
                <div className="mb-4 relative">
                    <Button
                        onClick={() => handleButtonClick('content')}
                        sx={{ backgroundColor: 'Gray', color: 'white', '&:hover': { backgroundColor: '#ff833f' }, borderRadius: '8px', textTransform: 'none' }}
                    >
                        {contentFilter !== 'all' ? `${contentFilter.replace('_', ' ')}` : 'Events & Activities'}
                    </Button>
                </div>
            </ButtonGroup>

            {/* Shared dialog content */}
            {activeDialog && (
                <div ref={dialogRef} className="relative bg-darkGray text-orange-100 border rounded shadow-lg p-2 z-10 transition-opacity duration-300">
                    {renderDialogContent()}
                </div>
            )}
        </div>
    );
};

export default FilterSection;

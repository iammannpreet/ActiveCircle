// components/TypeDropdown.js

import React from 'react';
import { TypeFilterOptions } from '../utils/filterOptions'; // Assuming the same options for both

const TypeDropdown = ({ value, onChange, label }) => {
    return (
        <div>
            <label className="block mb-2">{label}:</label>
            <select
                name="type"
                value={value}
                onChange={onChange}
                className="border p-2 mb-4 w-full"
                required
            >
                <option value="">Select {label}</option>

                {/* GYM Options */}
                <optgroup label="Gym Activities">
                    {TypeFilterOptions.GYM.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                    ))}
                </optgroup>

                {/* Yoga Options */}
                <optgroup label="Yoga & Wellness">
                    {TypeFilterOptions.YOGA.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                    ))}
                </optgroup>

                {/* Walking/Running Options */}
                <optgroup label="Walking & Running">
                    {TypeFilterOptions.WALK_RUN.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                    ))}
                </optgroup>

                {/* Sports Options */}
                <optgroup label="Sports">
                    {TypeFilterOptions.SPORTS.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                    ))}
                </optgroup>

                {/* Water-based Activities */}
                <optgroup label="Water Activities">
                    {TypeFilterOptions.WATER.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                    ))}
                </optgroup>

                {/* Fishing */}
                <optgroup label="Fishing">
                    {TypeFilterOptions.FISHING.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                    ))}
                </optgroup>

                {/* Dance */}
                <optgroup label="Dance">
                    {TypeFilterOptions.DANCE.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                    ))}
                </optgroup>

                {/* Cycling */}
                <optgroup label="Cycling">
                    {TypeFilterOptions.CYCLING.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                    ))}
                </optgroup>
            </select>
        </div>
    );
};

export default TypeDropdown;

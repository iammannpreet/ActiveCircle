// ListSection.jsx
import React from 'react';

const ListSection = ({ title, items, loading, error, handleItemClick, setHoveredItem }) => {
    return (
        <div className="mb-6">
            <h3 className="text-xl font-bold mb-2 text-black">{title}</h3>
            {loading && <p>Loading {title.toLowerCase()}...</p>}
            {error && <p>Error loading {title.toLowerCase()}</p>}
            {!loading && !error && items.length > 0 && (
                <ul>
                    {items.map((item) => (
                        <li
                            key={item._id}
                            className="mb-4 border-b pb-2 hover:text-black"
                            onMouseEnter={() => setHoveredItem(item)}
                            onMouseLeave={() => setHoveredItem(null)}
                            onClick={() => handleItemClick(item)}
                        >
                            <h4 className="font-bold text-lg">{item.type}</h4>
                            <p>{item.location}</p>
                            <p>Organized by: {item.organizer}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ListSection;

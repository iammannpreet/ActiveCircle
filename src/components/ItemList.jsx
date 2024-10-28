import React from 'react';

const ItemList = ({ items, type, handleItemClick }) => {
    return (
        <div className="mb-6">
            <h3 className="text-xl font-bold mb-2 text-black">{type}</h3>
            {items.length > 0 ? (
                <ul>
                    {items.map((item) => (
                        <li
                            key={item._id}
                            className="mb-4 border-b pb-2 hover:text-black hover:scale"
                            onClick={() => handleItemClick(item)}
                        >
                            <h4 className="font-bold text-lg">{item.type}</h4>
                            <p>{item.location}</p>
                            <p>Organized by: {item.organizer}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No {type.toLowerCase()} found.</p>
            )}
        </div>
    );
};

export default ItemList;

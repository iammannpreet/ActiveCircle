import React from 'react';

const CardSection = () => {
    return (
        <section className='card-section bg-darkGray'>
            <h1>Explore</h1>
            {/* Using the backend URL directly for the image */}
            <img
                src="http://localhost:5050/public/uploads/activities/1729705176009-event.jpeg"
                alt="Dynamic Backend Image"
                className="w-full h-48 object-cover"
            />
        </section>
    );
}

export default CardSection;

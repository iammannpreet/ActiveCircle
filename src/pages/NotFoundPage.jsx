import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NotFoundPage() {
    const [randomFact, setRandomFact] = useState('');

    useEffect(() => {
        axios.get('https://uselessfacts.jsph.pl/random.json?language=en')
            .then(response => {
                setRandomFact(response.data.text);
            })
            .catch(error => {
                console.error('Error fetching random fact:', error);
                setRandomFact('Did you know? The Earth is amazing!');
            });
    }, []);

    return (
        <div className="text-center p-8 font-sans">
            <h1 className="text-4xl mb-4 text-lightsalmon">404 - Page Not Found</h1>
            <p className="text-lg mb-4">Oops! The page you're looking for doesn't exist.</p>
            <p className="text-lg mb-4">Here's a random fact while you're here:</p>
            <blockquote className="italic text-2xl mx-auto my-8 max-w-2xl text-gray-800">
                {randomFact}
            </blockquote>
            <p>
                <a
                    href="/"
                    className="text-primary font-bold text-lg hover:underline"
                >
                    Go back to Home
                </a>
            </p>
        </div>
    );
}

export default NotFoundPage;

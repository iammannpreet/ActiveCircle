import React from 'react';
import { Link } from 'react-scroll';

const Navbar = () => {
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-around', padding: '1rem', background: '#f8f8f8' }}>
            <Link to="section1" smooth={true}>Section 1</Link>
            <Link to="section2" smooth={true}>Section 2</Link>
        </nav>
    );
};

const Section = ({ id, children }) => {
    return (
        <div id={id} style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {children}
        </div>
    );
};


const TestPage = () => {
    return (
        <div>
            <Navbar />
            <Section id="section1">
                <h1>Section 1</h1>
                {/* <Slider /> Move Slider here if it belongs within this section */}
            </Section>
            <Section id="section2">
                <h1>Section 2</h1>
            </Section>
        </div>
    );
};

export default TestPage;

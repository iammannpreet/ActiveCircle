import React from 'react'
import { Link } from 'react-scroll';

const Navbar = () => {
    return (
        <nav>
            <Link to="section1" smooth={true}>Section 1</Link>
            <Link to="section2" smooth={true}>Section 2</Link>
        </nav>
    );
};

const Section = ({ id, children }) => {
    return (
        <div id={id} style={{ height: '100vh' }}>
            {children}
        </div>
    );
};

const Page = () => {
    return (
        <div>
            <Navbar />
            <Section id="section1"><h1>Section 1</h1></Section>
            <Section id="section2"><h1>Section 2</h1></Section>
        </div>
    );
};

export default Page;

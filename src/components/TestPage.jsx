import React from 'react';
import { Link } from 'react-scroll';
// import './Slider.css';

// // Dynamically import all images from the directory
// const importAll = (r) => r.keys().map((item) => r(item));
// const images = importAll(require.context('../assets/icons/partners', false, /\.(png|jpe?g|svg)$/));

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
// const Slider = () => {
//     return (
//         <div className="slider-outer bg-light-grey">
//             <div className="slider-inner">
//                 {images.map((src, index) => (
//                     <img
//                         key={index}
//                         src={src.default || src}
//                         alt={`partner-logo-${index}`}
//                         onError={(e) => { e.target.src = 'path/to/placeholder-image.png'; }}
//                         className="slider-image"
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };


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

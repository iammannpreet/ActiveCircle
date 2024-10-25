import { motion } from 'framer-motion';
import React, { useState } from 'react';

const HamburgerIcon = ({ isOpen, toggleMenu }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="cursor-pointer"
            onClick={toggleMenu}
            onMouseEnter={() => setIsHovered(true)} // Handle hover start
            onMouseLeave={() => setIsHovered(false)} // Handle hover end
            animate={isOpen ? 'open' : 'closed'}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
            {/* Top Line */}
            <motion.span
                variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 6 }, // Top line rotation
                }}
                className="block w-5 h-1 my-1"
                style={{
                    backgroundColor: isHovered || isOpen ? 'black' : '#545454',
                    transition: 'background-color 0.3s ease',
                }}
            />

            {/* Bottom Line */}
            <motion.span
                variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -6 }, // Bottom line rotation
                }}
                className="block w-5 h-1 my-1"
                style={{
                    backgroundColor: isHovered || isOpen ? 'black' : '#545454',
                    transition: 'background-color 0.3s ease',
                }}
            />
        </motion.div>
    );
};

export default HamburgerIcon;

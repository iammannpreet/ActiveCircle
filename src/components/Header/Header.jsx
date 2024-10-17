import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from '../../assets/icons/AC.gif';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import HamburgerIcon from '../HamburgerIcon/HamburgerIcon';
import Menu from '../Menu/Menu';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false); // State to control menu

    const toggleMenu = () => {
        setIsOpen(!isOpen); // Toggle menu open/close
    };
    // Disable scrolling when the menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'; // Disable scrolling
        } else {
            document.body.style.overflow = 'auto'; // Enable scrolling when menu is closed
        }
        return () => {
            document.body.style.overflow = 'auto'; // Clean up the effect on component unmount
        };
    }, [isOpen]);
    return (
        <header className="bg-[#f6f8fd] text-white p-4 flex justify-between items-center">
            {/* Logo with animation */}
            <motion.div
                className="logo"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <img src={logo} alt="Logo" className="bg-#5271FF w-18 h-5" />
            </motion.div>

            {/* Icons: Search, Filter, Hamburger */}
            <motion.div
                className="logo"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <nav className="flex space-x-6">
                    <SearchIcon style={{ color: '#6A8FFF' }} />
                    <FilterAltIcon style={{ color: '#6A8FFF' }} />
                    {/* Use HamburgerIcon component */}
                    <HamburgerIcon isOpen={isOpen} toggleMenu={toggleMenu} />
                </nav>
            </motion.div>

            {/* Use Menu component */}
            <Menu isOpen={isOpen} toggleMenu={toggleMenu} />
        </header>
    );
};

export default Header;

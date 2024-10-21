import React, { useState } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/icons/AC.gif';
import aclogo from '../assets/icons/AC-icon.svg';
import tabtext from '../assets/icons/tab-AC.gif';
import desktoplogo from '../assets/icons/AC-desktop.gif';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import HamburgerIcon from './HamburgerIcon';
import Menu from './Menu';
import { menuItems } from '../utils/menuItems'; // Import menuItems
import { useToggleMenu } from '../hooks/useToggeMenu';
import SearchComponent from './SearchComponent'; // Import the search component

const Header = ({ events, activities }) => {
    const { isOpen, toggleMenu } = useToggleMenu(); // Custom hook for menu logic
    const [isSearchOpen, setIsSearchOpen] = useState(false); // Track search bar visibility

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    return (
        <header className="bg-[#f6f8fd] text-white p-4 flex justify-between items-center relative">
            {/* Left side: Logo */}
            <motion.div
                className="flex items-center"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <img src={logo} alt="Logo" className="bg-#5271FF md:hidden w-18 h-5" />
                <img src={aclogo} alt="Logo" className="hidden md:block w-18 h-5 lg:hidden" />
                <img src={desktoplogo} alt="Logo" className="hidden lg:block w-15 h-6" />
            </motion.div>

            {/* Centered Tab Text (Visible only on tablet) */}
            <div className=" hidden md:block lg:hidden">
                <img src={tabtext} alt="Tab Text" className="w-24 h-7" />
            </div>

            {/* Desktop View: Menu Links */}
            <motion.div
                className="hidden lg:flex space-x-8 items-center"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {Object.keys(menuItems).map((key) => (
                    <a
                        key={key}
                        href={menuItems[key].href}
                        className={`text-lg text-[#5271FF] hover:underline`}
                    >
                        {menuItems[key].label}
                    </a>
                ))}
            </motion.div>

            {/* Right side: Login and Sign Up */}
            <motion.div
                className="hidden lg:flex space-x-4"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <a href="#login" className="text-lg text-[#5271FF] hover:underline">Login</a>
                <button className="bg-[#38B6FF] text-white px-4 py-2 rounded-lg hover:bg-[#5271FF]">
                    <a href="#signup">Sign Up</a>
                </button>
            </motion.div>

            {/* Mobile view: Icons */}
            <motion.div className="flex space-x-6 items-center lg:hidden">
                <button onClick={toggleSearch}>
                    <SearchIcon style={{ color: '#6A8FFF' }} />
                </button>
                <FilterAltIcon style={{ color: '#6A8FFF' }} />
                <HamburgerIcon isOpen={isOpen} toggleMenu={toggleMenu} />
            </motion.div>

            {/* Mobile Menu */}
            <Menu isOpen={isOpen} toggleMenu={toggleMenu} />

            {/* Search Component */}
            {isSearchOpen && (
                <div className="absolute top-16 left-0 w-full bg-white p-4 shadow-md z-50">
                    <SearchComponent events={events} activities={activities} />
                </div>
            )}
        </header>
    );
};

export default Header;

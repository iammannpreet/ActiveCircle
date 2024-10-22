import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { menuItems } from '../utils/menuItems';
import { useToggleMenu } from '../hooks/useToggeMenu';
import aclogo from '../assets/icons/AC-logo.png';
import tabtext from '../assets/icons/tab-AC.gif';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import HamburgerIcon from './HamburgerIcon';
import Menu from './Menu';
import SearchComponent from './SearchComponent';

const Header = ({ events, activities }) => {
    const { isOpen, toggleMenu } = useToggleMenu();
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    return (
        <>
            {/* Header Section */}
            <header className="sticky top-0 z-50 bg-lightGray text-darkGray p-4 md:px-8 lg:px-12 xl:px-16 flex justify-between items-center" style={{ height: '76px' }}>
                {/* Left side: Logo */}
                <motion.div
                    className="flex items-center relative"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <a href="/" className="flex items-center">
                        <img src={aclogo} alt="Logo" className="block w-10 h-8 md:min-w-12 md:h-9" />
                    </a>
                </motion.div>

                {/* Centered Tab Text (Visible only on tablet) */}
                <div className="hidden md:block lg:hidden">
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
                            className="text-lg text-primary hover:underline"
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
                    <a href="#login" className="text-lg text-primary hover:underline">Login</a>
                    <a href="#signup" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-darkGray text-lg">
                        Sign Up
                    </a>
                </motion.div>

                <motion.div className="flex space-x-6 items-center">
                    {/* Search Icon */}
                    <button onClick={toggleSearch} className="transform transition-transform duration-200 hover:scale-120">
                        <SearchIcon className="text-darkGray hover:text-black" />
                    </button>

                    {/* Filter Icon */}
                    <div className="transform transition-transform duration-200 hover:scale-120">
                        <FilterAltIcon className="text-darkGray hover:text-black" />
                    </div>

                    {/* Hamburger Icon */}
                    <div className="transform transition-transform duration-200 hover:scale-120 ">
                        <HamburgerIcon isOpen={isOpen} toggleMenu={toggleMenu} />
                    </div>
                </motion.div>

                {/* Mobile Menu */}
                <Menu isOpen={isOpen} toggleMenu={toggleMenu} />
            </header>

            {/* Backdrop overlay */}
            {isSearchOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleSearch}></div>
            )}

            {/* Search Component (with no padding and z-index adjustments) */}
            <motion.div
                className={`fixed left-0 w-full bg-gray-200 z-50 ${isSearchOpen ? 'block' : 'hidden'}`}
                style={{ top: '76px' }}  // Fixed top value to start below the header
                initial={{ y: '-100%', opacity: 0 }}  // Initially hidden above the header
                animate={isSearchOpen ? { y: 0, opacity: 1 } : { y: '-100%', opacity: 0 }}  // Slides in from above
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
                <SearchComponent events={events} activities={activities} />
            </motion.div>
        </>
    );
};

export default Header;

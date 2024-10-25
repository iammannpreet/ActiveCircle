import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { menuItems } from '../utils/menuItems'; // Ensure this is correctly imported
import { useToggleMenu } from '../hooks/useToggeMenu';
import aclogo from '../assets/icons/AC-logo.png';
import tabtext from '../assets/icons/tab-AC.gif';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import HamburgerIcon from './HamburgerIcon';
import Menu from './Menu';
import SearchComponent from './SearchComponent';
import '../tailwind.css';

const Header = ({ events, activities }) => {
    const { isOpen, toggleMenu } = useToggleMenu();
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Toggle function for search
    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    return (
        <>
            {/* Header Section */}
            <header className="sticky top-0 z-50 bg-lightGray text-darkGray p-4 md:px-8 lg:px-12 flex justify-between items-center" style={{ height: '76px' }}>
                {/* Left side: Logo */}
                <motion.div
                    className="flex items-center relative"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link to="/" className="block items-center">
                        <img src={aclogo} alt="Logo" className="block w-10 h-8 md:min-w-11 md:h-9" />
                    </Link>
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
                    {Object.entries(menuItems).map(([key, item]) => (
                        key === 'search' ? (
                            <button
                                key={key}
                                onClick={toggleSearch}
                                className="text-base font-light font-interthin text-darkGray pl-3 pr-3 hover:scale-110 hover:text-black hover:border-l-2 hover:border-r-2 border-orange transition-all duration-300"
                            >
                                {item.label}
                            </button>
                        ) : (
                            item.to ? (
                                <Link
                                    key={key}
                                    to={item.to}
                                    className="text-base font-light font-interthin text-darkGray pl-3 pr-3 hover:scale-110 hover:text-black hover:border-l-2 hover:border-r-2 border-orange transition-all duration-300"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <a
                                    key={key}
                                    href={item.href}
                                    className="text-base font-light font-interthin text-darkGray pl-3 pr-3 hover:scale-110 hover:text-black hover:border-l-2 hover:border-r-2 border-orange transition-all duration-300"
                                >
                                    {item.label}
                                </a>
                            )
                        )
                    ))}
                </motion.div>

                {/* Right side: Login and Sign Up */}
                <motion.div
                    className="hidden lg:flex space-x-4"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="w-16 h-8 bg-black overflow-hidden inline-block rounded-xl">
                        <a
                            href="#login"
                            className="relative z-10 text-sm text-white hover:scale-105 link-shiny flex justify-center items-center h-full w-full transition-all duration-300"
                        >
                            Log In
                        </a>
                    </div>

                    <div className=" w-16 h-8 bg-white overflow-hidden inline-block rounded-xl">
                        <a href="#signup" className="relative z-10 text-sm bg-primary text-black rounded-lg hover:bg-white hover:scale-105 link-shiny flex justify-center items-center h-full w-full transition-all duration-300">
                            Sign Up
                        </a>
                    </div>
                </motion.div>

                <motion.div className=" lg:hidden flex space-x-6 items-center">
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

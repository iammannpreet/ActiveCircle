import React from 'react';
import { motion } from 'framer-motion';
import logo from '../../assets/icons/AC.png';
import HomeIcon from '@mui/icons-material/Home';

const Header = () => {
    return (
        <header className="top-0 w-full p-4 flex justify-between items-center">
            <motion.div
                className="logo"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <img src={logo} alt="Logo" className="w-10 h-10" />
            </motion.div>
            <p className='font-inter'>ActiveCircle</p>
            {/* Right side: Icons */}

            {/* Home Icon */}
            <HomeIcon style={{ fontSize: 40, color: 'black' }} />

            {/* Other icons */}
            <img src={logo} alt="Search" className="w-6 h-6" />
            <img src={logo} alt="Menu" className="w-6 h-6" />

        </header>
    );
};

export default Header;

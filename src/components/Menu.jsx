import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';
const Menu = ({ isOpen, toggleMenu }) => {
    const menuVariants = {
        hidden: { opacity: 0, y: '100%' },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: '100%' },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            className="fixed bottom-0 p-4 md:px-6 right-0 w-full md:w-1/2 h-full bg-lightGray z-40 flex flex-col items-center md:items-end lg:hidden text-darkGray shadow-custom-lifted"
            initial="hidden"
            style={{ top: '76px' }}
            animate={isOpen ? 'visible' : 'hidden'}
            exit="exit"
            variants={menuVariants}
            transition={{ type: 'tween', duration: 0.5 }}
        >
            {/* Centeed on mobile, aligned to the right on tablet */}
            <motion.a
                className="text-xl mb-4 hover:scale-110 hover:text-black"
                variants={itemVariants}
                initial="hidden"
                animate={isOpen ? 'visible' : 'hidden'}
                transition={{ delay: 0.5 }}
                onClick={toggleMenu}
            ><Link to="/happening-now">
                    <a>
                        Happening Now!
                    </a>
                </Link>

            </motion.a>
            <motion.a
                href="#about"
                className="text-xl mb-4 hover:scale-110 hover:text-black"
                variants={itemVariants}
                initial="hidden"
                animate={isOpen ? 'visible' : 'hidden'}
                transition={{ delay: 0.6 }}
                onClick={toggleMenu}
            >
                Find Your Next Adventure
            </motion.a>
            <motion.a
                href="#services"
                className="text-xl mb-4 hover:scale-110 hover:text-black"
                variants={itemVariants}
                initial="hidden"
                animate={isOpen ? 'visible' : 'hidden'}
                transition={{ delay: 0.7 }}
                onClick={toggleMenu}
            >
                Our Mission
            </motion.a>
            <motion.a
                href="#contact"
                className="text-xl mb-4 hover:scale-110 hover:text-black"
                variants={itemVariants}
                initial="hidden"
                animate={isOpen ? 'visible' : 'hidden'}
                transition={{ delay: 0.8 }}
                onClick={toggleMenu}
            >
                Contact
            </motion.a>
        </motion.div >
    );
};

export default Menu;

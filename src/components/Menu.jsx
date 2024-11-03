import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

const Menu = ({ isOpen, toggleMenu }) => {
    const menuVariants = {
        hidden: { opacity: 0, y: '100%' },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: '100%' },
    };

    const { user, logoutUser } = useContext(UserContext); // Use UserContext

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
            <motion.div
                className="text-xl mb-4 hover:scale-110 hover:text-black"
                variants={itemVariants}
                initial="hidden"
                animate={isOpen ? 'visible' : 'hidden'}
                transition={{ delay: 0.5 }}
                onClick={toggleMenu}
            >
                <Link to="/happening-now">Discover New Events</Link>
            </motion.div>

            <motion.div
                className="text-xl mb-4 hover:scale-110 hover:text-black"
                variants={itemVariants}
                initial="hidden"
                animate={isOpen ? 'visible' : 'hidden'}
                transition={{ delay: 0.6 }}
                onClick={toggleMenu}
            >
                <Link to="/add-activity">Create an Activity</Link>
            </motion.div>

            <motion.div
                className="text-xl mb-4 hover:scale-110 hover:text-black"
                variants={itemVariants}
                initial="hidden"
                animate={isOpen ? 'visible' : 'hidden'}
                transition={{ delay: 0.7 }}
                onClick={toggleMenu}
            >
                <Link to="/add-event">Host an Event</Link>
            </motion.div>

            <motion.div
                className="text-xl mb-4 hover:scale-110 hover:text-black"
                variants={itemVariants}
                initial="hidden"
                animate={isOpen ? 'visible' : 'hidden'}
                transition={{ delay: 0.8 }}
                onClick={toggleMenu}
            >
                <HashLink to="#partner">Our Mission</HashLink>
            </motion.div>

            {user ? (
                <motion.div
                    className="text-xl mb-4 hover:scale-110 hover:text-black"
                    variants={itemVariants}
                    initial="hidden"
                    animate={isOpen ? 'visible' : 'hidden'}
                    transition={{ delay: 0.8 }}
                    onClick={() => {
                        toggleMenu();
                        logoutUser();
                    }}
                >
                    Log Out
                </motion.div>
            ) : (
                <>
                    <motion.div
                        className="text-xl mb-4 hover:scale-110 hover:text-black"
                        variants={itemVariants}
                        initial="hidden"
                        animate={isOpen ? 'visible' : 'hidden'}
                        transition={{ delay: 0.8 }}
                        onClick={toggleMenu}
                    >
                        <Link to="/login">Log In</Link>
                    </motion.div>
                    <motion.div
                        className="text-xl mb-4 hover:scale-110 hover:text-black"
                        variants={itemVariants}
                        initial="hidden"
                        animate={isOpen ? 'visible' : 'hidden'}
                        transition={{ delay: 0.8 }}
                        onClick={toggleMenu}
                    >
                        <Link to="/register">Sign Up</Link>
                    </motion.div>
                </>
            )}
        </motion.div>
    );
};

export default Menu;

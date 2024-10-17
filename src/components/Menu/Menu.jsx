// components/Menu/Menu.jsx
import { motion } from 'framer-motion';

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
            className="fixed bottom-0 p-4 right-0 w-1/2 h-full bg-[#5271FF] z-40 flex flex-col items-end text-white shadow-custom-lifted"
            initial="hidden"
            style={{ top: '56px' }}
            animate={isOpen ? 'visible' : 'hidden'}
            exit="exit"
            variants={menuVariants}
            transition={{ type: 'tween', duration: 0.5 }}
        >
            <motion.a
                href="#home"
                className="text-xl mb-4"
                variants={itemVariants}
                initial="hidden"
                animate={isOpen ? 'visible' : 'hidden'}
                transition={{ delay: 0.5 }}
                onClick={toggleMenu}
            >
                Home
            </motion.a>
            <motion.a
                href="#about"
                className="text-xl mb-4"
                variants={itemVariants}
                initial="hidden"
                animate={isOpen ? 'visible' : 'hidden'}
                transition={{ delay: 0.6 }}
                onClick={toggleMenu}
            >
                About
            </motion.a>
            <motion.a
                href="#services"
                className="text-2xl mb-4"
                variants={itemVariants}
                initial="hidden"
                animate={isOpen ? 'visible' : 'hidden'}
                transition={{ delay: 0.7 }}
                onClick={toggleMenu}
            >
                Services
            </motion.a>
            <motion.a
                href="#contact"
                className="text-2xl mb-4"
                variants={itemVariants}
                initial="hidden"
                animate={isOpen ? 'visible' : 'hidden'}
                transition={{ delay: 0.8 }}
                onClick={toggleMenu}
            >
                Contact
            </motion.a>
        </motion.div>
    );
};

export default Menu;

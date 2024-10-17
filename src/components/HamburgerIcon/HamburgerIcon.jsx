import { motion } from 'framer-motion';

const HamburgerIcon = ({ isOpen, toggleMenu }) => {
    return (
        <motion.div
            className="cursor-pointer"
            onClick={toggleMenu}
            animate={isOpen ? 'open' : 'closed'}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} // Ensure vertical alignment
        >
            {/* Top Line */}
            <motion.span
                variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 6 }, // Top line rotation
                }}
                className="block w-5 h-1 my-1"
                style={{ backgroundColor: '#6A8FFF', transition: 'background-color 0.3s ease' }} // Applied color and transition
            />

            {/* Bottom Line */}
            <motion.span
                variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -6 }, // Bottom line rotation
                }}
                className="block w-5 h-1 my-1"
                style={{ backgroundColor: '#6A8FFF', transition: 'background-color 0.3s ease' }} // Applied color and transition
            />
        </motion.div>
    );
};

export default HamburgerIcon;

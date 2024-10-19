import React from 'react';
import { motion } from 'framer-motion';
const HoverCard = () => {
    return (
        <motion.div
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{
                padding: '20px',
                background: '#fff',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
            }}
        >
            <h2>Interactive Card</h2>
            <p>This card scales up and rotates slightly on hover.</p>
        </motion.div>
    )
}

export default HoverCard
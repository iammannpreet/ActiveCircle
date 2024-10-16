import React from 'react'
import { motion } from 'framer-motion';

const AnimatedCard = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <h2>Scroll Animation Example</h2>
            <p>This card animates into view as you scroll.</p>
        </motion.div>
    );
};

export default AnimatedCard;
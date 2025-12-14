'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const variants = {
    fadeUp: {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
    },
    fadeDown: {
        hidden: { opacity: 0, y: -40 },
        visible: { opacity: 1, y: 0 },
    },
    fadeLeft: {
        hidden: { opacity: 0, x: -40 },
        visible: { opacity: 1, x: 0 },
    },
    fadeRight: {
        hidden: { opacity: 0, x: 40 },
        visible: { opacity: 1, x: 0 },
    },
    scale: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
    },
    blur: {
        hidden: { opacity: 0, filter: 'blur(10px)' },
        visible: { opacity: 1, filter: 'blur(0px)' },
    },
};

export default function AnimatedSection({
    children,
    animation = 'fadeUp',
    delay = 0,
    duration = 0.6,
    className = '',
    once = true,
    threshold = 0.2,
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount: threshold });

    const selectedVariant = variants[animation] || variants.fadeUp;

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={selectedVariant}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Staggered children animation wrapper
export function AnimatedStagger({
    children,
    staggerDelay = 0.1,
    animation = 'fadeUp',
    className = '',
    once = true,
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, amount: 0.2 });

    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
            },
        },
    };

    const selectedChildVariant = variants[animation] || variants.fadeUp;

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={containerVariants}
            className={className}
        >
            {Array.isArray(children)
                ? children.map((child, index) => (
                    <motion.div key={index} variants={selectedChildVariant}>
                        {child}
                    </motion.div>
                ))
                : children}
        </motion.div>
    );
}

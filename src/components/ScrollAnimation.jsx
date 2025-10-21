// src/components/ScrollAnimation.jsx
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

export default function ScrollAnimation({ children, delay = 0 }) {
    const controls = useAnimation();
    const ref = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    controls.start("visible");
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.2 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [controls]);

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
                hidden: { opacity: 0, x: -100 },
                visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.8, delay, ease: "easeOut" },
                },
            }}
        >
            {children}
        </motion.div>
    );
}

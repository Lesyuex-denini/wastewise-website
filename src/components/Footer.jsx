// src/components/Footer.jsx
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Footer() {
    const controls = useAnimation();
    const location = useLocation();

    const theme = {
        "/": { bg: "rgba(20, 91, 24, 0.7)", text: "#FFC107" },
        "/about": { bg: "rgba(8, 76, 97, 0.7)", text: "#FFD166" },
        "/explore": { bg: "rgba(20, 91, 24, 0.7)", text: "#FFE797" },
        "/contact": { bg: "rgba(141, 110, 99, 0.7)", text: "#FFE082" },
    };

    const { bg, text } = theme[location.pathname] || theme["/"];

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;

            if (scrollY + winHeight >= docHeight - 200) {
                controls.start({ y: 0, opacity: 1 });
            } else {
                controls.start({ y: 150, opacity: 0 });
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [controls]);

    return (
        <motion.footer
            animate={controls}
            initial={{ y: 150, opacity: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 14 }}
            className="floating-footer"
            style={{
                background: bg,
                color: text,
                borderTop: `2px solid ${text}`,
            }}
        >
            <p>© 2025 WasteWise. All rights reserved.</p>
        </motion.footer>
    );
}

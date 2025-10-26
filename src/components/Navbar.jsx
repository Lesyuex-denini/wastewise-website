import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

export default function Navbar() {
    const location = useLocation();
    const controls = useAnimation();
    const [hidden, setHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);

    const theme = {
        "/": { bg: "rgba(20, 91, 24, 0.7)", text: "#FFC107" },
        "/about": { bg: "rgba(8, 76, 97, 0.7)", text: "#FFD166" },
        "/explore": { bg: "rgba(20, 91, 24, 0.7)", text: "#FFE797" },
        "/contact": { bg: "rgba(141, 110, 99, 0.7)", text: "#FFE082" },
    };

    const { bg, text } = theme[location.pathname] || theme["/"];

    useEffect(() => {
        controls.start({
            background: bg,
            transition: { duration: 1, ease: "easeInOut" },
        });
    }, [bg, controls]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setHidden(currentScrollY > lastScrollY && currentScrollY > 80);
            setLastScrollY(currentScrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const menuVariants = {
        open: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
        closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    };

    const linkVariants = {
        closed: { opacity: 0, x: 40 },
        open: { opacity: 1, x: 0 },
    };

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* === Main Navbar === */}
            <motion.nav
                animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="fixed top-0 left-0 w-full h-[80px] z-50 flex justify-between items-center px-6 sm:px-8 md:px-12 shadow-md backdrop-blur-md border-b border-white/10 transition-all duration-500"
                style={{
                    background: bg,
                    backdropFilter: "blur(20px) saturate(180%)",
                    WebkitBackdropFilter: "blur(20px) saturate(180%)",
                }}
            >
                {/* ✅ Clickable Logo + Title */}
                <Link
                    to="/"
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => setMenuOpen(false)}
                >
                    <motion.img
                        src={logo}
                        alt="WasteWise Logo"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 150 }}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300"
                    />
                    <motion.h1
                        className="text-xl sm:text-2xl font-bold underline drop-shadow-lg transition-all duration-300"
                        style={{ color: text }}
                        whileHover={{
                            scale: 1.1,
                            textShadow: "0px 0px 12px rgba(255, 215, 0, 0.8)",
                        }}
                    >
                        WasteWise
                    </motion.h1>
                </Link>

                {/* === Desktop Navigation === */}
                <ul className="hidden md:flex gap-[60px] text-white text-lg">
                    {[
                        { name: "Home", path: "/" },
                        { name: "About", path: "/about" },
                        { name: "Explore", path: "/explore" },
                        { name: "Contact", path: "/contact" },
                    ].map((item, i) => (
                        <motion.li
                            key={item.name}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                            whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.3 },
                            }}
                            className={`px-3 py-1 relative cursor-pointer transition-all duration-300`}
                        >
                            <Link
                                to={item.path}
                                onClick={() => setMenuOpen(false)}
                                className={`${isActive(item.path)
                                    ? "text-[#FEF7AF] drop-shadow-[0_0_6px_rgba(255,255,200,0.9)]"
                                    : "text-white hover:text-[#FEF7AF]"
                                    } transition-all duration-300`}
                            >
                                {item.name}
                            </Link>

                            {/* Glowing underline animation for active link */}
                            {isActive(item.path) && (
                                <motion.span
                                    layoutId="activeUnderline"
                                    className="absolute bottom-[-4px] left-0 w-full h-[3px] rounded-full"
                                    style={{
                                        background:
                                            "linear-gradient(90deg, #FFF3B0, #FFD166, #FFE797)",
                                        boxShadow:
                                            "0 0 12px rgba(255, 239, 160, 0.8)",
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20,
                                    }}
                                />
                            )}
                        </motion.li>
                    ))}
                </ul>

                {/* === Mobile Menu Button === */}
                <div className="md:hidden flex items-center">
                    {menuOpen ? (
                        <X
                            size={28}
                            color={text}
                            onClick={() => setMenuOpen(false)}
                            className="cursor-pointer"
                        />
                    ) : (
                        <Menu
                            size={28}
                            color={text}
                            onClick={() => setMenuOpen(true)}
                            className="cursor-pointer"
                        />
                    )}
                </div>
            </motion.nav>

            {/* === Mobile Slide Menu === */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMenuOpen(false)}
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{
                                type: "spring",
                                stiffness: 120,
                                damping: 18,
                            }}
                            className="fixed top-0 right-0 h-full w-[75%] sm:w-[60%] 
                bg-gradient-to-b from-[#145B18]/80 via-[#184A1F]/75 to-[#0f3d16]/70
                backdrop-blur-2xl border-l border-white/20 z-50 
                flex flex-col justify-center px-10 shadow-[0_0_25px_rgba(255,255,255,0.1)]"
                        >
                            <motion.ul
                                variants={menuVariants}
                                initial="closed"
                                animate="open"
                                exit="closed"
                                className="flex flex-col items-start gap-8 text-white"
                            >
                                {[
                                    { name: "Home", path: "/" },
                                    { name: "About", path: "/about" },
                                    { name: "Explore", path: "/explore" },
                                    { name: "Contact", path: "/contact" },
                                ].map((item, index) => (
                                    <motion.li
                                        key={item.name}
                                        variants={linkVariants}
                                        transition={{
                                            delay: 0.1 * index,
                                            duration: 0.4,
                                            ease: "easeOut",
                                        }}
                                        whileHover={{
                                            x: 8,
                                            scale: 1.05,
                                            textShadow:
                                                "0px 0px 8px rgba(255, 231, 151, 0.9)",
                                        }}
                                        className={`text-2xl font-semibold cursor-pointer w-full transition-all duration-300 
                                border-b border-white/10 pb-2 ${isActive(item.path)
                                                ? "text-[#FFE797] bg-[#FFE797]/10 rounded-lg px-3 py-2 drop-shadow-[0_0_12px_rgba(255,239,160,0.6)]"
                                                : "text-white hover:text-[#FFE797]"
                                            }`}
                                    >
                                        <Link
                                            to={item.path}
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.li>
                                ))}
                            </motion.ul>

                            {/*Footer Tagline */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="mt-10 text-sm text-gray-200/70 text-center font-light"
                            >
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </>
    );
}

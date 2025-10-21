import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import background from '../assets/background.jpg';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import Cards from '../assets/Cards.jpg';
import logo from '../assets/logo.png';
import HomeBG from '../assets/HomeBG.jpg';
import StatsBG from '../assets/StatsBG.jpg';
import AnalyticsDashboard from "../components/AnalyticsDashboard";



// Animation variants
const slideLeft = {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
};

export default function Home() {
    const [typedText, setTypedText] = useState("");
    const [isTypingDone, setIsTypingDone] = useState(false);
    const fullText = "From Trash to \nTreasure with \nWasteWise";
    const typingSpeed = 70;

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            if (i < fullText.length) {
                setTypedText(fullText.slice(0, i + 1));
                i++;
            } else {
                clearInterval(timer);
                setIsTypingDone(true);
            }
        }, typingSpeed);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full overflow-hidden">

            {/* === HERO SECTION === */}
            <header className="hero-section" style={{ backgroundImage: `url(${background})` }}>
                <div className="hero-overlay" />
                <motion.main
                    className="hero-content"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {/* --- Typewriter Title --- */}
                    <motion.h1
                        className="rammetto-one-regular tracking-[10px] whitespace-pre-line"
                        variants={slideLeft}
                    >
                        {typedText}
                        {!isTypingDone && (
                            <span className="border-r-4 border-[#FFC107] animate-pulse ml-1"></span>
                        )}
                    </motion.h1>

                    <motion.p variants={slideLeft}>
                        <span className="bg-[#145B18] text-white px-4 py-2 rounded inline-block mt-4">
                            "Join quests, submit recyclables, and transform everyday waste into exciting rewards."
                        </span>
                    </motion.p>

                    <motion.div className="hero-buttons" variants={slideLeft}>
                        <Link to="/about" className="btn btn-learn">
                            Learn More
                        </Link>
                        <Link to="/contact" className="btn btn-download">
                            Download Now
                        </Link>
                    </motion.div>
                </motion.main>
            </header>

            {/* --- WHY WASTEWISE (Scrapbook Photos Only, Center-Fixed) --- */}
            <section
                className="whyWastewise py-16 px-6 md:px-12 lg:px-20"
                style={{ backgroundImage: `url(${HomeBG})` }}
            >                <motion.h1
                className="rammetto-one-regular tracking-[10px] text-center mb-12"
                variants={slideLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                    <span className="text-[#145B18]">Why</span> WasteWise?
                </motion.h1>

                <div className="whyWastewise-images flex flex-col gap-20">
                    {/* Row 1 */}
                    <motion.div
                        className="image1-row flex flex-col md:flex-row items-center gap-8 justify-center"
                        variants={slideLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative group shrink-0">
                            {/* Tape */}
                            <div className="absolute -top-3 -left-2 w-16 h-4 bg-yellow-200 rotate-[-10deg] opacity-70"></div>
                            <div className="absolute -bottom-3 right-0 w-16 h-4 bg-yellow-200 rotate-[10deg] opacity-70"></div>

                            <img
                                src={image1}
                                alt="Why WasteWise 1"
                                className="hover-img img1 rounded-md border-[4px] border-[#fff5d1] shadow-lg rotate-[-3deg] group-hover:rotate-0 transition-transform duration-500"
                            />
                        </div>

                        <p className="text-gray-700 leading-relaxed max-w-[600px] text-justify">
                            Waste is one of the most pressing problems our communities face today.
                            Traditional systems often lack motivation and engagement, leaving many
                            unaware or unwilling to recycle. WasteWise changes this by combining
                            technology, gamification, and real rewards to make recycling both fun
                            and impactful.
                        </p>
                    </motion.div>

                    {/* Row 2 */}
                    <motion.div
                        className="image2-row flex flex-col md:flex-row-reverse items-center gap-8 justify-center md:pl-10"
                        variants={slideLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="relative group shrink-0">
                            {/* Tape */}
                            <div className="absolute -top-3 right-2 w-16 h-4 bg-yellow-200 rotate-[8deg] opacity-70"></div>
                            <div className="absolute -bottom-3 -left-1 w-16 h-4 bg-yellow-200 rotate-[-6deg] opacity-70"></div>

                            <img
                                src={image2}
                                alt="Why WasteWise 2"
                                className="hover-img img2 rounded-md border-[4px] border-[#fff5d1] shadow-lg rotate-[3deg] group-hover:rotate-0 transition-transform duration-500"
                            />
                        </div>

                        <p className="text-[#145B18] font-bold text-3xl tracking-widest text-center">
                            Recycle. Earn. Sustain.
                        </p>
                    </motion.div>

                    {/* Row 3 */}
                    <motion.div
                        className="image3-row flex flex-col md:flex-row items-center gap-8 justify-center"
                        variants={slideLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div className="relative group shrink-0">
                            {/* Tape */}
                            <div className="absolute -top-3 left-2 w-16 h-4 bg-yellow-200 rotate-[-5deg] opacity-70"></div>
                            <div className="absolute -bottom-3 right-3 w-16 h-4 bg-yellow-200 rotate-[5deg] opacity-70"></div>

                            <img
                                src={image3}
                                alt="Why WasteWise 3"
                                className="hover-img img3 rounded-md border-[4px] border-[#fff5d1] shadow-lg rotate-[-2deg] group-hover:rotate-0 transition-transform duration-500"
                            />
                        </div>

                        <p className="text-gray-700 leading-relaxed max-w-[600px] text-justify">
                            With WasteWise, every eco-action counts. Users can take on quests, earn
                            EcoPoints, and redeem real rewards while helping reduce pollution. By
                            partnering with outlets and local communities, WasteWise not only
                            promotes responsible habits but also builds a culture of accountability
                            and sustainability for a cleaner future.
                        </p>
                    </motion.div>
                </div>
            </section>






            {/* === ANALYTICS === */}
            <section className="Analytics">
                <hr />
                <div
                    style={{
                        boxShadow: "0 0 40px 8px rgba(255, 193, 7, 0.5)",
                        overflow: "hidden",
                    }}
                >
                    <motion.div
                        className="analytics-hero"
                        style={{
                            backgroundImage: `url(${Cards})`,
                        }}
                        initial={{ clipPath: "inset(0 0 0 100%)", opacity: 0 }}
                        whileInView={{ clipPath: "inset(0 0 0 0%)", opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        viewport={{ once: true }}
                    >
                        <div className="scrolling-text">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <h2 className="rammetto-one-regular tracking-[10px]">
                                        Our <span className="text-[#FFC107]">Impact</span> In Action
                                    </h2>
                                    <img src={logo} alt="WasteWise Logo" className="scroll-logo" />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
                <hr />
            </section>




            <motion.section
                className="analytics-stats"
                style={{ backgroundImage: `url(${StatsBG})` }}
                variants={slideLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
            >
                <AnalyticsDashboard />
            </motion.section>
        </div>
    );
}

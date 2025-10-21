import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import background from '../assets/background.jpg';
import Reward from '../assets/Reward.jpg';
import Steps from '../assets/Steps.jpg';
import ContactBG from '../assets/ContactBG.jpg';
import GenBG from '../assets/GenBG.jpg';
import DownloadBG from '../assets/DownloadBG.jpg';
import ComingSoon from '../assets/ComingSoon.mp4';

import Img12 from '../assets/12.jpg';
import Img13 from '../assets/13.jpg';
import Img17 from '../assets/17.jpg';

const slideLeft = {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.2 },
    },
};

export default function Explore() {
    // === Typewriter Animation ===
    const [typedText, setTypedText] = useState("");
    const [isTypingDone, setIsTypingDone] = useState(false);
    const fullText = "How WasteWise Works";
    const typingSpeed = 50;

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

    const renderTextWithHighlight = () => {
        const before = "How ";
        const target = "WasteWise";
        const after = " Works";

        const typedCount = typedText.length;

        const beforeTyped = typedText.slice(0, before.length);
        const targetStart = Math.max(0, typedCount - before.length);
        const targetTyped = target.slice(0, Math.max(0, Math.min(target.length, targetStart)));
        const afterStart = Math.max(0, typedCount - (before.length + target.length));
        const afterTyped = after.slice(0, Math.max(0, Math.min(after.length, afterStart)));

        return (
            <>
                <span>{beforeTyped}</span>
                <span style={{ color: "#FFC107" }}>{targetTyped}</span>
                <span>{afterTyped}</span>
            </>
        );
    };

    return (
        <div className="w-full">
            {/* --- HEADER --- */}
            <header
                className="explore-section"
                style={{ backgroundImage: `url(${background})` }}
            >
                <div className="explore-overlay" />
                {/* Animate only the content */}
                <motion.main
                    className="explore-content"
                    variants={slideLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {/* Typewriter Title */}
                    <h1 className="rammetto-one-regular tracking-[10px] whitespace-pre-line">
                        {renderTextWithHighlight()}
                        {!isTypingDone && (
                            <span className="border-r-4 border-[#FFC107] animate-pulse ml-1"></span>
                        )}
                    </h1>
                </motion.main>
            </header>


            {/* --- TUTORIAL SECTION --- */}
            <motion.section
                className="tutorials"
                style={{ backgroundImage: `url(${GenBG})` }}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {/* --- Left Video Card --- */}
                <motion.div
                    className="video-container"
                    initial={{ x: "-100%", opacity: 0 }}
                    whileInView={{
                        x: ["-100%", "0%", "-5%", "0%"],
                        opacity: [0, 1, 1, 1],
                    }}
                    transition={{
                        duration: 4.0,
                        ease: "easeInOut",
                        times: [0, 0.6, 0.8, 1],
                    }}
                    viewport={{ once: true }}
                >
                    <video src={ComingSoon} controls autoPlay loop muted />
                </motion.div>

                {/* --- Right Steps Card --- */}
                <motion.div
                    className="statcard-vertical"
                    initial={{ x: "100%", opacity: 0 }}
                    whileInView={{
                        x: ["100%", "0%", "5%", "0%"],
                        opacity: [0, 1, 1, 1],
                    }}
                    transition={{
                        duration: 3.0,
                        ease: "easeInOut",
                        times: [0, 0.6, 0.8, 1],
                    }}
                    viewport={{ once: true }}
                >
                    <div className="statcard-content" style={{ backgroundImage: `url(${Steps})` }}>
                        <h2>Register or Log In</h2>
                        <p>Access your dashboard through the WasteWise app.</p>

                        <h2>Join EcoQuests</h2>
                        <p>Complete recycling challenges to earn points.</p>

                        <h2>Scan at Outlet Partners</h2>
                        <p>Have your collected materials verified.</p>

                        <h2>Earn EcoPoints</h2>
                        <p>Get rewarded for approved submissions.</p>

                        <h2>Redeem Rewards</h2>
                        <p>Exchange points for load, groceries, or gifts.</p>
                    </div>
                </motion.div>
            </motion.section>


            {/* --- REWARDS TITLE --- */}
            <motion.section
                className="rewards"
                variants={slideLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <div className="rewards-title">
                    <h2 className="rammetto-one-regular tracking-[10px]">
                        Redeem Your <span className="text-[#FFC107]">REWARDS</span>
                    </h2>
                </div>

                <div className="rewards-intro">
                    <p>
                        With WasteWise, every eco-action you take comes with real benefits.
                        Collect EcoPoints by recycling and completing quests, then exchange
                        them for meaningful rewards that support your needs, health, and
                        community. From ration packs to education support and wellness
                        programs—your impact goes beyond the environment and into everyday life.
                    </p>
                </div>
            </motion.section>

            {/* --- REWARDS LIST --- */}
            <motion.section
                className="rewards-list-container"
                style={{ backgroundImage: `url(${Reward})` }}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <div className="rewards-list">
                    {[
                        { letter: "R", title: "Ration Packs", desc: "Grocery packs, rice, canned goods, or basic needs.", shade: "shade1" },
                        { letter: "E", title: "Education Support", desc: "School supplies, scholarships, or free workshops.", shade: "shade2" },
                        { letter: "W", title: "Wellness Programs", desc: "Free medical checkups, fitness activities, or health kits.", shade: "shade3" },
                        { letter: "A", title: "Assistance Services", desc: "Financial aid, livelihood starter kits, or job referrals.", shade: "shade4" },
                        { letter: "R", title: "Recreation", desc: "Free passes to barangay sports/leisure facilities or community events.", shade: "shade5" },
                        { letter: "D", title: "Discounts/Deals", desc: "Barangay-negotiated discounts with local stores, transport, or services.", shade: "shade6" },
                        { letter: "S", title: "Safety Support", desc: "Emergency kits, disaster preparedness training, or barangay ID perks.", shade: "shade7" },
                    ].map((reward, i) => {
                        const tapeColors = [
                            "linear-gradient(90deg, #FCE8D5, #FAD1AF)",
                            "linear-gradient(90deg, #E7F7D4, #D4EAC7)",
                            "linear-gradient(90deg, #E8D8FF, #D9C3FF)",
                            "linear-gradient(90deg, #FFD6E8, #FBCAD7)",
                            "linear-gradient(90deg, #D4EBF2, #C3E0EC)",
                            "linear-gradient(90deg, #FFF2CC, #FFE4A3)",
                            "linear-gradient(90deg, #E6E6FA, #DADAF9)",
                        ];

                        const topColor = tapeColors[i % tapeColors.length];
                        const bottomColor = tapeColors[(i + 3) % tapeColors.length];

                        const topStyle =
                            i % 2 === 0
                                ? { top: "-10px", left: "15%" }
                                : { top: "-10px", right: "15%" };

                        const bottomStyle =
                            i % 2 === 0
                                ? { bottom: "-10px", right: "15%" }
                                : { bottom: "-10px", left: "15%" };

                        return (
                            <motion.div
                                key={i}
                                className="rewards-row"
                                variants={slideLeft}
                                transition={{
                                    delay: i * 0.20,
                                    type: "spring",
                                    stiffness: 120,
                                    damping: 12,
                                }}
                                whileHover={{ rotate: -1.5, scale: 1.02 }}
                                style={{ transformOrigin: "center" }}
                            >
                                <motion.div
                                    className={`reward-card ${reward.shade}`}
                                    initial={{ rotate: i % 2 === 0 ? -2 : 2, y: 25, opacity: 0 }}
                                    whileInView={{ rotate: 0, y: 0, opacity: 1 }}
                                    transition={{
                                        duration: 0.7,
                                        delay: i * 0.15,
                                        ease: "easeOut",
                                    }}
                                    whileHover={{
                                        rotate: i % 2 === 0 ? -3 : 3,
                                        transition: { type: "spring", stiffness: 100, damping: 8 },
                                    }}
                                    style={{
                                        position: "relative",
                                        borderRadius: "16px",
                                        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                                    }}
                                >
                                    {/* ✨ scrapbook tape effects (top + bottom) */}
                                    <div
                                        style={{
                                            position: "absolute",
                                            width: "70px",
                                            height: "16px",
                                            background: topColor,
                                            opacity: 0.85,
                                            transform: `rotate(${i % 2 === 0 ? 3 : -3}deg)`,
                                            borderRadius: "4px",
                                            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                                            ...topStyle,
                                        }}
                                    ></div>

                                    <div
                                        style={{
                                            position: "absolute",
                                            width: "70px",
                                            height: "16px",
                                            background: bottomColor,
                                            opacity: 0.85,
                                            transform: `rotate(${i % 2 === 0 ? -3 : 3}deg)`,
                                            borderRadius: "4px",
                                            boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                                            ...bottomStyle,
                                        }}
                                    ></div>

                                    <strong className="acronym">
                                        <span className="reward-letter">{reward.letter}</span>
                                        {reward.title} →
                                    </strong>
                                    <span className="reward-desc">{reward.desc}</span>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.section>




            {/* --- Sustainability --- */}
            <section
                className="ContactInfo"
                style={{ backgroundImage: `url(${DownloadBG})` }}
            >
                {/* --- SUSTAINABILITY GOALS SECTION --- */}
                <motion.section
                    className="sustainability-section relative py-20 px-8 overflow-hidden"
                    variants={slideLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: "-40px",
                            left: "-60px",
                            width: "220px",
                            height: "220px",
                            background: "url('https://www.transparenttextures.com/patterns/handmade-paper.png')",
                            opacity: 0.3,
                            transform: "rotate(-12deg)",
                            borderRadius: "12px",
                            zIndex: 0,
                        }}
                    ></div>
                    <div
                        style={{
                            position: "absolute",
                            bottom: "-50px",
                            right: "-50px",
                            width: "250px",
                            height: "250px",
                            background: "url('https://www.transparenttextures.com/patterns/fibers.png')",
                            opacity: 0.25,
                            transform: "rotate(15deg)",
                            borderRadius: "18px",
                            zIndex: 0,
                        }}
                    ></div>

                    <motion.div
                        className="sustainability-content relative z-10"
                        variants={staggerContainer}
                    >
                        <h1
                            className="rammetto-one-regular text-center mb-8 
             text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
             tracking-[2px] sm:tracking-[5px] md:tracking-[8px] lg:tracking-[10px]"
                        >
                            Our{" "}
                            <span className="text-[#4CAF50]">
                                SUSTAINABILITY GOALS
                            </span>
                        </h1>

                        <motion.div
                            className="relative max-w-4xl mx-auto mb-14 px-4 sm:px-0"
                            style={{
                                background: "linear-gradient(135deg, rgba(255, 255, 161, 0.6), rgba(170, 255, 170, 0.6))",
                                borderRadius: "16px",
                                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                                padding: "24px",
                                position: "relative",
                                overflow: "hidden",
                            }}
                            initial={{ opacity: 0, y: 60, rotate: -2 }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                rotate: [-2, 2, -1, 1, 0],
                                transition: { duration: 1.2, ease: "easeOut" },
                            }}
                            viewport={{ once: true }}
                            whileHover={{
                                scale: 1.03,
                                rotate: 1.5,
                                transition: { type: "spring", stiffness: 120, damping: 10 },
                            }}
                        >
                            {/* Paper fiber texture overlay */}
                            <div
                                style={{
                                    backgroundImage:
                                        "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
                                    opacity: 0.25,
                                    position: "absolute",
                                    inset: 0,
                                    zIndex: 0,
                                }}
                            ></div>

                            {/* Top and bottom scrapbook tapes */}
                            <span className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-28 h-4 bg-[#f5d06f] rotate-[-3deg] opacity-90 rounded-[2px] z-10"></span>
                            <span className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-28 h-4 bg-[#f5d06f] rotate-[4deg] opacity-90 rounded-[2px] z-10"></span>

                            {/* Text content */}
                            <p
                                className="relative z-10 text-justify italic text-sm sm:text-base md:text-lg 
      leading-relaxed text-gray-800"
                            >
                                WasteWise aligns with the Philippine <strong>RA 9003</strong> (Ecological Solid Waste Management Act),
                                the <strong>Extended Producer Responsibility (EPR) Law</strong>, and the
                                <strong> United Nations Sustainable Development Goals (SDGs)</strong>.
                                Together, we aim to build cleaner, more responsible, and eco-conscious communities
                                through digital participation and gamified recycling.
                            </p>
                        </motion.div>




                        {/* --- GOALS ICON GRID --- */}
                        <motion.div

                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center"
                            variants={staggerContainer}
                        >
                            {[
                                {
                                    // Responsible Consumption & Production
                                    img: Img12,
                                    title: "Responsible Consumption & Production",
                                    desc: "Encouraging proper waste management and recycling habits to reduce landfill waste and pollution.",
                                },
                                {
                                    // Climate Action
                                    img: Img13,
                                    title: "Climate Action",
                                    desc: "Reducing carbon footprint by promoting eco-friendly habits and responsible disposal practices.",
                                },
                                {
                                    // Partnerships for the Goals
                                    img: Img17,
                                    title: "Partnerships for the Goals",
                                    desc: "Collaborating with local governments, outlets, and residents to achieve shared sustainability targets.",
                                },
                            ].map((goal, i) => {
                                const tapeColors = [
                                    "linear-gradient(90deg, #FCE8D5, #FAD1AF)",
                                    "linear-gradient(90deg, #E7F7D4, #D4EAC7)",
                                    "linear-gradient(90deg, #D4EBF2, #C3E0EC)",
                                    "linear-gradient(90deg, #FFF2CC, #FFE4A3)",
                                    "linear-gradient(90deg, #FFD6E8, #FBCAD7)",
                                ];
                                const tapeTopColor = tapeColors[i % tapeColors.length];
                                const tapeBottomColor = tapeColors[(i + 2) % tapeColors.length];

                                return (
                                    <motion.div
                                        key={i}
                                        className="goal-card bg-white/85 backdrop-blur-md p-6 rounded-2xl shadow-md relative max-w-sm"
                                        whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
                                        transition={{ type: "spring", stiffness: 120, damping: 10 }}
                                    >
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "-10px",
                                                left: i % 2 === 0 ? "15%" : "65%",
                                                width: "70px",
                                                height: "16px",
                                                background: tapeTopColor,
                                                opacity: 0.9,
                                                transform: `rotate(${i % 2 === 0 ? 5 : -4}deg)`,
                                                borderRadius: "4px",
                                                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                                            }}
                                        ></div>
                                        <div
                                            style={{
                                                position: "absolute",
                                                bottom: "-10px",
                                                right: i % 2 === 0 ? "20%" : "60%",
                                                width: "70px",
                                                height: "16px",
                                                background: tapeBottomColor,
                                                opacity: 0.9,
                                                transform: `rotate(${i % 2 === 0 ? -4 : 4}deg)`,
                                                borderRadius: "4px",
                                                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                                            }}
                                        ></div>

                                        <motion.img
                                            src={goal.img}
                                            alt={goal.title}
                                            className="w-20 h-20 mx-auto mb-4 rounded-lg shadow-sm border-2 border-[#4CAF50]/30 object-cover"
                                            initial={{ y: -10, opacity: 0 }}
                                            whileInView={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.6, delay: 0.2 }}
                                        />
                                        <h3 className="text-[#4CAF50] font-bold text-xl mb-2 text-center">
                                            {goal.title}
                                        </h3>
                                        <p className="text-gray-700 text-sm leading-relaxed text-center">
                                            {goal.desc}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </motion.div>
                </motion.section>



            </section>

        </div>
    );
}

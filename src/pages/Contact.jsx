import { motion } from "framer-motion";
import App from "../assets/App.png";
import ContactBG from "../assets/ContactBG.jpg";
import DownloadBG from "../assets/DownloadBG.jpg";
import React, { useRef } from "react";
import emailjs from "emailjs-com";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Contact() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "service_2bfjz2p",
                "template_uvidkpp",
                form.current,
                "BmgS0dvTjGcZ_Ibd8"
            )
            .then(
                () => {
                    alert("Message sent successfully! 💚");
                    form.current.reset();
                },
                (error) => {
                    console.error(error.text);
                    alert("Failed to send message. Please try again.");
                }
            );
    };

    const apkLink = "/WasteWise_Beta-1.6.apk";

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = apkLink;
        link.download = "WasteWise_Beta-1.6.apk";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    return (
        <div className="w-full overflow-hidden">
            {/* === Hero Section === */}
            <header
                className="relative flex flex-col md:flex-row items-center justify-center px-8 md:px-16 pt-32 pb-20 md:pb-28 overflow-hidden"
                style={{
                    backgroundImage: `url(${DownloadBG})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div
                    className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay opacity-[0.15]"
                    style={{
                        backgroundImage:
                            "url('https://www.transparenttextures.com/patterns/noisy-grid.png')",
                        backgroundSize: "300px 300px",
                    }}
                />

                {/* === Left Text === */}
                <motion.div
                    className="relative max-w-xl z-30 md:mr-12 text-center md:text-left"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Paper Layers */}
                    <div className="relative inline-block mb-8">
                        <div className="absolute inset-0 bg-[#BFD8B8] rotate-[-2.5deg] rounded-md shadow-lg opacity-90"></div>
                        <div className="absolute inset-0 bg-[#D8EFD3] rotate-[1.5deg] rounded-md shadow-md opacity-85"></div>
                        <div className="absolute inset-0 bg-[#E9F7E3] rotate-[0.5deg] rounded-md shadow-sm opacity-95"></div>

                        <div className="absolute -top-6 left-[25%] w-28 h-6 rotate-2 bg-[#EAF7E0] rounded-sm shadow-md opacity-80"></div>
                        <div className="absolute -top-5 right-[20%] w-16 h-5 -rotate-3 bg-[#C7E6C9] rounded-sm shadow-md opacity-80"></div>

                        <img
                            src="https://cdn-icons-png.flaticon.com/512/9630/9630568.png"
                            alt="clip"
                            className="absolute -top-10 right-6 w-8 opacity-70 rotate-6"
                        />

                        <div
                            className="absolute -bottom-2 left-0 w-full h-3 bg-repeat-x opacity-60"
                            style={{
                                backgroundImage:
                                    "url('https://www.transparenttextures.com/patterns/rice-paper.png')",
                                backgroundSize: "250px 25px",
                            }}
                        ></div>

                        {/* === Animated Headline === */}
                        <motion.h1
                            className="relative rammetto-one-regular text-3xl sm:text-4xl md:text-5xl tracking-[2px] leading-snug text-[#145B18] px-6 py-5 md:px-10 md:py-8 z-10"
                            variants={{
                                hidden: { opacity: 1 },
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 1.09, delayChildren: 0.1 },
                                },
                            }}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.6 }}
                        >
                            {[
                                "Get the",
                                <span key="ww" className="text-[#84994F] drop-shadow-sm">
                                    {" "}
                                    WasteWise App
                                </span>,
                                " and start recycling today!",
                            ].map((segment, index) => (
                                <motion.span
                                    key={index}
                                    className="inline-block mr-2"
                                    variants={{
                                        hidden: { opacity: 0, scale: 2, y: -60, rotate: -8 },
                                        visible: {
                                            opacity: 1,
                                            scale: 1,
                                            y: 0,
                                            rotate: 0,
                                            transition: {
                                                type: "spring",
                                                stiffness: 500,
                                                damping: 25,
                                                mass: 0.6,
                                            },
                                        },
                                    }}
                                >
                                    {typeof segment === "string"
                                        ? segment.split(" ").map((word, i) => (
                                            <motion.span
                                                key={i}
                                                className="inline-block mr-[4px]"
                                                variants={{
                                                    hidden: { opacity: 0, scale: 3, y: -70, rotate: -8 },
                                                    visible: {
                                                        opacity: 1,
                                                        scale: 1,
                                                        y: 0,
                                                        rotate: 0,
                                                        transition: {
                                                            type: "spring",
                                                            stiffness: 600,
                                                            damping: 20,
                                                            mass: 0.5,
                                                        },
                                                    },
                                                }}
                                            >
                                                {word}
                                            </motion.span>
                                        ))
                                        : segment}
                                </motion.span>
                            ))}
                        </motion.h1>

                        <p className="font-[Patrick_Hand] text-[#5b704a] italic text-sm mt-3 md:mt-4 tracking-wide">
                            — your eco journey starts here 🌿
                        </p>
                    </div>

                    {/* === Download Button === */}
                    <motion.button
                        onClick={handleDownload}
                        className="relative mt-4 px-6 py-2 text-base font-semibold text-[#145B18] rounded-full overflow-hidden z-20"
                        style={{
                            background: "linear-gradient(145deg, #CDE4C1 0%, #E2F0D9 100%)",
                            boxShadow:
                                "0 4px 10px rgba(0,0,0,0.15), inset 0 -2px 4px rgba(0,0,0,0.08)",
                            border: "2px solid #145B18",
                        }}
                        initial={{ y: 0 }}
                        whileHover={{
                            scale: 1.08,
                            rotate: -1.5,
                            boxShadow:
                                "0 8px 18px rgba(20,91,24,0.3), inset 0 0 10px rgba(255,255,255,0.25)",
                        }}
                        whileTap={{
                            scale: 0.93,
                            y: 3,
                            boxShadow:
                                "inset 0 4px 8px rgba(0,0,0,0.25), inset 0 -1px 4px rgba(255,255,255,0.2)",
                            transition: { duration: 0.1 },
                        }}
                    >
                        <div
                            className="absolute inset-0 z-10 pointer-events-none opacity-30 mix-blend-overlay"
                            style={{
                                backgroundImage:
                                    "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
                                backgroundSize: "200px 200px",
                            }}
                        />
                        <motion.span
                            className="absolute inset-0 rounded-full"
                            initial={{ boxShadow: "0 0 0px rgba(20,91,24,0)" }}
                            whileHover={{
                                boxShadow:
                                    "0 0 18px 3px rgba(20,91,24,0.4), inset 0 0 10px rgba(255,255,255,0.2)",
                            }}
                            transition={{ duration: 0.3 }}
                        />
                        <motion.span
                            className="absolute top-0 left-[-90%] w-[60%] h-full bg-white/30 skew-x-[-20deg]"
                            whileHover={{
                                left: "130%",
                                transition: { duration: 0.9, ease: "easeInOut" },
                            }}
                        />
                        <span className="relative z-20 tracking-wide drop-shadow-sm select-none">
                            Download Now
                        </span>
                    </motion.button>

                    {/* Floating Details */}
                    <motion.div
                        className="absolute w-3 h-3 bg-[#C7E6C9] rounded-full top-10 left-8 opacity-60"
                        animate={{ y: [0, 12, 0], x: [0, 5, 0], rotate: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute w-3 h-3 bg-[#D8EFD3] rounded-full bottom-0 left-1/3 opacity-50"
                        animate={{ y: [0, -15, 0], x: [0, -6, 0], rotate: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                    />
                </motion.div>

                {/* === Right App Image === */}
                <motion.div
                    className="relative mt-14 md:mt-0 md:ml-12 z-30 flex justify-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <motion.img
                        src={App}
                        alt="WasteWise App"
                        className="w-60 md:w-80 rounded-2xl shadow-xl border-[6px] border-[#f6fdec]"
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.div>
            </header>




            {/* === Contact Info Section === */}
            <section
                className="relative py-16 px-6 md:px-12 lg:px-20"
                style={{
                    backgroundImage: `url(${ContactBG})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Paper backdrop */}
                <div className="absolute inset-0 bg-[#B8C4A9]/80 z-0" />

                <div className="relative z-10 space-y-10">
                    <motion.h2
                        className="rammetto-one-regular text-3xl md:text-4xl text-center text-[#145B18] mb-6"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        Let’s Connect 🌿
                    </motion.h2>

                    {/* Scrapbook Map */}
                    <motion.div
                        className="relative rounded-2xl overflow-hidden shadow-lg border-[6px] border-[#fff8d9]"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <div className="absolute -top-4 left-10 w-16 h-5 bg-yellow-200 rotate-2 opacity-70" />
                        <div className="absolute -bottom-4 right-8 w-14 h-4 bg-blue-200 -rotate-3 opacity-70" />
                        <MapContainer
                            center={[14.5681, 121.0851]}
                            zoom={15}
                            style={{ height: "400px", width: "100%" }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution="&copy; OpenStreetMap contributors"
                            />
                            <Marker position={[14.5681, 121.0851]} icon={customIcon}>
                                <Popup>
                                    WasteWise Pilot Area <br /> Barangay Sta. Lucia, Pasig City
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </motion.div>

                    {/* === Contact Wrapper (Scrapbook - Sage Palette) === */}
                    <motion.div
                        className="relative flex flex-col md:flex-row justify-between gap-8 pb-36 md:pb-20 px-4 md:px-8"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {/* floating leaf sticker (decorative) */}
                        <motion.div
                            aria-hidden
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute left-4 top-8 w-10 h-10 rounded-full bg-[#dff3e6] opacity-60 blur-sm mix-blend-multiply z-0"
                        />

                        {/* Left Side: Text Info (card) */}
                        <motion.div
                            className="relative md:w-1/2 bg-gradient-to-br from-[#fffdf7] to-[#f7fff3] rounded-xl p-6 shadow-[0_12px_30px_rgba(20,91,24,0.08)] border border-dashed border-[#d6d2bf] transform -rotate-[2deg] hover:rotate-0 transition-transform duration-300 z-10"
                            variants={fadeUp}
                        >
                            {/* tape sticker top-left */}
                            <div className="absolute -top-3 left-6 w-20 h-5 bg-[#FFF2C9] rounded-sm rotate-2 shadow-sm opacity-90"></div>
                            {/* paper accent bottom-right */}
                            <div className="absolute -bottom-4 right-8 w-16 h-4 bg-[#DFF3E6] -rotate-3 rounded-sm opacity-85"></div>

                            <p className="text-[#2E3A2D] leading-relaxed text-justify text-sm sm:text-base md:text-lg lg:text-s xl:text-[15px]">
                                The <b>WasteWise</b> team is passionate about helping communities turn
                                everyday recycling into meaningful action. Our pilot project in
                                <b> Barangay Sta. Lucia, Pasig City</b> is just the beginning!
                                Whether you’re a business owner, student, or resident who wants
                                to make a difference — we’d love to hear from you.
                                Share your ideas, feedback, or partnership interests. 🌱
                            </p>

                            <div className="mt-4 text-[#145B18]">
                                <h3 className="font-bold mb-2 flex items-center gap-2 text-sm">
                                    <span className="inline-block w-2 h-2 bg-[#C7E6C9] rounded-full" /> Pilot Implementation
                                </h3>
                                <p className="text-sm leading-relaxed text-gray-700">
                                    Currently deployed in collaboration with <b>Barangay Sta. Lucia</b>, WasteWise integrates
                                    waste verification, EcoQuest challenges, and reward systems to promote proper recycling.
                                </p>
                            </div>

                            <div className="mt-4 text-[#145B18]">
                                <h3 className="font-bold mb-2 flex items-center gap-2 text-sm">
                                    <span className="inline-block w-2 h-2 bg-[#FFE9B3] rounded-full" /> Partnerships & Collaboration
                                </h3>
                                <p className="text-sm leading-relaxed text-gray-700">
                                    We partner with local outlets, eco-friendly businesses, and government agencies to bring
                                    rewards and awareness to everyday recycling.
                                </p>
                            </div>

                            {/* subtle torn edge effect */}
                            <div className="absolute left-0 -bottom-3 w-full h-3 bg-gradient-to-r from-transparent via-[#fff3e0]/60 to-transparent opacity-80"></div>
                        </motion.div>

                        {/* Right Side: Message Form (card) */}
                        <motion.div
                            className="relative md:w-1/2 bg-gradient-to-br from-[#fffaf9] to-[#fffdf7] rounded-xl p-6 shadow-[0_12px_30px_rgba(16,122,63,0.06)] border border-dashed border-[#efe9df] transform rotate-[2deg] hover:rotate-0 transition-transform duration-300 z-10"
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 120 }}
                        >
                            {/* tape sticker top-left */}
                            <div className="absolute -top-4 left-6 w-18 h-5 bg-[#FEE3F0] rounded-sm rotate-1 shadow-sm opacity-85"></div>
                            <div className="absolute -bottom-4 right-8 w-16 h-4 bg-[#E6F8EE] -rotate-2 rounded-sm opacity-85"></div>

                            <form ref={form} onSubmit={sendEmail} className="space-y-4 relative z-10">
                                <div>
                                    <label className="block text-sm font-semibold text-[#2e3a2d]">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="w-full border border-[#e6e2d6] rounded-md p-2 focus:ring-2 focus:ring-[#b8c4a9] outline-none bg-[#fffefb]"
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-[#2e3a2d]">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="w-full border border-[#e6e2d6] rounded-md p-2 focus:ring-2 focus:ring-[#b8c4a9] outline-none bg-[#fffefb]"
                                        placeholder="Enter your email"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-[#2e3a2d]">Message</label>
                                    <textarea
                                        name="message"
                                        required
                                        className="w-full border border-[#e6e2d6] rounded-md p-2 h-32 resize-none focus:ring-2 focus:ring-[#b8c4a9] outline-none bg-[#fffefb]"
                                        placeholder="Write your message"
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    className="w-full py-2 bg-[#145B18] text-white rounded-full hover:bg-[#197b22] transition-shadow"
                                    whileHover={{ scale: 1.04, boxShadow: "0 8px 24px rgba(20,91,24,0.25)" }}
                                >
                                    Send Message
                                </motion.button>
                            </form>

                            {/* small scrapbook note */}
                            <div className="mt-4 text-xs text-gray-500">We’ll reply within 3 business days.</div>
                        </motion.div>
                    </motion.div>

                </div>
            </section >
        </div >
    );
}

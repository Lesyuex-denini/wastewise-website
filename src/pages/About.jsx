import { motion } from "framer-motion";
import wastewiseImage from '../assets/wastewise.png';
import trashImage from '../assets/trash.jpg';
import aleksImage from '../assets/aleks.jpg';
import kirkImage from '../assets/kirk.jpg';
import lloydImage from '../assets/lloyd.jpg';
import milaImage from '../assets/mila.jpg';
import AboutBG from '../assets/AboutBG.jpg';
import ContactBG from '../assets/ContactBG.jpg';
import AboutWWBG from '../assets/AboutWWBG.jpg';
import DownloadBG from '../assets/DownloadBG.jpg';




// Animation Variants
const slideLeft = {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const slideUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.2 },
    },
};

export default function About() {
    return (
        <div className="w-full">
            {/* === HERO SECTION === */}
            <header
                className="about-hero-section bg-cover bg-center bg-no-repeat 
                flex flex-col justify-center items-center text-center 
                px-4 sm:px-6 md:px-10 lg:px-20 
                min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] lg:min-h-screen"
                style={{ backgroundImage: `url(${AboutWWBG})` }}
            >                <motion.div
                className="about-content"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                    {/* --- Cinematic "ABOUT" Stomp with Dust Explosion --- */}
                    <motion.div
                        className="relative flex flex-col items-center justify-center overflow-visible"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {/* Dust explosion (gold burst + fade) */}
                        <motion.div
                            className="absolute bottom-0 w-[250px] h-[60px] rounded-full bg-[rgba(255,215,0,0.7)] blur-2xl opacity-0"
                            initial={{ scale: 0.2, opacity: 0 }}
                            whileInView={{ scale: [0.2, 2.2, 2.8], opacity: [0, 1, 3.0, 0] }}
                            transition={{
                                duration: 1.5,
                                delay: 0.4,
                                ease: "easeOut",
                            }}
                            viewport={{ once: true }}
                        />

                        {/* Extra particle-like dust layers */}
                        <motion.div
                            className="absolute bottom-0 w-[300px] h-[80px] rounded-full bg-[rgba(255,223,128,0.4)] blur-[50px] opacity-0"
                            initial={{ scale: 0.3, opacity: 0 }}
                            whileInView={{ scale: [0.3, 2.5, 3], opacity: [0, 0.9, 0.1, 0] }}
                            transition={{
                                duration: 1.5,
                                delay: 0.5,
                                ease: "easeOut",
                            }}
                            viewport={{ once: true }}
                        />

                        {/* Main ABOUT stomp animation */}
                        <motion.h1
                            className="image-text rammetto-one-regular tracking-[12px] flex gap-3 justify-center relative z-10"
                            initial={{ scale: 3, y: -300, opacity: 0 }}
                            whileInView={{
                                scale: [3, 1.1, 0.95, 1],
                                y: [-300, 0, -20, 0],
                                opacity: [0, 1, 1, 1],
                            }}
                            transition={{
                                duration: 1.3,
                                ease: "easeOut",
                            }}
                            viewport={{ once: true }}
                        >
                            {["A", "B", "O", "U", "T"].map((letter, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.1 * index }}
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </motion.h1>
                    </motion.div>



                    <motion.img
                        src={wastewiseImage}
                        alt="Wastewise Logo"
                        className="about-image"
                        initial={{ rotate: 0 }}
                        whileInView={{ rotate: [0, 360, 370, 360] }}
                        transition={{
                            duration: 5,
                            ease: "easeInOut",
                        }}
                        viewport={{ once: true }}
                    />
                </motion.div>
            </header>







            {/* === ABOUT WASTEWISE INFO === */}
            <section
                className="WasteWiseInfo"
                style={{
                    backgroundImage: `linear-gradient(160deg, rgba(21,128,61,0.85) 0%, rgba(94,147,108,0.7) 50%, rgba(27,94,32,0.85) 100%), url(${AboutBG})`,
                }}
            >
                <motion.div
                    className="content"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.p variants={slideLeft}>
                        <span style={{ color: "#FFC107" }}>WasteWise</span> is a gamified mobile app that
                        <span style={{ color: "#FFC107" }}> transforms recycling</span> into
                        an <span style={{ color: "#FFC107" }}>engaging</span> and
                        <span style={{ color: "#FFC107" }}> rewarding experience</span>.
                        By combining technology, incentives, and community action, it
                        <span style={{ color: "#FFC107" }}> motivates people to recycle </span>
                        while supporting businesses, government, and the environment.
                        <br /><br />
                        Built with the vision of promoting sustainable habits in communities,
                        <span style={{ color: "#FFC107" }}> WasteWise</span> empowers households and barangays
                        to actively participate in proper waste management. It aligns with
                        <strong> RA 9003 </strong> (Ecological Solid Waste Management Act)
                        and supports local programs under the Barangay Solid Waste Management initiatives.
                        Through its digital ecosystem, it connects residents, collection outlets,
                        and local authorities to make recycling simple, inclusive, and rewarding.
                    </motion.p>
                    <motion.hr variants={slideUp} />
                </motion.div>

                {/* --- Household Section --- */}
                <motion.div
                    className="household"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div className="household-text" variants={slideLeft}>
                        <p>
                            Many households still struggle with proper waste disposal due to
                            limited incentives, lack of awareness, and the absence of user-friendly systems.
                            In <strong>Barangay Sta. Lucia, Pasig City</strong> — WasteWise’s pilot area —
                            residents expressed challenges in recycling because of the lack of
                            accessible drop-off outlets and feedback mechanisms.
                            <br /><br />
                            WasteWise bridges this gap by turning recycling into a fun and meaningful
                            activity. By earning <span style={{ color: "#FFC107" }}>EcoPoints</span> and
                            completing <span style={{ color: "#FFC107" }}>EcoQuests</span>, households
                            are encouraged to recycle consistently, helping transform local waste
                            collection into a collective effort toward cleaner, greener communities.
                        </p>
                    </motion.div>

                    <motion.div
                        className="household-visual relative inline-block p-4"
                        variants={slideUp}
                        initial={{ opacity: 0, y: 50, rotate: -2 }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                            rotate: [-2, 2, -1, 1, 0],
                            transition: {
                                duration: 1.2,
                                ease: "easeOut",
                            },
                        }}
                        viewport={{ once: true }}
                        whileHover={{
                            rotate: 2,
                            scale: 1.03,
                            transition: { type: "spring", stiffness: 200, damping: 10 },
                        }}
                    >
                        {/* Scrapbook background paper */}
                        <div className="absolute inset-0 bg-[#FFFBE6] rounded-xl rotate-1 shadow-md border border-[#E5D8A5] -z-10" />

                        {/* Decorative tape on top and bottom */}
                        <span className="absolute top-[-12px] left-1/2 -translate-x-1/2 w-24 h-4 bg-[#f5d06f] rotate-[-3deg] opacity-90 rounded-[2px]" />
                        <span className="absolute bottom-[-12px] left-1/2 -translate-x-1/2 w-24 h-4 bg-[#f5d06f] rotate-[4deg] opacity-90 rounded-[2px]" />

                        {/* Image */}
                        <img
                            src={trashImage}
                            alt="Household Trash"
                            className="household-image w-[280px] sm:w-[350px] rounded-lg shadow-lg border border-[#E6E6E6]"
                        />
                    </motion.div>
                </motion.div>

                {/* --- Suggestion Section --- */}
                <motion.div
                    className="content"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.hr variants={slideUp} />
                    <motion.div className="Suggestion" variants={slideLeft}>
                        <p>
                            Unlike traditional recycling systems,
                            <span style={{ color: "#FFC107" }}> WasteWise</span> integrates
                            <span style={{ color: "#FFC107" }}> AI-powered waste verification</span>,
                            EcoPoints, quests, and leaderboards to
                            <span style={{ color: "#FFC107" }}> keep users motivated</span> while
                            <span style={{ color: "#FFC107" }}> providing real-time insights </span>
                            for businesses and government agencies.
                            <br /><br />
                            Through the help of <strong>Gemini 2.0 Flash AI</strong>,
                            recyclables are verified with image recognition,
                            ensuring transparency and accountability.
                            Data is managed through a secure
                            <strong> Firebase</strong> database, and users can find nearby partner outlets
                            using <strong>Google Maps integration</strong>.
                            These technologies make the recycling process seamless — from
                            collection to reward redemption — while helping local officials
                            track sustainability performance and promote eco-friendly habits.
                        </p>
                    </motion.div>
                </motion.div>

                {/* --- Vision Line --- */}
                <motion.div
                    className="content mt-10 text-center"
                    variants={slideLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <p className="text-lg italic text-white/90 max-w-3xl mx-auto">
                        “Every recyclable item becomes an opportunity for change —
                        turning small actions into a collective movement for a cleaner tomorrow.”
                    </p>
                </motion.div>
            </section>








            {/* === MEET THE TEAM: Scrapbook Style (Responsive, No Cropping) === */}
            <section
                className="MeetTheTeam scrapbook-mixed py-16"
                style={{ backgroundImage: `url(${DownloadBG})`, backgroundSize: "cover", backgroundPosition: "center" }}
            >
                <motion.div
                    className="MeetTheTeam-content max-w-7xl mx-auto px-4"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {/* --- Title --- */}
                    <motion.h1
                        className="rammetto-one-regular text-2xl sm:text-4xl tracking-[6px] sm:tracking-[10px] text-center sm:text-left"
                        variants={slideLeft}
                    >
                        Meet Our <span className="text-[#FFC107]">Team</span>
                    </motion.h1>

                    {/* --- Team Row --- */}
                    <div className="team-row flex justify-start sm:justify-center items-start gap-6 mt-10 flex-nowrap overflow-x-auto sm:overflow-visible px-2 sm:px-4 scrollbar-hide">
                        {[
                            {
                                img: milaImage,
                                name: "Ma. Milagros E. Abadinas",
                                role: "Web Developer",
                                tilt: -8,
                                link: "https://linktr.ee/Lesyuex"
                            },
                            {
                                img: lloydImage,
                                name: "Lloyd Aldrich A. Anggara",
                                role: "Full-Stack Developer",
                                tilt: 6,
                                link: "https://linktr.ee/hal__o_?utm_source=linktree_profile_share&ltsid=c1ff5d8a-6c5f-4d5a-8a4f-c4ff5051d763"
                            },
                            {
                                img: kirkImage,
                                name: "Kirk Alou John F. Fabon",
                                role: "Full-Stack Developer",
                                tilt: -4,
                                link: "https://linktr.ee/aikawanessu?utm_source=linktree_profile_share&ltsid=980d65df-5f32-4066-8573-1c3009f7164b"
                            },
                            {
                                img: aleksImage,
                                name: "Alexander Fabian Guarin",
                                role: "Team Leader / Full-Stack Developer",
                                tilt: 10,
                                link: "https://linktr.ee/iFabsss?utm_source=linktree_profile_share&ltsid=f7fd61aa-9bd0-4fb8-bef1-1cdc22f2a1f4"
                            },
                        ].map((member, index) => (
                            <motion.a
                                key={index}
                                href={member.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative scrapbook-photo bg-[#fffef5] p-3 rounded-lg shadow-xl min-w-[250px] max-w-[250px] block group"
                                initial={{ opacity: 0, rotate: member.tilt - 10, scale: 0.9 }}
                                whileInView={{ opacity: 1, rotate: member.tilt, scale: 1 }}
                                transition={{ duration: 1, delay: index * 0.3 }}
                                whileHover={{
                                    scale: 1.07,
                                    rotate: member.tilt + 3,
                                    transition: { type: "spring", stiffness: 200, damping: 10 },
                                }}
                            >

                                {/* Tape corners */}
                                <div className="absolute -top-2 left-2 w-10 h-4 bg-yellow-200 rotate-[-5deg] opacity-70"></div>
                                <div className="absolute -top-2 right-2 w-10 h-4 bg-yellow-200 rotate-[5deg] opacity-70"></div>

                                {/* Image */}
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className="w-full h-auto object-cover rounded-md border-[4px] border-[#fff5d1] shadow-md transition-transform duration-500 group-hover:scale-105"
                                />

                                {/* Hover Overlay */}
                                <motion.div
                                    className="absolute inset-0 rounded-lg bg-gradient-to-t from-[#000000]/100 via-[#1a1a1a]/70 to-transparent flex items-end justify-center opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                                    initial={{ opacity: 0, y: 10 }}
                                    whileHover={{ opacity: 1, y: 0 }}
                                >
                                    <div className="pb-6 text-center">
                                        <span className="text-white font-semibold text-lg tracking-wide drop-shadow-md">
                                            Connect with them
                                        </span>
                                        <div className="w-12 h-[2px] bg-[#FFC107] mx-auto mt-2 rounded-full opacity-80"></div>
                                    </div>
                                </motion.div>

                                {/* Text */}
                                <h3 className="mt-3 font-bold text-center text-base sm:text-lg">{member.name}</h3>
                                <p className="text-sm text-gray-600 text-center">{member.role}</p>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>
            </section>






        </div>
    );
}

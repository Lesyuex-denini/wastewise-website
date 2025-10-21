import { useEffect, useState } from "react";
import { Users, Gift, ListChecks } from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LabelList,
    Legend,
    CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";

export default function AnalyticsDashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [secondsAgo, setSecondsAgo] = useState(0);

    useEffect(() => {
        async function fetchAnalytics() {
            try {
                const api = import.meta.env.VITE_API_BASE_URL;
                const res = await fetch(`${api}/api/analytics/`);
                if (!res.ok) throw new Error("Network response was not ok");
                const json = await res.json();
                setData(json.data);
                setLastUpdated(new Date());
            } catch (err) {
                console.error("Error fetching analytics:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchAnalytics();
        const interval = setInterval(fetchAnalytics, 50000);
        return () => clearInterval(interval);
    }, []);


    useEffect(() => {
        if (!lastUpdated) return;
        const t = setInterval(() => {
            setSecondsAgo(Math.floor((Date.now() - lastUpdated.getTime()) / 1000));
        }, 1000);
        return () => clearInterval(t);
    }, [lastUpdated]);

    if (loading)
        return <p className="text-center text-lg font-semibold">Loading analytics...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    const totals = data?.totals || {};
    const recyclables = data?.recyclables || {};
    const overall = recyclables?.overall || { collected_total: 0 };

    const totalUsers = totals.total_users ?? 0;
    const totalQuests = totals.total_quests ?? 0;
    const totalRewards = totals.total_rewards ?? 0;
    const collectedTotal = overall.collected_total ?? 0;

    const perMaterial = (recyclables.top_collected_materials || []).map((m) => ({
        name: m.name,
        collected: m.collected ?? 0,
        target: m.target ?? 0,
    }));

    const perMaterialSorted = [...perMaterial].sort(
        (a, b) => (b.collected || 0) - (a.collected || 0)
    );

    const PILOT_GOAL = 1000;
    const progressPercent = Math.min(
        Math.round((collectedTotal / PILOT_GOAL) * 100),
        100
    );
    const progressDisplay = `${numberFormat(collectedTotal)} / ${numberFormat(
        PILOT_GOAL
    )} pcs (${progressPercent}%)`;

    const top3 = perMaterialSorted.slice(0, 3);

    const pilotTargets = {
        "Plastic Bottle": 500,
        Battery: 150,
        "Paper Cup": 100,
        default: 200,
    };

    function computeImpact(name, pcs) {
        const key = (name || "").toLowerCase();
        if (pcs <= 0) return null;
        if (key.includes("plastic"))
            return { label: "trees saved (est.)", value: roundTo(pcs * 0.006, 2) };
        if (key.includes("paper") || key.includes("cardboard"))
            return { label: "trees saved (est.)", value: roundTo(pcs / 100, 2) };
        if (key.includes("aluminum") || key.includes("metal"))
            return { label: "kWh saved (est.)", value: roundTo(pcs / 5, 1) };
        if (key.includes("battery"))
            return {
                label: "kg toxic prevented (est.)",
                value: roundTo(pcs * 0.05, 2),
            };
        return { label: "pcs collected", value: numberFormat(pcs) };
    }

    // === Animation Variants ===
    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    return (
        <section className="analytics-live p-8 md:p-10 space-y-12">
            {lastUpdated && (
                <p className="text-gray-500 text-sm text-right mb-2 italic">
                    Last updated{" "}
                    {secondsAgo < 60
                        ? `${secondsAgo} seconds ago`
                        : `${Math.floor(secondsAgo / 60)} minute${Math.floor(secondsAgo / 60) > 1 ? "s" : ""
                        } ago`}
                </p>
            )}

            {/* === Overall Participation Metrics === */}
            <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <h2 className="text-2xl md:text-3xl font-extrabold mb-2">
                    Overall Participation Metrics
                </h2>
                <p className="text-gray-600 mb-4">
                    Summary of registered users, active quests, and rewards distributed.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <motion.div variants={fadeUp} whileInView="visible" viewport={{ once: true }}>
                        <TapedContainer>
                            <DashboardCard
                                icon={<Users size={44} />}
                                label="Total Users"
                                value={numberFormat(totalUsers)}
                                color="bg-[#C2A68C]"
                            />
                        </TapedContainer>
                    </motion.div>

                    <motion.div variants={fadeUp} whileInView="visible" viewport={{ once: true }}>
                        <TapedContainer>
                            <DashboardCard
                                icon={<ListChecks size={44} />}
                                label="Total Quests"
                                value={numberFormat(totalQuests)}
                                color="bg-[#5E936C]"
                            />
                        </TapedContainer>
                    </motion.div>

                    <motion.div variants={fadeUp} whileInView="visible" viewport={{ once: true }}>
                        <TapedContainer>
                            <DashboardCard
                                icon={<Gift size={44} />}
                                label="Total Rewards"
                                value={numberFormat(totalRewards)}
                                color="bg-[#BF9264]"
                            />
                        </TapedContainer>
                    </motion.div>
                </div>
            </motion.div>

            {/* === Recycling Stats === */}
            <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <h2 className="text-2xl md:text-3xl font-semibold mb-2">
                    Recycling Stats
                </h2>
                <p className="text-gray-600 mb-4">
                    Total collected materials (pieces) and breakdown per material.
                </p>

                <TapedContainer>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                        <div className="col-span-1 rounded-lg p-4 bg-gradient-to-b from-white to-[#FAFAFA] shadow-md">
                            <p className="text-sm text-gray-500">Total Collected</p>
                            <p className="text-3xl font-bold mt-2 text-[#5E936C]">
                                {numberFormat(collectedTotal)} pcs
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                All submissions aggregated
                            </p>
                        </div>

                        <div className="col-span-1 md:col-span-2">
                            <div className="mb-2 flex items-center justify-between">
                                <p className="text-sm font-semibold text-gray-700">
                                    Progress to pilot goal
                                </p>
                                <p className="text-sm text-gray-500">{progressDisplay}</p>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden mb-2">
                                <div
                                    className="h-4 rounded-full"
                                    style={{
                                        width: `${progressPercent}%`,
                                        background:
                                            "linear-gradient(90deg,#3A6B57,#5E936C,#7FC3A8)",
                                    }}
                                />
                            </div>
                            <p className="text-xs text-gray-500 italic">
                                Pilot goal: 1,000 pcs (partial implementation)
                            </p>
                        </div>
                    </div>
                </TapedContainer>

                <motion.div
                    variants={fadeUp}
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="mt-6"
                >
                    <TapedContainer>
                        <p className="text-lg font-semibold text-gray-700 mb-2">
                            Total Collected per Material
                        </p>
                        <div className="w-full overflow-x-auto">
                            <div className="min-w-[600px] h-[320px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={perMaterialSorted}
                                        margin={{ top: 16, right: 12, left: 6, bottom: 60 }}
                                    >
                                        <defs>
                                            <linearGradient id="colGrad" x1="0" x2="0" y1="0" y2="1">
                                                <stop offset="0%" stopColor="#C7E7D9" />
                                                <stop offset="100%" stopColor="#A6D8C9" />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="#e5e5e5"
                                            vertical={false}
                                        />
                                        <XAxis
                                            dataKey="name"
                                            tick={{ fill: "#555", fontSize: 11 }}
                                            interval={0}
                                            angle={-20}
                                            textAnchor="end"
                                            height={60}
                                        />
                                        <YAxis
                                            tick={{ fill: "#555", fontSize: 11 }}
                                            width={40}
                                            axisLine={false}
                                            tickLine={false}
                                            label={{
                                                value: "pcs",
                                                angle: -90,
                                                position: "insideLeft",
                                                fill: "#777",
                                                fontSize: 11,
                                            }}
                                        />
                                        <Tooltip
                                            formatter={(v) => `${numberFormat(v)} pcs`}
                                            contentStyle={{
                                                borderRadius: 10,
                                                border: "1px solid #ddd",
                                            }}
                                        />
                                        <Legend
                                            verticalAlign="top"
                                            align="right"
                                            iconType="circle"
                                            wrapperStyle={{ fontSize: 12 }}
                                        />
                                        <Bar
                                            dataKey="collected"
                                            name="Collected (pcs)"
                                            fill="url(#colGrad)"
                                            radius={[8, 8, 0, 0]}
                                            barSize={40}
                                            isAnimationActive={false}
                                        >
                                            <LabelList
                                                dataKey="collected"
                                                position="top"
                                                formatter={(v) => `${numberFormat(v)} pcs`}
                                                isAnimationActive={false}
                                            />
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </TapedContainer>
                </motion.div>
            </motion.div>

            {/* === Highlight / Environmental Impact === */}
            <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <h2 className="text-2xl font-semibold mb-2">
                    Highlight / Environmental Impact
                </h2>
                <p className="text-gray-600 mb-4">
                    Top materials collected and their approximate environmental equivalent
                    (pilot targets applied).
                </p>

                <TapedContainer>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {top3.length > 0 ? (
                            top3.map((m, i) => {
                                const impact = computeImpact(m.name, m.collected);
                                const pilotTarget = pilotTargets[m.name] || pilotTargets.default;
                                return (
                                    <motion.div
                                        key={i}
                                        className="bg-gradient-to-b from-white to-[#FAFAFA] rounded-lg p-4 border border-gray-200 shadow-md cursor-default"
                                        whileHover={{ scale: 1.03, y: -3 }}
                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                    >
                                        <p className="text-xs text-gray-500">#{i + 1}</p>
                                        <p className="text-lg font-medium text-gray-700 mt-1">
                                            {m.name}
                                        </p>
                                        <p className="text-2xl font-bold mt-2 text-[#5E936C]">
                                            {numberFormat(m.collected)} pcs
                                        </p>
                                        {impact && (
                                            <p className="text-sm text-gray-600 mt-1">
                                                {impact.label}:{" "}
                                                <span className="font-semibold">{impact.value}</span>
                                            </p>
                                        )}
                                        <p className="text-xs text-gray-700 mt-2">
                                            Target (pilot): {numberFormat(pilotTarget)} pcs
                                        </p>
                                    </motion.div>
                                );
                            })
                        ) : (
                            <p className="text-gray-500">No collected materials yet.</p>
                        )}
                    </div>
                </TapedContainer>
            </motion.div>

            {/* === Closing Text === */}
            <motion.div
                className="text-center mt-10"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <p className="text-gray-600 text-sm italic">
                    Together, our community has collected{" "}
                    <span className="font-semibold text-[#5E936C]">
                        {numberFormat(collectedTotal)} recyclable items
                    </span>
                    , helping save trees, reduce waste, and inspire change — one submission
                    at a time. 🌍
                </p>
            </motion.div>
        </section>
    );
}

/* ===== Helper Components ===== */
function TapedContainer({ children }) {
    return (
        <div
            className="relative rounded-2xl p-6 border border-gray-100"
            style={{
                background: "linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
        >
            <div
                className="absolute -top-3 left-6 w-16 h-5 rotate-2 rounded-sm"
                style={{
                    background: "linear-gradient(90deg,#fff6c8,#f3e4c0)",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                }}
            />
            <div
                className="absolute -bottom-3 right-6 w-14 h-4 -rotate-2 rounded-sm"
                style={{
                    background: "linear-gradient(90deg,#e6f0ff,#dfe9ff)",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                }}
            />
            {children}
        </div>
    );
}

function DashboardCard({ icon, label, value, color }) {
    return (
        <div className="flex items-center gap-4">
            <div
                className={`p-3 rounded-lg ${color}`}
                style={{ boxShadow: "0 3px 8px rgba(0,0,0,0.08)" }}
            >
                {icon}
            </div>
            <div>
                <p className="text-gray-600 text-sm">{label}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
        </div>
    );
}

function numberFormat(n) {
    if (n === null || n === undefined) return "0";
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function roundTo(v, dp = 2) {
    return Math.round((v + Number.EPSILON) * Math.pow(10, dp)) / Math.pow(10, dp);
}

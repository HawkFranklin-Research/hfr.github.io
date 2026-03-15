import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    ShieldCheck,
    Video,
    CalendarCheck,
    CheckCircle2,
    ShieldAlert,
    Microscope,
    Server,
    Users,
    Activity,
    FileHeart,
    Lightbulb,
    Handshake,
    Globe,
    Mail,
    X,
    Stethoscope,
    Smartphone
} from 'lucide-react';
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Cell,
    CartesianGrid,
    LabelList
} from 'recharts';
import hawkLogo from '../../assets/hawkfranklin-logo.png';
import teamVatsal from '../../assets/team/vatsal_patel.jpg';
import teamAbhijeet from '../../assets/team/abhijeet_patel.jpg';
import teamYash from '../../assets/team/yash_patel.png';
import teamNishi from '../../assets/team/nishi_seth.png';
import teamSaurav from '../../assets/team/saurav_roy.jpeg';
import teamAnanya from '../../assets/team/ananya_pal.jpg';
import slide1CloseUp from '../../assets/slide1_close_up.jpeg';
import slide1Angled from '../../assets/slide1_angled.jpeg';
import slide1Context from '../../assets/slide1_context.jpeg';

// --- Data & Config ---

const PERFORMANCE_DATA = [
    { name: 'Grok-4', auc: 0.70, color: '#475569' },
    { name: 'CLIP+RF', auc: 0.80, color: '#475569' },
    { name: 'GPT-5', auc: 0.81, color: '#3b82f6' },
    { name: 'Gemini 2.5', auc: 0.82, color: '#6366f1' },
    { name: 'PelliScope', auc: 0.86, color: '#10b981' },
];

const TARGET_DISEASES = [
    "Eczema", "Allergic Contact Derm.", "Insect Bite", "Urticaria",
    "Psoriasis", "Folliculitis", "Irritant Contact Derm.", "Tinea",
    "Herpes Zoster", "Drug Rash"
];

const TEAM_MEMBERS = [
    { name: "Vatsal Patel", role: "Founder & Research Engineer", edu: "M.Sc Artificial Intelligence (IU Berlin)", photo: teamVatsal },
    { name: "Dr. Abhijeet Patel", role: "Clinical Research Physician", edu: "Bachelor of Medicine & Surgery", photo: teamAbhijeet },
    { name: "Dr. Yash Patel", role: "Clinical Research Physician", edu: "Bachelor of Medicine & Surgery", photo: teamYash },
    { name: "Dr. Nishi Seth", role: "Consultant Dermatologist", edu: "M.D Dermatology", photo: teamNishi },
    { name: "Saurav Roy", role: "Operations Head", edu: "M.Tech Biotechnology", photo: teamSaurav },
    { name: "Ananya Pal", role: "Finance & Accounting Head", edu: "B.S Economics", photo: teamAnanya },
];

const PORTFOLIO_ITEMS = [
    { icon: Microscope, title: "PathoLens", desc: "AI agents for digital pathology analysis" },
    { icon: Activity, title: "C-Risq", desc: "Multi-omics for cancer risk stratification" },
    { icon: Lightbulb, title: "MedDiscover", desc: "RAG copilot for biomedical Q&A" },
    { icon: Server, title: "Clinical FM", desc: "Foundation models for tabular EHR data" },
];

// --- Components ---

const SlideContainer = ({ children, isActive }) => (
    <div className={`absolute inset-0 transition-opacity duration-500 flex flex-col ${isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'}`}>
        {children}
    </div>
);

export default function InfoSession({ onBack, onClinician }) {
    const [currentSlide, setCurrentSlide] = useState(1);
    const [showDemo, setShowDemo] = useState(false);
    const totalSlides = 4;

    const nextSlide = () => {
        if (currentSlide < totalSlides) setCurrentSlide(c => c + 1);
    };

    const prevSlide = () => {
        if (currentSlide > 1) setCurrentSlide(c => c - 1);
    };

    return (
        <div className="h-full w-full bg-slate-900/50 flex items-center justify-center p-8 font-sans">

            {/* Main Screen Container */}
            <div className="relative w-full max-w-6xl h-[85vh] max-h-[800px] bg-[#0f172a] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">

                {/* Navigation Buttons (Edge) */}
                <button
                    onClick={prevSlide}
                    disabled={currentSlide === 1}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-0 disabled:pointer-events-none transition-all text-white border border-white/10 backdrop-blur-sm"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                    onClick={nextSlide}
                    disabled={currentSlide === totalSlides}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full transition-all text-white border backdrop-blur-sm flex items-center gap-2 ${currentSlide === totalSlides ? 'bg-white/5 border-white/10 opacity-40 cursor-not-allowed' : 'bg-white/5 hover:bg-white/10 border-white/10'}`}
                >
                    <ChevronRight className="h-6 w-6" />
                </button>

                {/* Slide Content Area */}
                <div className="flex-1 relative overflow-hidden">

                    {/* SLIDE 1: PRODUCT */}
                    <SlideContainer isActive={currentSlide === 1}>
                        <div className="flex-1 px-16 py-8 overflow-hidden">
                            <div className="grid grid-cols-12 gap-12">
                                {/* Left Col */}
                                <div className="col-span-5 flex flex-col justify-start space-y-6 pt-2">
                                    <h2 className="text-4xl font-bold text-white leading-tight">
                                        Dermatology AI <br />
                                        <span className="text-emerald-400">From intake to consult</span>
                                    </h2>

                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-6">
                                        <h4 className="text-xs font-bold text-white/50 uppercase tracking-wide">Ready to Deploy For</h4>
                                        <ul className="space-y-6">
                                            <li className="flex gap-4">
                                                <div className="h-10 w-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                                                    <ShieldCheck className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h5 className="font-bold text-white">Pre-Medical Inquiry</h5>
                                                    <p className="text-sm text-white/60">Triage before the patient sees a doctor.</p>
                                                </div>
                                            </li>
                                            <li className="flex gap-4">
                                                <div className="h-10 w-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                                                    <Video className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h5 className="font-bold text-white">Tele-Medicine Consultation</h5>
                                                    <p className="text-sm text-white/60">Cost-effective remote patient consultation.</p>
                                                </div>
                                            </li>
                                            <li className="flex gap-4">
                                                <div className="h-10 w-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                                                    <CalendarCheck className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h5 className="font-bold text-white">In-Patient Appointment Schedule</h5>
                                                    <p className="text-sm text-white/60">Prioritize urgency while sharing interim home care guidance.</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Right Col: Visual Card */}
                                <div className="col-span-7 flex items-start justify-center">
                                    <div className="w-full max-w-lg bg-white text-slate-900 rounded-3xl p-6 shadow-2xl transform transition-transform hover:scale-[1.02]">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="font-semibold text-slate-800">Patient Scan: #8829-A</h3>
                                            <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold flex items-center gap-2">
                                                <CheckCircle2 className="h-3 w-3" /> ANALYSIS COMPLETE
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-3 gap-2 mb-6">
                                            {[slide1CloseUp, slide1Angled, slide1Context].map((src, i) => (
                                                <div key={i} className="aspect-square rounded-lg overflow-hidden">
                                                    <img src={src} alt={`sample-${i}`} className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                        </div>

                                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex justify-between items-center mb-4">
                                            <div>
                                                <p className="text-xs text-slate-500 uppercase font-bold">Primary Detection</p>
                                                <p className="text-xl font-bold text-slate-800">Herpes Zoster</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-3xl font-bold text-emerald-600">74%</p>
                                                <p className="text-xs text-slate-500">Confidence</p>
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex justify-between text-xs font-medium text-slate-600">
                                                <span>Allergic Dermatitis</span>
                                                <span>59%</span>
                                            </div>
                                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-emerald-400 w-[59%]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Buttons & Accuracy Row */}
                            <div className="mt-8 flex items-center justify-between gap-4">
                                <div className="flex gap-4">
                                    <button
                                        onClick={onBack}
                                        className="flex items-center gap-3 px-6 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-500/20 transition-all hover:scale-105"
                                    >
                                        <Smartphone className="h-5 w-5 fill-current" />
                                        Patient Experience
                                    </button>
                                    <button
                                        onClick={onClinician}
                                        className="flex items-center gap-3 px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
                                    >
                                        <Stethoscope className="h-5 w-5" />
                                        Doctor's Experience
                                    </button>
                                </div>

                                <div className="flex items-center gap-3 px-6 py-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">
                                    <ShieldCheck className="h-5 w-5" />
                                    80.2% Accuracy on Technical Validation
                                </div>
                            </div>

                            {/* Footer Capabilities */}
                            <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-8">
                                <div className="flex gap-4">
                                    <ShieldAlert className="h-8 w-8 text-rose-400 shrink-0" />
                                    <div>
                                        <h5 className="font-bold text-white">Instant Clinical Support</h5>
                                        <p className="text-sm text-white/60 mt-1">Instantly distinguishes between infectious vs. non-infectious lesions.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Microscope className="h-8 w-8 text-amber-400 shrink-0" />
                                    <div>
                                        <h5 className="font-bold text-white">Diagnostic Assessment</h5>
                                        <p className="text-sm text-white/60 mt-1">Probability scoring for 10 common conditions.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Server className="h-8 w-8 text-emerald-400 shrink-0" />
                                    <div>
                                        <h5 className="font-bold text-white">CPU-Optimized</h5>
                                        <p className="text-sm text-white/60 mt-1">Resource optimized for any hardware. On-premises deployable.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SlideContainer>

                    {/* SLIDE 2: IMPACT */}
                    <SlideContainer isActive={currentSlide === 2}>
                        <div className="flex-1 px-16 py-8 overflow-hidden space-y-8">
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-4">
                                    <Activity className="h-8 w-8 text-emerald-400" />
                                    Impact & Performance
                                </h1>
                                <h2 className="text-lg font-medium text-white/60 ml-12">Faster pre-med intake and tele-medicine time savings</h2>
                            </div>

                            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                <h3 className="text-sm font-bold uppercase text-white/60 mb-3">Detects 10 Conditions</h3>
                                <div className="flex flex-wrap gap-3">
                                    {TARGET_DISEASES.map((d, i) => (
                                        <span key={i} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/80 hover:bg-white/10 transition-colors">
                                            {d}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Workflow Comparison */}
                                <div className="space-y-6">
                                    <h4 className="text-xl font-bold text-white flex items-center gap-2">
                                        <Users className="h-5 w-5 text-emerald-400" /> Streamlined Patient Flow
                                    </h4>

                                    {/* Traditional */}
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                        <div className="flex justify-between text-xs text-white/50 mb-2 uppercase font-bold tracking-wide">
                                            <span>Traditional Workflow</span>
                                            <span>3 Patients / Hour</span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm text-white/80">
                                                <span>Doctor Consultation</span>
                                                <span className="font-mono">20 min</span>
                                            </div>
                                            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-slate-500 w-full" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* PelliScope */}
                                    <div className="bg-emerald-900/10 rounded-2xl p-6 border border-emerald-500/30 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-16 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                        <div className="flex justify-between text-xs text-emerald-400 mb-2 uppercase font-bold tracking-wide relative z-10">
                                            <span>With PelliScope</span>
                                            <span className="bg-emerald-500 text-black px-2 py-0.5 rounded text-[10px]">+33% Efficiency</span>
                                        </div>

                                        <div className="flex gap-2 items-end relative z-10">
                                            <div className="w-1/4 space-y-2">
                                                <div className="h-3 bg-indigo-500 rounded-l-full" />
                                                <p className="text-[10px] text-indigo-300 text-center leading-tight">AI Intake<br />(-5 min)</p>
                                            </div>
                                            <div className="w-3/4 space-y-2">
                                                <div className="h-3 bg-emerald-500 rounded-r-full" />
                                                <p className="text-[10px] text-emerald-300 text-center leading-tight">Consultation<br />(15 min)</p>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-emerald-500/20 flex justify-between items-center relative z-10">
                                            <div className="flex -space-x-2">
                                                {[1, 2, 3, 4].map(i => (
                                                    <div key={i} className="w-8 h-8 rounded-full bg-emerald-600 border-2 border-black flex items-center justify-center">
                                                        <Users className="w-4 h-4 text-emerald-100" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="text-right">
                                                <span className="text-2xl font-bold text-emerald-400">4</span>
                                                <span className="text-xs text-emerald-500/70 uppercase block">Patients / Hour</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* SOTA Chart */}
                                <div className="bg-white/5 rounded-2xl p-6 border border-white/10 flex flex-col gap-3">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-sm font-bold uppercase text-white/70">SOTA Comparison</h3>
                                            <p className="text-xs text-white/40">Zero-shot AUC (smaller bars, closer)</p>
                                        </div>
                                        <span className="text-[11px] text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/30">AUC ↑</span>
                                    </div>
                                    <div className="flex-1 min-h-[140px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={PERFORMANCE_DATA} margin={{ top: 0, right: 10, left: -15, bottom: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                                <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                                                <YAxis domain={[0.6, 0.9]} hide />
                                                <Tooltip
                                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '10px', border: '1px solid #334155', color: '#fff' }}
                                                />
                                                <Bar dataKey="auc" radius={[3, 3, 3, 3]} barSize={18}>
                                                    {PERFORMANCE_DATA.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                    <LabelList
                                                        dataKey="auc"
                                                        position="top"
                                                        content={(props) => {
                                                            const { x, y, value, width } = props;
                                                            if (typeof value !== 'number' || x == null || y == null) return null;
                                                            return (
                                                                <text
                                                                    x={x + (width || 0) / 2}
                                                                    y={y}
                                                                    dy={-2}
                                                                    fill="#e2e8f0"
                                                                    fontSize={10}
                                                                    textAnchor="middle"
                                                                >
                                                                    {value.toFixed(2)}
                                                                </text>
                                                            );
                                                        }}
                                                    />
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="text-xs text-white/60">
                                        Pre-med tele-consult trims ~5 minutes from intake; keeps clinicians focused on high-value decisions.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SlideContainer>

                    {/* SLIDE 3: TEAM */}
                    <SlideContainer isActive={currentSlide === 3}>
                        <div className="flex-1 p-12 overflow-y-auto px-20">
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-4">
                                    <Users className="h-8 w-8 text-emerald-400" />
                                    The PelliScope Team
                                </h1>
                            </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {TEAM_MEMBERS.map((member, idx) => (
                                            <div key={idx} className="bg-white/5 rounded-2xl p-6 border border-white/10 flex flex-col items-center text-center hover:bg-white/10 transition-colors group">
                                                <div className="w-28 h-28 rounded-full mb-4 overflow-hidden border-2 border-white/20 shadow-lg group-hover:scale-110 transition-transform">
                                                    <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                                                </div>
                                                <h4 className="text-lg font-bold text-white">{member.name}</h4>
                                                <p className="text-emerald-400 text-sm font-medium mb-2">{member.role}</p>
                                                <p className="text-xs text-white/50">{member.edu}</p>
                                            </div>
                                        ))}
                            </div>
                        </div>
                    </SlideContainer>

                    {/* SLIDE 4: VISION */}
                    <SlideContainer isActive={currentSlide === 4}>
                        <div className="flex-1 p-12 overflow-y-auto px-20">
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-4">
                                    <Lightbulb className="h-8 w-8 text-emerald-400" />
                                    Where We’re Heading
                                </h1>
                                <h2 className="text-lg font-medium text-white/60 ml-12">Roadmap, partnerships, and the lab behind PelliScope</h2>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex gap-4 items-start">
                                        <div className="h-12 w-12 rounded-2xl bg-emerald-500/15 text-emerald-300 grid place-items-center border border-emerald-500/30">
                                            <ShieldCheck className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase text-white/50 font-bold">Care Delivery</p>
                                            <h3 className="text-lg font-semibold text-white mt-1">Tele-medicine first, in-clinic second</h3>
                                            <p className="text-sm text-white/60 mt-1">Pre-med intake trims queues, frees clinician time, and hands off context to follow-up visits.</p>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex gap-4 items-start">
                                        <div className="h-12 w-12 rounded-2xl bg-blue-500/15 text-blue-200 grid place-items-center border border-blue-500/30">
                                            <FileHeart className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase text-white/50 font-bold">Evidence</p>
                                            <h3 className="text-lg font-semibold text-white mt-1">Longitudinal records & outcomes</h3>
                                            <p className="text-sm text-white/60 mt-1">Track lesion changes, sync with EHRs, and surface risk shifts for chronic patients.</p>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex gap-4 items-start">
                                        <div className="h-12 w-12 rounded-2xl bg-amber-500/15 text-amber-200 grid place-items-center border border-amber-500/30">
                                            <Globe className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase text-white/50 font-bold">Scaling</p>
                                            <h3 className="text-lg font-semibold text-white mt-1">On-prem, cloud, or edge</h3>
                                            <p className="text-sm text-white/60 mt-1">CPU-first builds keep costs low; GPU-optional for higher throughput. Data stays in your tenancy.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-black/30 rounded-3xl p-8 border border-white/10 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl translate-x-10 -translate-y-16" />
                                    <div className="relative z-10 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <img src={hawkLogo} alt="HawkFranklin" className="h-12 w-12 rounded-2xl object-cover border border-white/20" />
                                            <div>
                                                <p className="text-xs uppercase text-amber-300 font-bold">HawkFranklin <span className="text-amber-400">Research</span></p>
                                                <h3 className="text-2xl font-bold text-white">Applied Clinical AI</h3>
                                            </div>
                                        </div>
                                        <p className="text-sm text-white/70 leading-relaxed">
                                            We build deployable health AI—dermatology today, oncology and multimodal triage next. Self-funded resilience and partner-led pilots keep us fast and careful.
                                        </p>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {PORTFOLIO_ITEMS.map((item, idx) => (
                                                <div key={idx} className="bg-white/5 rounded-2xl p-4 border border-white/10 flex items-start gap-3">
                                                    <item.icon className="h-6 w-6 text-emerald-300" />
                                                    <div>
                                                        <p className="text-sm font-semibold text-white">{item.title}</p>
                                                        <p className="text-[11px] text-white/60">{item.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </SlideContainer>

                </div>

                {/* Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-50">
                    {Array.from({ length: totalSlides }).map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === i + 1 ? 'w-8 bg-emerald-400' : 'w-1.5 bg-white/20'}`}
                        />
                    ))}
                </div>

            </div>
            {currentSlide === totalSlides ? (
                <div className="absolute bottom-4 right-6 z-50">
                    <button
                        onClick={() => setShowDemo(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-semibold shadow-lg"
                    >
                        Contact Us
                        <Mail className="h-4 w-4" />
                    </button>
                </div>
            ) : null}
            {/* Demo Modal */}
            <AnimatePresence>
                {showDemo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-8"
                        onClick={() => setShowDemo(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-md bg-[#0f172a] rounded-2xl overflow-hidden shadow-2xl border border-white/10 p-8"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowDemo(false)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
                            >
                                <X className="h-6 w-6" />
                            </button>
                            <div className="flex flex-col items-center gap-4 text-center text-white">
                                <div className="w-52 h-52 bg-white rounded-xl p-3 shadow-inner shadow-black/40">
                                    <div className="w-full h-full bg-[radial-gradient(circle_at_20%_20%,#000_8%,transparent_9%),radial-gradient(circle_at_50%_50%,#000_7%,transparent_8%),radial-gradient(circle_at_80%_70%,#000_9%,transparent_10%)] bg-repeat" />
                                </div>
                                <p className="text-sm text-white/70 max-w-xs">
                                    Scan to reach the HawkFranklin team. Point your camera at the QR to open email.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}

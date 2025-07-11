import {
    ChartLine,
    Hand,
    Link2,
    MonitorCheck,
    ShieldCheck,
    ThumbsUp,
    Zap,
} from "lucide-react";

export const BASE_URL = "http://localhost:3000";

export const aboutData = [
    {
        id: 1,
        icon: ThumbsUp,
        tag: "User-Friendly",
        tagline: "Linkify is simple, fast, and intuitive — just paste your long URL and get a short one instantly.",
    },
    {
        id: 2,
        icon: Zap,
        tag: "Instant Shortening",
        tagline: "No matter how long the link is, Linkify shortens it in a flash — every time.",
    },
    {
        id: 3,
        icon: ShieldCheck,
        tag: "Secure",
        tagline: "All links are encrypted and served over HTTPS to ensure privacy and protection.",
    },
    {
        id: 4,
        icon: ChartLine,
        tag: "Analytics",
        tagline: "Track how many times your shortened link is clicked with real-time statistics.",
    },
    {
        id: 5,
        icon: Hand,
        tag: "Reliable",
        tagline: "We actively block spam, malware, and harmful content to keep your links clean and trustworthy.",
    },
    {
        id: 6,
        icon: MonitorCheck,
        tag: "Cross-Device",
        tagline: "Access and manage your shortened links seamlessly across all devices.",
    },
];

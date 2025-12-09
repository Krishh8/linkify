import { motion } from "framer-motion";

function Box({ box }) {
    const { icon: Icon, tag, tagline } = box;
    return (
        <motion.div whileHover={{
            scale: 1.1
        }} transition={{
            type: "spring",
            stiffness: 100,
            damping: 10
        }}>
            <div className="px-10 py-10 flex justify-center shadow-2xl gap-2 items-center flex-col">
                <Icon className="headingText" />
                <h4 className="text-xl font-semibold subHeadingText">{tag}</h4>
                <p className="text-sm subHeadingText text-center">{tagline}</p>
            </div>
        </motion.div>
    );
}

export default Box;
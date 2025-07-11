import { motion } from "motion/react";

motion

const Box = ({ box }) => {
    const { icon: Icon, tag, tagline } = box;
    return (
        <motion.div whileHover={{
            scale: 1.1
        }}>
            <div className="px-10 py-10 flex justify-center shadow-2xl gap-2 items-center flex-col">
                <Icon className="text-white" />
                <h4 className="text-xl font-semibold text-gray-200">{tag}</h4>
                <p className="text-sm text-gray-100 text-center">{tagline}</p>
            </div>
        </motion.div>
    )
}

export default Box
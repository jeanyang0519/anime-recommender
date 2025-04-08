import { motion } from "framer-motion";

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
        className="text-4xl"
      >
        ⏳
      </motion.div>
      <div className="font-2xl">Loading</div>
    </div>
  );
}

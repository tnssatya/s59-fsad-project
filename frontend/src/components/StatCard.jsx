import { motion } from "framer-motion";

function StatCard({ label, value }) {
  return (
    <motion.article
      className="stat-card"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <p className="muted">{label}</p>
      <h3>{value}</h3>
    </motion.article>
  );
}

export default StatCard;

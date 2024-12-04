import { motion } from 'framer-motion';

const MotionDiv = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 1, delay: delay }}
    >
      {children}
    </motion.div>
  );
};

export default MotionDiv;
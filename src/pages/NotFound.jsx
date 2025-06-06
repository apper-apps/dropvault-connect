import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
        >
          <ApperIcon name="FileX" size={48} className="text-white" />
        </motion.div>
        
        <h1 className="text-6xl font-bold font-heading text-surface-800 dark:text-surface-200 mb-4">
          404
        </h1>
        <p className="text-xl text-surface-600 dark:text-surface-400 mb-8 max-w-md">
          Oops! This file seems to have been moved or deleted.
        </p>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-soft hover:shadow-card transition-all duration-300"
          >
            <ApperIcon name="ArrowLeft" size={20} className="mr-2" />
            Back to Upload
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFound
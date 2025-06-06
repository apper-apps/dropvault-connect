import { motion } from 'framer-motion'
      import PropTypes from 'prop-types'
      
      const Button = ({ children, className, onClick, whileHover, whileTap, type = 'button', ...props }) => {
        return (
          <motion.button
            type={type}
            onClick={onClick}
            className={className}
            whileHover={whileHover}
            whileTap={whileTap}
            {...props}
          >
            {children}
          </motion.button>
        )
      }
      
      Button.propTypes = {
        children: PropTypes.node.isRequired,
        className: PropTypes.string,
        onClick: PropTypes.func,
        whileHover: PropTypes.object,
        whileTap: PropTypes.object,
        type: PropTypes.string,
      }
      
      export default Button
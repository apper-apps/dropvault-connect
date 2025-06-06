import { motion } from 'framer-motion'
      import PropTypes from 'prop-types'
      
      const Title = ({ children, className, as = 'h2', ...props }) => {
        const Tag = as
        return (
          <Tag className={className} {...props}>
            {children}
          </Tag>
        )
      }
      
      Title.propTypes = {
        children: PropTypes.node.isRequired,
        className: PropTypes.string,
        as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
      }
      
      export default Title
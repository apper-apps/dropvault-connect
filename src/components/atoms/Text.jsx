import React from 'react'
import PropTypes from 'prop-types'
      
      const Text = ({ children, className, as = 'p', ...props }) => {
        const Tag = as
        return (
          <Tag className={className} {...props}>
            {children}
          </Tag>
        )
      }
      
Text.propTypes = {
        children: PropTypes.node.isRequired,
        className: PropTypes.string,
        as: PropTypes.oneOf(['p', 'span', 'div', 'label', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
      }
      
      export default Text
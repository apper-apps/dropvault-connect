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
        as: PropTypes.oneOf(['p', 'span', 'div', 'label']),
      }
      
      export default Text
import PropTypes from 'prop-types'
      import ApperIcon from '@/components/ApperIcon'
      
      const Icon = ({ name, size = 20, className }) => {
        return <ApperIcon name={name} size={size} className={className} />
      }
      
      Icon.propTypes = {
        name: PropTypes.string.isRequired,
        size: PropTypes.number,
        className: PropTypes.string,
      }
      
      export default Icon
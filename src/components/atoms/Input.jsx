import { forwardRef } from 'react'
      import PropTypes from 'prop-types'
      
      const Input = forwardRef(({ type = 'text', className, onChange, value, ...props }, ref) => {
        return (
          <input
            ref={ref}
            type={type}
            onChange={onChange}
            value={value}
            className={className}
            {...props}
          />
        )
      })
      
      Input.displayName = 'Input'
      
      Input.propTypes = {
        type: PropTypes.string,
        className: PropTypes.string,
        onChange: PropTypes.func,
        value: PropTypes.string,
      }
      
      export default Input
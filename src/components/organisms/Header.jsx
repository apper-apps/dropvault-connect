import { motion } from 'framer-motion'
      import PropTypes from 'prop-types'
      import HeaderLogo from '@/components/molecules/HeaderLogo'
      import Icon from '@/components/atoms/Icon'
      import Button from '@/components/atoms/Button'
      
      const Header = ({ isDark, onToggleDarkMode }) => {
        return (
          <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="sticky top-0 z-50 glass dark:glass-dark"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <HeaderLogo />
      
                <Button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onToggleDarkMode}
                  className="p-2 rounded-xl glass dark:glass-dark hover:bg-white/20 dark:hover:bg-black/20 transition-colors"
                >
                  <Icon
                    name={isDark ? "Sun" : "Moon"}
                    size={20}
                    className="text-surface-600 dark:text-surface-300"
                  />
                </Button>
              </div>
            </div>
          </motion.header>
        )
      }
      
      Header.propTypes = {
        isDark: PropTypes.bool.isRequired,
        onToggleDarkMode: PropTypes.func.isRequired,
      }
      
      export default Header
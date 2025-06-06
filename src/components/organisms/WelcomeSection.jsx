import PropTypes from 'prop-types'
      import { motion } from 'framer-motion'
      import Icon from '@/components/atoms/Icon'
      import Title from '@/components/atoms/Title'
      import Text from '@/components/atoms/Text'
      
      const WelcomeSection = ({ error }) => {
        return (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-12"
          >
            <Title as="h2" className="text-4xl sm:text-5xl font-bold font-heading text-surface-800 dark:text-surface-200 mb-4">
              Upload & Share Files
              <span className="block text-2xl sm:text-3xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mt-2">
                Instantly
              </span>
            </Title>
            <Text as="p" className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
              Drag, drop, and share your files with ease. Beautiful interface, lightning fast uploads.
            </Text>
      
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mt-6"
              >
                <div className="flex items-center">
                  <Icon name="AlertCircle" size={20} className="text-red-500 mr-2" />
                  <Text as="span" className="text-red-700 dark:text-red-300">{error}</Text>
                </div>
              </motion.div>
            )}
          </motion.div>
        )
      }
      
      WelcomeSection.propTypes = {
        error: PropTypes.string,
      }
      
      export default WelcomeSection
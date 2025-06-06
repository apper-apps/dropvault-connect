import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '@/components/atoms/Icon'
import Title from '@/components/atoms/Title'
import Text from '@/components/atoms/Text'

const UploadProgressModal = ({ uploading, uploadProgress }) => {
  if (!uploading || Object.keys(uploadProgress).length === 0) return null

  return (
          <AnimatePresence>
            {uploading && Object.keys(uploadProgress).length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              >
                <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 max-w-md w-full mx-4 shadow-neu-light dark:shadow-neu-dark">
                  <Title as="h3" className="text-xl font-semibold text-surface-800 dark:text-surface-200 mb-4 flex items-center">
                    <Icon name="Upload" size={24} className="mr-2 text-primary" />
                    Uploading Files
                  </Title>
                  <div className="space-y-3">
                    {Object.entries(uploadProgress).map(([fileId, progress]) => (
                      <div key={fileId} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <Text as="span" className="text-surface-600 dark:text-surface-400">File {fileId.split('-')[2]}</Text>
                          <Text as="span" className="text-surface-800 dark:text-surface-200 font-medium">{Math.round(progress)}%</Text>
                        </div>
                        <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )
      }
      
      UploadProgressModal.propTypes = {
        uploading: PropTypes.bool.isRequired,
        uploadProgress: PropTypes.object.isRequired,
      }
      
      export default UploadProgressModal
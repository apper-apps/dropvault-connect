import PropTypes from 'prop-types'
      import { motion, AnimatePresence } from 'framer-motion'
      import Icon from '@/components/atoms/Icon'
      import Title from '@/components/atoms/Title'
      import Text from '@/components/atoms/Text'
      import Input from '@/components/atoms/Input'
      import Button from '@/components/atoms/Button'
      
      const FileShareModal = ({ shareFile, onClose, onCopyLink, onQuickShare }) => {
        if (!shareFile) return null
      
        return (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={onClose}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-surface-800 rounded-2xl p-6 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <Title as="h3" className="text-xl font-semibold text-surface-800 dark:text-surface-200">
                    Share File
                  </Title>
                  <Button
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="p-2 rounded-lg bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400"
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </div>
      
                <div className="space-y-4">
                  <div>
                    <Text as="label" htmlFor="share-link-input" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Share Link
                    </Text>
                    <div className="flex">
                      <Input
                        id="share-link-input"
                        type="text"
                        value={shareFile.shareLink}
                        readOnly
                        className="flex-1 px-3 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-300 dark:border-surface-600 rounded-l-lg text-sm text-surface-800 dark:text-surface-200"
                      />
                      <Button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onCopyLink(shareFile.shareLink)}
                        className="px-4 py-2 bg-primary text-white rounded-r-lg hover:bg-primary-dark transition-colors"
                      >
                        <Icon name="Copy" size={16} />
                      </Button>
                    </div>
                  </div>
      
                  <div>
                    <Text as="label" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Quick Share
                    </Text>
                    <div className="flex space-x-2">
                      {['Twitter', 'Facebook', 'Mail'].map((platform) => (
                        <Button
                          key={platform}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => onQuickShare(platform)}
                          className="flex-1 px-3 py-2 bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors text-sm"
                        >
                          {platform}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )
      }
      
      FileShareModal.propTypes = {
        shareFile: PropTypes.object,
        onClose: PropTypes.func.isRequired,
        onCopyLink: PropTypes.func.isRequired,
        onQuickShare: PropTypes.func.isRequired,
      }
      
      export default FileShareModal
import PropTypes from 'prop-types'
      import { motion, AnimatePresence } from 'framer-motion'
      import { formatDistanceToNow } from 'date-fns'
      import Icon from '@/components/atoms/Icon'
      import Title from '@/components/atoms/Title'
      import Text from '@/components/atoms/Text'
      import Button from '@/components/atoms/Button'
      
      const FilePreviewModal = ({ selectedFile, onClose, onShare, onDownload }) => {
        const formatFileSize = (bytes) => {
          if (bytes === 0) return '0 Bytes'
          const k = 1024
          const sizes = ['Bytes', 'KB', 'MB', 'GB']
          const i = Math.floor(Math.log(bytes) / Math.log(k))
          return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
        }
      
        if (!selectedFile) return null
      
        return (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={onClose}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-surface-800 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <Title as="h3" className="text-xl font-semibold text-surface-800 dark:text-surface-200 truncate">
                    {selectedFile.name}
                  </Title>
                  <Button
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="p-2 rounded-lg bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </div>
      
                {selectedFile.thumbnailUrl && (
                  <div className="mb-4 rounded-xl overflow-hidden">
                    <img
                      src={selectedFile.thumbnailUrl}
                      alt={selectedFile.name}
                      className="w-full max-h-96 object-contain bg-surface-100 dark:bg-surface-700"
                    />
                  </div>
                )}
      
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <Text as="span" className="text-surface-600 dark:text-surface-400">Size:</Text>
                    <Text as="span" className="text-surface-800 dark:text-surface-200">{formatFileSize(selectedFile.size)}</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text as="span" className="text-surface-600 dark:text-surface-400">Type:</Text>
                    <Text as="span" className="text-surface-800 dark:text-surface-200">{selectedFile.type}</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text as="span" className="text-surface-600 dark:text-surface-400">Uploaded:</Text>
                    <Text as="span" className="text-surface-800 dark:text-surface-200">
                      {formatDistanceToNow(new Date(selectedFile.uploadDate))} ago
                    </Text>
                  </div>
                </div>
      
                <div className="flex space-x-3 mt-6">
                  <Button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onShare(selectedFile)}
                    className="flex-1 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors flex items-center justify-center"
                  >
                    <Icon name="Share2" size={16} className="mr-2" />
                    Share
                  </Button>
                  <Button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onDownload(selectedFile)}
                    className="flex-1 px-4 py-2 bg-secondary text-white rounded-xl hover:bg-secondary-dark transition-colors flex items-center justify-center"
                  >
                    <Icon name="Download" size={16} className="mr-2" />
                    Download
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )
      }
      
      FilePreviewModal.propTypes = {
        selectedFile: PropTypes.object,
        onClose: PropTypes.func.isRequired,
        onShare: PropTypes.func.isRequired,
        onDownload: PropTypes.func.isRequired,
      }
      
      export default FilePreviewModal
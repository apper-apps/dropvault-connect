import PropTypes from 'prop-types'
      import { motion } from 'framer-motion'
      import Icon from '@/components/atoms/Icon'
      import Button from '@/components/atoms/Button'
      import Text from '@/components/atoms/Text'
      
      const FileCard = ({ file, formatFileSize, getFileIcon, onShare, onDelete, onClick, index }) => {
        return (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group glass dark:glass-dark rounded-xl p-4 hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => onClick(file)}
          >
            <div className="space-y-3">
              <div className="aspect-square rounded-lg bg-gradient-to-br from-surface-100 to-surface-200 dark:from-surface-700 dark:to-surface-600 flex items-center justify-center overflow-hidden">
                {file.thumbnailUrl ? (
                  <img
                    src={file.thumbnailUrl}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Icon
                    name={getFileIcon(file.type)}
                    size={32}
                    className="text-surface-500 dark:text-surface-400"
                  />
                )}
              </div>
              <div>
                <Text as="h4" className="font-medium text-surface-800 dark:text-surface-200 truncate text-sm">
                  {file.name}
                </Text>
                <Text as="p" className="text-xs text-surface-600 dark:text-surface-400 mt-1">
                  {formatFileSize(file.size)} • {file.timeAgo}
                </Text>
              </div>
              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    onShare(file)
                  }}
                  className="flex-1 px-3 py-1 bg-primary text-white text-xs rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Share
                </Button>
                <Button
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(file.id)
                  }}
                  className="px-2 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors"
                >
                  <Icon name="Trash2" size={12} />
                </Button>
              </div>
            </div>
          </motion.div>
        )
      }
      
      FileCard.propTypes = {
        file: PropTypes.object.isRequired,
        formatFileSize: PropTypes.func.isRequired,
        getFileIcon: PropTypes.func.isRequired,
        onShare: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired,
        onClick: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
      }
      
      export default FileCard
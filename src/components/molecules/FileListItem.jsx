import PropTypes from 'prop-types'
      import { motion } from 'framer-motion'
      import Icon from '@/components/atoms/Icon'
      import Button from '@/components/atoms/Button'
      import Text from '@/components/atoms/Text'
      
      const FileListItem = ({ file, formatFileSize, getFileIcon, onShare, onDelete, onClick, index }) => {
        return (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group glass dark:glass-dark rounded-xl p-4 hover:bg-white/20 dark:hover:bg-black/20 transition-colors cursor-pointer"
            onClick={() => onClick(file)}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-surface-100 to-surface-200 dark:from-surface-700 dark:to-surface-600 flex items-center justify-center flex-shrink-0">
                {file.thumbnailUrl ? (
                  <img
                    src={file.thumbnailUrl}
                    alt={file.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <Icon
                    name={getFileIcon(file.type)}
                    size={20}
                    className="text-surface-500 dark:text-surface-400"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <Text as="h4" className="font-medium text-surface-800 dark:text-surface-200 truncate">
                  {file.name}
                </Text>
                <Text as="p" className="text-sm text-surface-600 dark:text-surface-400">
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
                  className="px-3 py-1 bg-primary text-white text-sm rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Share
                </Button>
                <Button
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(file.id)
                  }}
                  className="p-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </div>
          </motion.div>
        )
      }
      
      FileListItem.propTypes = {
        file: PropTypes.object.isRequired,
        formatFileSize: PropTypes.func.isRequired,
        getFileIcon: PropTypes.func.isRequired,
        onShare: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired,
        onClick: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
      }
      
      export default FileListItem
import PropTypes from 'prop-types'
      import { motion } from 'framer-motion'
      import { formatDistanceToNow } from 'date-fns'
      import Icon from '@/components/atoms/Icon'
      import Title from '@/components/atoms/Title'
      import Text from '@/components/atoms/Text'
      import FileCard from '@/components/molecules/FileCard'
      import FileListItem from '@/components/molecules/FileListItem'
      
      const FileGallery = ({ files, loading, viewMode, onShare, onDelete, onSelectFile }) => {
        const formatFileSize = (bytes) => {
          if (bytes === 0) return '0 Bytes'
          const k = 1024
          const sizes = ['Bytes', 'KB', 'MB', 'GB']
          const i = Math.floor(Math.log(bytes) / Math.log(k))
          return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
        }
      
        const getFileIcon = (type) => {
          if (type?.startsWith('image/')) return 'Image'
          if (type?.includes('pdf')) return 'FileText'
          if (type?.startsWith('video/')) return 'Video'
          if (type?.startsWith('audio/')) return 'Music'
          if (type?.includes('zip') || type?.includes('rar')) return 'Archive'
          return 'File'
        }
      
        if (loading) {
          return (
            <div className="flex items-center justify-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
              />
            </div>
          )
        }
      
        if (!files || files.length === 0) {
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-surface-200 to-surface-300 dark:from-surface-700 dark:to-surface-600 flex items-center justify-center"
              >
                <Icon name="FileUp" size={48} className="text-surface-500 dark:text-surface-400" />
              </motion.div>
              <Title as="h3" className="text-xl font-semibold text-surface-800 dark:text-surface-200 mb-2">
                No files uploaded yet
              </Title>
              <Text as="p" className="text-surface-600 dark:text-surface-400">
                Start by uploading your first file using the area above
              </Text>
            </motion.div>
          )
        }
      
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-3'
            }
          >
            {files.map((file, index) => {
              const fileWithTimeAgo = {
                ...file,
                timeAgo: formatDistanceToNow(new Date(file.uploadDate)) + ' ago'
              }
      
              return viewMode === 'grid' ? (
                <FileCard
                  key={file.id}
                  file={fileWithTimeAgo}
                  formatFileSize={formatFileSize}
                  getFileIcon={getFileIcon}
                  onShare={onShare}
                  onDelete={onDelete}
                  onClick={onSelectFile}
                  index={index}
                />
              ) : (
                <FileListItem
                  key={file.id}
                  file={fileWithTimeAgo}
                  formatFileSize={formatFileSize}
                  getFileIcon={getFileIcon}
                  onShare={onShare}
                  onDelete={onDelete}
                  onClick={onSelectFile}
                  index={index}
                />
              )
            })}
          </motion.div>
        )
      }
      
      FileGallery.propTypes = {
        files: PropTypes.array,
        loading: PropTypes.bool.isRequired,
        viewMode: PropTypes.string.isRequired,
        onShare: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired,
        onSelectFile: PropTypes.func.isRequired,
      }
      
      export default FileGallery
import { useRef } from 'react'
      import { motion } from 'framer-motion'
      import PropTypes from 'prop-types'
      import Icon from '@/components/atoms/Icon'
      import Title from '@/components/atoms/Title'
      import Text from '@/components/atoms/Text'
      import Button from '@/components/atoms/Button'
      import Input from '@/components/atoms/Input'
      
      const FileUploadZone = ({ isDragOver, onDragOver, onDragLeave, onDrop, onFileInputChange }) => {
        const fileInputRef = useRef(null)
      
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                isDragOver
                  ? 'border-primary bg-primary/5 scale-105'
                  : 'border-surface-300 dark:border-surface-600 hover:border-primary/50'
              } glass dark:glass-dark`}
            >
              <motion.div
                animate={{
                  scale: isDragOver ? 1.1 : 1,
                  rotate: isDragOver ? 5 : 0
                }}
                className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
              >
                <Icon name="CloudUpload" size={32} className="text-white" />
              </motion.div>
      
              <Title as="h3" className="text-2xl font-semibold text-surface-800 dark:text-surface-200 mb-2">
                {isDragOver ? 'Drop files here!' : 'Drag & drop files'}
              </Title>
              <Text as="p" className="text-surface-600 dark:text-surface-400 mb-6">
                or click to browse from your device
              </Text>
      
              <Button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => fileInputRef.current?.click()}
                className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-soft hover:shadow-card transition-all duration-300"
              >
                Choose Files
              </Button>
      
              <Input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={onFileInputChange}
                className="hidden"
                accept="*/*"
              />
            </div>
          </motion.div>
        )
      }
      
      FileUploadZone.propTypes = {
        isDragOver: PropTypes.bool.isRequired,
        onDragOver: PropTypes.func.isRequired,
        onDragLeave: PropTypes.func.isRequired,
        onDrop: PropTypes.func.isRequired,
        onFileInputChange: PropTypes.func.isRequired,
      }
      
      export default FileUploadZone
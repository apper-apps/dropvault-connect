import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

function MainFeature({ files, loading, onFileUpload, onFileDelete }) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({})
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('date')
  const [selectedFile, setSelectedFile] = useState(null)
  const [shareFile, setShareFile] = useState(null)
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFileSelection(droppedFiles)
  }

  const handleFileInputChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    handleFileSelection(selectedFiles)
  }

  const handleFileSelection = async (selectedFiles) => {
    if (selectedFiles.length === 0) return

    setUploading(true)
    const fileData = []

    for (const file of selectedFiles) {
      // Simulate upload progress
      const fileId = `temp-${Date.now()}-${Math.random()}`
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }))

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const current = prev[fileId] || 0
          const newProgress = Math.min(current + Math.random() * 20, 100)
          if (newProgress >= 100) {
            clearInterval(progressInterval)
          }
          return { ...prev, [fileId]: newProgress }
        })
      }, 200)

      const fileObj = {
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date(),
        url: URL.createObjectURL(file),
        thumbnailUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
        shareLink: `https://dropvault.com/share/${Date.now()}`
      }

      fileData.push(fileObj)
    }

    // Wait for all progress to complete
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    await onFileUpload(fileData)
    setUploading(false)
    setUploadProgress({})
  }

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

  const sortedFiles = [...(files || [])].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name?.localeCompare(b.name || '') || 0
      case 'size':
        return (b.size || 0) - (a.size || 0)
      case 'type':
        return (a.type || '').localeCompare(b.type || '')
      case 'date':
      default:
        return new Date(b.uploadDate || 0) - new Date(a.uploadDate || 0)
    }
  })

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Link copied to clipboard!')
    } catch (err) {
      toast.error('Failed to copy link')
    }
  }

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
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
            <ApperIcon name="CloudUpload" size={32} className="text-white" />
          </motion.div>
          
          <h3 className="text-2xl font-semibold text-surface-800 dark:text-surface-200 mb-2">
            {isDragOver ? 'Drop files here!' : 'Drag & drop files'}
          </h3>
          <p className="text-surface-600 dark:text-surface-400 mb-6">
            or click to browse from your device
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => fileInputRef.current?.click()}
            className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-soft hover:shadow-card transition-all duration-300"
          >
            Choose Files
          </motion.button>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileInputChange}
            className="hidden"
            accept="*/*"
          />
        </div>
      </motion.div>

      {/* Upload Progress */}
      <AnimatePresence>
        {uploading && Object.keys(uploadProgress).length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 max-w-md w-full mx-4 shadow-neu-light dark:shadow-neu-dark">
              <h3 className="text-xl font-semibold text-surface-800 dark:text-surface-200 mb-4 flex items-center">
                <ApperIcon name="Upload" size={24} className="mr-2 text-primary" />
                Uploading Files
              </h3>
              <div className="space-y-3">
                {Object.entries(uploadProgress).map(([fileId, progress]) => (
                  <div key={fileId} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-surface-600 dark:text-surface-400">File {fileId.split('-')[2]}</span>
                      <span className="text-surface-800 dark:text-surface-200 font-medium">{Math.round(progress)}%</span>
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

      {/* Controls */}
      {files?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 glass dark:glass-dark rounded-xl"
        >
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <ApperIcon name="Filter" size={16} className="text-surface-600 dark:text-surface-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-surface-800 dark:text-surface-200 text-sm border-none outline-none"
              >
                <option value="date">Date</option>
                <option value="name">Name</option>
                <option value="size">Size</option>
                <option value="type">Type</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-primary text-white'
                  : 'text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700'
              }`}
            >
              <ApperIcon name="Grid3X3" size={16} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-primary text-white'
                  : 'text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700'
              }`}
            >
              <ApperIcon name="List" size={16} />
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Files Display */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
          />
        </div>
      ) : files?.length === 0 ? (
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
            <ApperIcon name="FileUp" size={48} className="text-surface-500 dark:text-surface-400" />
          </motion.div>
          <h3 className="text-xl font-semibold text-surface-800 dark:text-surface-200 mb-2">
            No files uploaded yet
          </h3>
          <p className="text-surface-600 dark:text-surface-400">
            Start by uploading your first file using the area above
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-3'
          }
        >
          {sortedFiles.map((file, index) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={
                viewMode === 'grid'
                  ? 'group glass dark:glass-dark rounded-xl p-4 hover:scale-105 transition-all duration-300 cursor-pointer'
                  : 'group glass dark:glass-dark rounded-xl p-4 hover:bg-white/20 dark:hover:bg-black/20 transition-colors'
              }
              onClick={() => setSelectedFile(file)}
            >
              {viewMode === 'grid' ? (
                <div className="space-y-3">
                  <div className="aspect-square rounded-lg bg-gradient-to-br from-surface-100 to-surface-200 dark:from-surface-700 dark:to-surface-600 flex items-center justify-center overflow-hidden">
                    {file.thumbnailUrl ? (
                      <img 
                        src={file.thumbnailUrl} 
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ApperIcon 
                        name={getFileIcon(file.type)} 
                        size={32} 
                        className="text-surface-500 dark:text-surface-400"
                      />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-surface-800 dark:text-surface-200 truncate text-sm">
                      {file.name}
                    </h4>
                    <p className="text-xs text-surface-600 dark:text-surface-400 mt-1">
                      {formatFileSize(file.size)} • {formatDistanceToNow(new Date(file.uploadDate))} ago
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        setShareFile(file)
                      }}
                      className="flex-1 px-3 py-1 bg-primary text-white text-xs rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      Share
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        onFileDelete(file.id)
                      }}
                      className="px-2 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <ApperIcon name="Trash2" size={12} />
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-surface-100 to-surface-200 dark:from-surface-700 dark:to-surface-600 flex items-center justify-center flex-shrink-0">
                    {file.thumbnailUrl ? (
                      <img 
                        src={file.thumbnailUrl} 
                        alt={file.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <ApperIcon 
                        name={getFileIcon(file.type)} 
                        size={20} 
                        className="text-surface-500 dark:text-surface-400"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-surface-800 dark:text-surface-200 truncate">
                      {file.name}
                    </h4>
                    <p className="text-sm text-surface-600 dark:text-surface-400">
                      {formatFileSize(file.size)} • {formatDistanceToNow(new Date(file.uploadDate))} ago
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        setShareFile(file)
                      }}
                      className="px-3 py-1 bg-primary text-white text-sm rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      Share
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        onFileDelete(file.id)
                      }}
                      className="p-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <ApperIcon name="Trash2" size={16} />
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* File Preview Modal */}
      <AnimatePresence>
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedFile(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-surface-800 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-surface-800 dark:text-surface-200 truncate">
                  {selectedFile.name}
                </h3>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedFile(null)}
                  className="p-2 rounded-lg bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                >
                  <ApperIcon name="X" size={20} />
                </motion.button>
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
                  <span className="text-surface-600 dark:text-surface-400">Size:</span>
                  <span className="text-surface-800 dark:text-surface-200">{formatFileSize(selectedFile.size)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-600 dark:text-surface-400">Type:</span>
                  <span className="text-surface-800 dark:text-surface-200">{selectedFile.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-600 dark:text-surface-400">Uploaded:</span>
                  <span className="text-surface-800 dark:text-surface-200">
                    {formatDistanceToNow(new Date(selectedFile.uploadDate))} ago
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShareFile(selectedFile)}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors flex items-center justify-center"
                >
                  <ApperIcon name="Share2" size={16} className="mr-2" />
                  Share
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const link = document.createElement('a')
                    link.href = selectedFile.url
                    link.download = selectedFile.name
                    link.click()
                  }}
                  className="flex-1 px-4 py-2 bg-secondary text-white rounded-xl hover:bg-secondary-dark transition-colors flex items-center justify-center"
                >
                  <ApperIcon name="Download" size={16} className="mr-2" />
                  Download
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {shareFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShareFile(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-surface-800 rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-surface-800 dark:text-surface-200">
                  Share File
                </h3>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShareFile(null)}
                  className="p-2 rounded-lg bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-400"
                >
                  <ApperIcon name="X" size={20} />
                </motion.button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Share Link
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      value={shareFile.shareLink}
                      readOnly
                      className="flex-1 px-3 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-300 dark:border-surface-600 rounded-l-lg text-sm text-surface-800 dark:text-surface-200"
                    />
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => copyToClipboard(shareFile.shareLink)}
                      className="px-4 py-2 bg-primary text-white rounded-r-lg hover:bg-primary-dark transition-colors"
                    >
                      <ApperIcon name="Copy" size={16} />
                    </motion.button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Quick Share
                  </label>
                  <div className="flex space-x-2">
                    {['Twitter', 'Facebook', 'Mail'].map((platform) => (
                      <motion.button
                        key={platform}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toast.info(`Shared via ${platform}!`)}
                        className="flex-1 px-3 py-2 bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 rounded-lg hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors text-sm"
                      >
                        {platform}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature
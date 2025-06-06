import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import fileService from '../services/api/fileService'

function Home() {
  const [isDark, setIsDark] = useState(false)
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadFiles = async () => {
      setLoading(true)
      try {
        const result = await fileService.getAll()
        setFiles(result)
      } catch (err) {
        setError(err.message)
        toast.error('Failed to load files')
      } finally {
        setLoading(false)
      }
    }
    loadFiles()
  }, [])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const toggleDarkMode = () => {
    setIsDark(!isDark)
  }

  const handleFileUpload = async (uploadedFiles) => {
    try {
      const newFiles = []
      for (const file of uploadedFiles) {
        const result = await fileService.create(file)
        newFiles.push(result)
      }
      setFiles(prev => [...prev, ...newFiles])
      toast.success(`${newFiles.length} file(s) uploaded successfully`)
    } catch (err) {
      toast.error('Failed to upload files')
    }
  }

  const handleFileDelete = async (fileId) => {
    try {
      await fileService.delete(fileId)
      setFiles(prev => prev.filter(f => f.id !== fileId))
      toast.success('File deleted successfully')
    } catch (err) {
      toast.error('Failed to delete file')
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 glass dark:glass-dark"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <ApperIcon name="CloudUpload" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                DropVault
              </h1>
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-xl glass dark:glass-dark hover:bg-white/20 dark:hover:bg-black/20 transition-colors"
            >
              <ApperIcon 
                name={isDark ? "Sun" : "Moon"} 
                size={20} 
                className="text-surface-600 dark:text-surface-300"
              />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold font-heading text-surface-800 dark:text-surface-200 mb-4">
            Upload & Share Files
            <span className="block text-2xl sm:text-3xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mt-2">
              Instantly
            </span>
          </h2>
          <p className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
            Drag, drop, and share your files with ease. Beautiful interface, lightning fast uploads.
          </p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6"
          >
            <div className="flex items-center">
              <ApperIcon name="AlertCircle" size={20} className="text-red-500 mr-2" />
              <span className="text-red-700 dark:text-red-300">{error}</span>
            </div>
          </motion.div>
        )}

        <MainFeature
          files={files}
          loading={loading}
          onFileUpload={handleFileUpload}
          onFileDelete={handleFileDelete}
        />
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-20 py-8 border-t border-surface-200 dark:border-surface-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-surface-600 dark:text-surface-400">
            Made with ❤️ for seamless file sharing
          </p>
        </div>
      </motion.footer>
    </div>
  )
}

export default Home
import { useState, useEffect } from 'react'
      import { motion } from 'framer-motion'
      import { toast } from 'react-toastify'
      import { formatDistanceToNow } from 'date-fns'
      
      import fileService from '@/services/api/fileService'
      
      import Header from '@/components/organisms/Header'
      import WelcomeSection from '@/components/organisms/WelcomeSection'
      import FileUploadZone from '@/components/molecules/FileUploadZone'
      import UploadProgressModal from '@/components/organisms/UploadProgressModal'
      import SortAndViewControls from '@/components/molecules/SortAndViewControls'
      import FileGallery from '@/components/organisms/FileGallery'
      import FilePreviewModal from '@/components/organisms/FilePreviewModal'
      import FileShareModal from '@/components/organisms/FileShareModal'
      
      function HomePage() {
        const [isDark, setIsDark] = useState(false)
        const [files, setFiles] = useState([])
        const [loading, setLoading] = useState(false)
        const [error, setError] = useState(null)
        const [isDragOver, setIsDragOver] = useState(false)
        const [uploading, setUploading] = useState(false)
        const [uploadProgress, setUploadProgress] = useState({})
        const [viewMode, setViewMode] = useState('grid')
        const [sortBy, setSortBy] = useState('date')
        const [selectedFile, setSelectedFile] = useState(null)
        const [shareFile, setShareFile] = useState(null)
      
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
      
          await handleFileUpload(fileData)
          setUploading(false)
          setUploadProgress({})
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
      
        const handleDownload = (file) => {
          const link = document.createElement('a')
          link.href = file.url
          link.download = file.name
          link.click()
        }
      
        const handleQuickShare = (platform) => {
          toast.info(`Shared via ${platform}!`)
        }
      
        return (
          <div className="min-h-screen">
            <Header isDark={isDark} onToggleDarkMode={toggleDarkMode} />
      
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <WelcomeSection error={error} />
      
              <div className="space-y-8">
                <FileUploadZone
                  isDragOver={isDragOver}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onFileInputChange={handleFileInputChange}
                />
      
                <UploadProgressModal uploading={uploading} uploadProgress={uploadProgress} />
      
                {files?.length > 0 && (
                  <SortAndViewControls
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                  />
                )}
      
                <FileGallery
                  files={sortedFiles}
                  loading={loading}
                  viewMode={viewMode}
                  onShare={setShareFile}
                  onDelete={handleFileDelete}
                  onSelectFile={setSelectedFile}
                />
              </div>
            </main>
      
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
      
            <FilePreviewModal
              selectedFile={selectedFile}
              onClose={() => setSelectedFile(null)}
              onShare={setShareFile}
              onDownload={handleDownload}
            />
      
            <FileShareModal
              shareFile={shareFile}
              onClose={() => setShareFile(null)}
              onCopyLink={copyToClipboard}
              onQuickShare={handleQuickShare}
            />
          </div>
        )
      }
      
      export default HomePage
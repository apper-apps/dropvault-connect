import PropTypes from 'prop-types'
      import { motion } from 'framer-motion'
      import Icon from '@/components/atoms/Icon'
      import Button from '@/components/atoms/Button'
      import Text from '@/components/atoms/Text'
      
      const SortAndViewControls = ({ sortBy, setSortBy, viewMode, setViewMode }) => {
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 glass dark:glass-dark rounded-xl"
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Icon name="Filter" size={16} className="text-surface-600 dark:text-surface-400" />
                <Text as="label" htmlFor="sort-by-select" className="sr-only">Sort by</Text>
                <select
                  id="sort-by-select"
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
              <Button
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-primary text-white'
                    : 'text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700'
                }`}
              >
                <Icon name="Grid3X3" size={16} />
              </Button>
              <Button
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-primary text-white'
                    : 'text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700'
                }`}
              >
                <Icon name="List" size={16} />
              </Button>
            </div>
          </motion.div>
        )
      }
      
      SortAndViewControls.propTypes = {
        sortBy: PropTypes.string.isRequired,
        setSortBy: PropTypes.func.isRequired,
        viewMode: PropTypes.string.isRequired,
        setViewMode: PropTypes.func.isRequired,
      }
      
      export default SortAndViewControls
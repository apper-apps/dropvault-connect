import { motion } from 'framer-motion'
      import Icon from '@/components/atoms/Icon'
      import Title from '@/components/atoms/Title'
      
      const HeaderLogo = () => {
        return (
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="CloudUpload" size={24} className="text-white" />
            </div>
            <Title as="h1" className="text-2xl font-bold font-heading bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              DropVault
            </Title>
          </motion.div>
        )
      }
      
      export default HeaderLogo
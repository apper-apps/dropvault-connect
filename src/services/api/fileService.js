import mockFiles from '../mockData/files.json'

let files = [...mockFiles]
let nextId = Math.max(...files.map(f => parseInt(f.id))) + 1

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const fileService = {
  async getAll() {
    await delay(300)
    return [...files]
  },

  async getById(id) {
    await delay(200)
    const file = files.find(f => f.id === id)
    if (!file) {
      throw new Error('File not found')
    }
    return { ...file }
  },

  async create(fileData) {
    await delay(400)
    const newFile = {
      ...fileData,
      id: String(nextId++),
      uploadDate: new Date().toISOString(),
      shareLink: `https://dropvault.com/share/${Date.now()}`
    }
    files.push(newFile)
    return { ...newFile }
  },

  async update(id, updateData) {
    await delay(300)
    const index = files.findIndex(f => f.id === id)
    if (index === -1) {
      throw new Error('File not found')
    }
    files[index] = { ...files[index], ...updateData }
    return { ...files[index] }
  },

  async delete(id) {
    await delay(250)
    const index = files.findIndex(f => f.id === id)
    if (index === -1) {
      throw new Error('File not found')
    }
    files.splice(index, 1)
    return true
  }
}

export default fileService
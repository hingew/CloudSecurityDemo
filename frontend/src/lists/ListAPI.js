import Request from '../utils/request'

const getAll = async () => {
  return Request.get('file')
}

const download = async (id) => {
  return Request.download(`file/download/${id}`)
}

const upload = async (file) => {
  const formData = new FormData()
  formData.append('document', file)
  return Request.upload('file', formData)
}

const create = async (data) => {
  return Request.post('file', data)
}

const ListAPI = {
  getAll,
  download,
  create,
  upload
}

export default ListAPI

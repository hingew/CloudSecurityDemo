import Request from '../utils/request'

const getParts = async () => {
  return Request.get('backdoor/parts')
}

const decryptPart = async (id) => {
  return Request.download(`backdoor/decrypt/${id}`)
}

const BackDoorAPI = {
  getParts: getParts,
  decryptPart: decryptPart
}

export default BackDoorAPI

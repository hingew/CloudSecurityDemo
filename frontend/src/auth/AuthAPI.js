import auth from '../utils/auth'
import Request from '../utils/request'

const Login = async (data) => {
  return Request.post('login', data)
    .then(data => {
      auth.setBearer(data.token)
      return data
    })
}

const Register = async (data) => {
  return Request.post('register', data)
}

const user = {
  Login,
  Register
}

export default user

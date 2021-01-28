const isLoggedIn = () => {
  return sessionStorage.getItem('token') || null
}

const getBearer = () => {
  return sessionStorage.getItem('token')
}

const setBearer = (token) => {
  sessionStorage.setItem('token', token)
}

const removeBearer = () => {
  sessionStorage.removeItem('token')
}

const Auth = {
  isLoggedIn,
  getBearer,
  setBearer,
  removeBearer
}

export default Auth

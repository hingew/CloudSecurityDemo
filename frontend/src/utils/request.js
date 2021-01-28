import auth from './auth'
const BASE_URL = 'http://localhost:8000/'

async function get (url) {
  return base('GET', url)
}

async function post (url, data) {
  return base('POST', url, JSON.stringify(data))
}

async function download (url) {
  return fetch(BASE_URL + url, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + auth.getBearer()
    }
  }).then(res => res.blob())
}

async function upload (url, data) {
  return fetch(BASE_URL + url, {
    method: 'POST',
    body: data,
    headers: {
      Authorization: 'Bearer ' + auth.getBearer()
    }
  })
}

async function base (method, url, body = null) {
  return fetch(BASE_URL + url, {
    method,
    body,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + auth.getBearer()
    }
  }).then(handleResponse)
}

// error handler for fetch
const handleResponse = (res) => {
  if (res.status === 401) {
    auth.removeBearer()
  }

  if (!res.ok) {
    return res.json().then(json => { throw json })
  }

  return res.json()
}

const Request = {
  get,
  post,
  download,
  upload
}

export default Request

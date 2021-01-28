const BASE_URL = 'ws://localhost:8000/ws/'

class Ws {
  constructor (path) {
    this.ws = new WebSocket(BASE_URL + path)
  }

  onMessage (cb = () => null) {
    this.ws.onmessage = e => {
      cb(JSON.parse(e.data))
    }
  }

  onClose (cb = () => null) {
    this.ws.onclose = () => {
      this.ws = null
      cb()
    }
  }

  onOpen (cb) {
    this.ws.onopen = e => {
      cb()
    }
  }

  close () {
    this.ws.close()
  }
}

export default Ws

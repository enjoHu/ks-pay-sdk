class Request {
    constructor (host) {
      this.host = host
    }
    fetch (requestURL, data, method, resolve, reject) {
        const url = this.host + requestURL
        const ks = data.ks
        delete data.ks
        ks.request({
            url,
            data,
            method,
            header: {'content-type': 'application/json'},
            success (res) {
                resolve(res)
            },
            fail (e) {
                reject(e)
            }
        })
    }
    get (url, data) {
        return new Promise((resolve, reject) => {
            this.fetch(url, data, 'GET', resolve, reject)
        })
    }
    post (url, data) {
        return new Promise((resolve, reject) => {
            this.fetch(url, data, 'POST', resolve, reject)
        })
    }
}
  
export default Request
  
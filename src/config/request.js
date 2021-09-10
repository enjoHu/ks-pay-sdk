class Request {
    constructor (host) {
      this.host = host
    }
    fetch (requestURL, ks, data, method, resolve, reject) {
        const url = this.host + requestURL
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
    get (url, ks, data) {
        return new Promise((resolve, reject) => {
            this.fetch(url, ks, data, 'GET', resolve, reject)
        })
    }
    post (url, ks, data) {
        return new Promise((resolve, reject) => {
            this.fetch(url, ks, data, 'POST', resolve, reject)
        })
    }
}
  
export default Request
  
import API from './config/api'
import { SUCCESS_CODE } from './config/util'

class KsPaySDK {
    constructor (config) {
        this.config = config
    }
    toPay (config) {
        const { ks, requestSn, open_id } = config
        const params = {
            ks,
            paymentType: '223',
            requestSn,
            openId: open_id
        }
        ks.showLoading({ title: '加载中' })
        return new Promise((resolve, reject) => {
            API.createChannelOrder(params).then(res => {
                ks.hideLoading()
                const { code, data, message } = res.data.data
                console.log('res.data.data', res.data.data)
                if (code === SUCCESS_CODE && data.appData) {
                    const { order_no, order_info_token } = JSON.parse(data.appData)
                    console.log('ks.pay before', ks.pay, order_no, order_info_token)
                    ks.pay({
                        serviceId: '1',
                        orderInfo: {
                            order_no,
                            order_info_token
                        },
                        success: function success(res) {
                            return resolve(res)
                        },
                        fail: function fail (res) {
                            return reject(res)
                        },
                        complete: function complete (res) {
                            console.log('complete', res)
                        }
                    })
                } else {
                    ks.showModal({
                        showCancel: false,
                        content: message
                    })
                    return reject(message)
                }
            })
        })
    }

    getPayResult (config) {
        const { ks, requestSn } = config
        const params = {
            ks,
            requestSn,
            productType: 'F2F_PAY'
        }
        ks.showLoading({ title: '加载中' })
        return new Promise((resolve, reject) => {
            API.getPayResult(params).then(res => {
                ks.hideLoading()
                const { code, data, message } = res.data.data
                if (code === SUCCESS_CODE) {
                    return resolve(data)
                } else {
                    return reject(message)
                }
            })
        })
    }
}

const ksPaySdk = new KsPaySDK()

export const toPay = ksPaySdk.toPay
export const getPayResult = ksPaySdk.getPayResult
// module.exports = ksPaySdk
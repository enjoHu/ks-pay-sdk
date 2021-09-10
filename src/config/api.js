import Request from './request'
// import { payURL } from './config'

const CHANNEL_ORDER = '/paym-cashier/client/create/channelOrder'
const PAY_RESULT = '/paym-cashier/client/search/payResult'

const payURL = {
    dev: 'https://paym-cashier.guazi-cloud.com',
    pro: 'https://pay.guazi.com'
}
export default {
    createChannelOrder ({ env, ks, params }) {
        const payRequest = new Request(payURL[env])
        return payRequest.post(CHANNEL_ORDER, ks, params)
    },
    getPayResult ({ env, ks, params }) {
        const payRequest = new Request(payURL[env])
        return payRequest.get(PAY_RESULT, ks, params)
    }
}

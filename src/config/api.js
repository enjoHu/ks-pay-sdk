import Request from './request'
import { payURL } from './config'

const CHANNEL_ORDER = '/paym-cashier/client/create/channelOrder'
const PAY_RESULT = '/paym-cashier/client/search/payResult'

const payRequest = new Request(payURL)

export default {
    createChannelOrder (data) {
        return payRequest.post(CHANNEL_ORDER, data)
    },
    getPayResult (data) {
        return payRequest.get(PAY_RESULT, data)
    }
}

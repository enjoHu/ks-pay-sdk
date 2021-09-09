import env from './env'

function getCurrentEnvUrl (urlMap) {
  return urlMap[env.IS_ONLINE ? 'pro' : 'dev']
}

/**
  * 这里使用了两种环境配置，dev和pro环境
  * 开发和测试，我们使用dev中的url
  * 正式环境我们将使用pro中的url
  */
export const payURL = getCurrentEnvUrl({
  dev: 'https://paym-cashier.guazi-cloud.com',
  pro: 'https://pay.guazi.com'
})

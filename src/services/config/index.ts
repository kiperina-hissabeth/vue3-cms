export const TIME_OUT = 20000

// 1. 根据环境变量区分接口地址
// let BASE_URL: string
// if (import.meta.env.DEV) {
//   BASE_URL = 'http://codercba.com:5000'
// } else {
//   BASE_URL = 'http://codercba.com:4000'
// }

// 2. 通过创建 .env 文件来自定义环境变量
const BASE_URL = import.meta.env.VITE_URL

export { BASE_URL }

import { browserHistory } from 'dva/router'

const common = {   
    history: browserHistory,
    image_cloud: 'http://web.file.myqcloud.com/files/v2/10053145/saiyao/v1/images/',
    image_cloud_url: 'http://saiyao-10053145.file.myqcloud.com/v1/images/',// 2017/06/08 判断上传图片是否成功
}

const config = {  
    development: {
        api: 'http://192.168.2.111:5020/v2/'
    },
    production: {
        api: 'https://api.saiyaoyun.com/v2/'
    }
}

const mode = process.env.NODE_ENV || 'development'
const result = {...common, ...config[mode]}
export default result


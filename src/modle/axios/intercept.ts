import axios, {AxiosRequestConfig, Method} from 'axios';
import {ElLoading} from 'element-plus';
import {userStore} from "@/store/defineStroe/userStore";
import {useRoute, useRouter} from "vue-router";
import router from "@/router";

// 定义接口
interface PendingType {
    url?: string;
    method?: Method;
    params: any;
    data: any;
    cancel: Function;
}

// 取消重复请求
const pending: Array<PendingType> = [];
const CancelToken = axios.CancelToken;
// axios 实例
const instance = axios.create({
    timeout: 10000,
    responseType: 'json'
});
// 对比两个对象的值是否完全相等 返回值 true/false


// 移除重复请求
const removePending = (config: AxiosRequestConfig) => {
    function isObjectValueEquallist(a: any, b: any) {
        if (!a && !b) {
            return true
        }
        if (!a || !b) {
            return false
        }
        a = JSON.stringify(a)
        b = JSON.stringify(b)
        const aProps = Object.getOwnPropertyNames(a);
        const bProps = Object.getOwnPropertyNames(b);
        //循环取出属性名，再判断属性值是否一致
        for (let i = 0; i < aProps.length; i++) {
            const propName = aProps[i];
            if (a[propName] !== b[propName]) {
                console.log(a[propName]);
                console.log(b[propName]);
                return false;
            }
        }
        return true;
    }

    for (const key in pending) {
        const item: number = +key;
        const list: PendingType = pending[key];
        // 当前请求在数组中存在时执行函数体
        if (list.url === config.url && list.method === config.method && isObjectValueEquallist(list.params, config.params) && isObjectValueEquallist(list.data, config.data)) {
            // 执行取消操作
            list.cancel('操作太频繁，请稍后再试');
            // 从数组中移除记录
            pending.splice(item, 1);
        }
    }
};

// 添加请求拦截器
instance.interceptors.request.use(
    request => {
        // loadingInstance = ElLoading.service({
        //     text: '加载中',
        //     background: 'rgba(0, 0, 0, 0.3)'
        // });

        removePending(request);
        request.cancelToken = new CancelToken((c) => {
            pending.push({
                url: request.url,
                method: request.method,
                params: request.params,
                data: request.data,
                cancel: c
            });
        });
        return request;
    },
    error => {
        return Promise.reject(error);
    }
);

// 添加响应拦截器
instance.interceptors.response.use(
    response => {
        // loadingInstance.close();
        removePending(response.config);
        const $user = userStore()
        //如果返回中带有token，则更新token
        if (response.headers.authorization) {
            console.log("更新token" + response.headers.authorization)
            $user.user.token = response.headers.authorization
        }
        const errorCode = response?.data?.code;
        if (errorCode !== 200) {
            // console.log(response.request.responseURL);
            //response.request.responseURL不为image
            if (response.request.responseURL.indexOf("image") === -1&&response.request.responseURL.indexOf("/api/") !== -1) {
                console.log(response);
                console.log(response.request.responseURL);
                location.href =window.location.protocol  + "/#/error?code=" + errorCode;
            }
        }

        return response;
    },
    error => {
        const response = error.response;
        // location.href="/error"
        // 根据返回的http状态码做不同的处理
        if (response.request.responseURL.indexOf("image") === -1) {
            console.log(response);
            console.log(response.request.responseURL);
            location.href =window.location.protocol + window.location.host + "/#/error?code=" + response.status;
        }
        switch (response?.status) {
            case 401:
                // token失效
                break;
            case 403:
                // 没有权限
                break;
            case 500:
                // 服务端错误
                break;
            case 503:
                // 服务端错误
                break;
            default:
                break;
        }


        // 超时重新请求
        const config = error.config;
        // 全局的请求次数,请求的间隙
        const [RETRY_COUNT, RETRY_DELAY] = [3, 1000];

        if (config && RETRY_COUNT) {
            // 设置用于跟踪重试计数的变量
            config.__retryCount = config.__retryCount || 0;
            // 检查是否已经把重试的总数用完
            if (config.__retryCount >= RETRY_COUNT) {
                console.log(RETRY_COUNT);
                return Promise.reject(response || {message: error.message});
            }
            // 增加重试计数
            config.__retryCount++;
            // 创造新的Promise来处理指数后退
            const backoff = new Promise<void>((resolve) => {
                setTimeout(() => {
                    resolve();
                }, RETRY_DELAY || 1);
            });
            // instance重试请求的Promise
            return backoff.then(() => {
                return instance(config);
            });
        }
        // eslint-disable-next-line
        return Promise.reject(response || {message: error.message});
    }
);

export default instance;

/**
 * axios基础构建
 * @date 2019-12-24
 */

import Vue from 'vue';
import getUrl from './config';
import instance from './intercept';
import { AxiosRequest, CustomResponse } from './types';
import {userStore} from "@/store/defineStroe/userStore";

class Abstract {
    // 外部传入的baseUrl
    protected baseURL: string = "/api";

    // 自定义header头
    protected headers: object = {
        ContentType: 'application/json;charset=UTF-8',
        Authorization:''
    }

    private apiAxios({ baseURL = this.baseURL, headers = this.headers, method, url, data, params, responseType }: AxiosRequest): Promise<CustomResponse> {
        const store=userStore()
        headers.Authorization=store.user.token
        // url解析
        const _url = (url as string).split('.');
        url = getUrl(_url[0], _url[1]);

        return new Promise((resolve, reject) => {
            instance({
                baseURL,
                headers,
                method,
                url,
                params,
                data,
                responseType
            }).then((res) => {
                // 200:服务端业务处理正常结束
                if (res.status === 200) {
                    console.log('请求成功');
                    resolve({ status: true, message: 'success', data: res.data?.data, origin: res.data });
                } else {
                    console.log('请求失败');
                    resolve({ status: false, message: res.data?.errorMessage || (url + '请求失败'), data: null });
                }
            }).catch((err) => {
                const message = err?.data?.errorMessage || err?.message || (url + '请求失败');
                // eslint-disable-next-line
                reject({ status: false, message, data: null});
            });
        });
    }

    /**
     * GET类型的网络请求
     */
    protected getReq({ baseURL, headers, url, data, params, responseType }: AxiosRequest) {
        return this.apiAxios({ baseURL, headers, method: 'GET', url, data, params, responseType });
    }

    /**
     * POST类型的网络请求
     */
    protected postReq({ baseURL, headers, url, data, params, responseType }: AxiosRequest) {
        return this.apiAxios({ baseURL, headers, method: 'POST', url, data, params, responseType });
    }

    /**
     * PUT类型的网络请求
     */
    protected putReq({ baseURL, headers, url, data, params, responseType }: AxiosRequest) {
        return this.apiAxios({ baseURL, headers, method: 'PUT', url, data, params, responseType });
    }

    /**
     * DELETE类型的网络请求
     */
    protected deleteReq({ baseURL, headers, url, data, params, responseType }: AxiosRequest) {
        return this.apiAxios({ baseURL, headers, method: 'DELETE', url, data, params, responseType });
    }
}

export default Abstract;

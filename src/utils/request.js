import fetch from "dva/fetch";
import {message} from "antd";
import config from '../config'
import { loadValidator, getAccessToken, clearValidator } from '../models/validator'
import {getString} from './helper'
import {history} from "../config";

const BASE_URL = config.api

function generateUrl(url) {
    if (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) {
        return url;
    }
    return joinUrl(BASE_URL, url);
}

function joinUrl(host, spec) {
    return host + spec;
}

function queryUrl(url, items) {
    let str = [];
    for (let key in items) {
        if (items.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key) + '=' + encodeURIComponent(items[key]));
        }
    }
    const query = str.join('&');
    if (query.length > 0) {
        if(url.indexOf('?') >= 0){
            return url + '&' + query;
        }
        return url + '?' + query;
    }
    return url;
}
let durTime = [];


function parseJSON(response) {
     const dur = response.headers.get('Duration-Time'),resB = document.getElementById('requestPageTime');
     if(resB){
         resB.innerHTML = dur;
     }
     return response.json();
}

function checkStatus(response) {
    /**
     * 2017/06/08
     * 判断上传图片是否成功
     * 400 status 并且 url请求是腾讯云上传图片下的错误，返回response
     * 根据response里面的code判断图片是否已存在
     */
    if (response.status == 400 && response.url.indexOf('web.file.myqcloud.com') != -1) {
        return response;
    }
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}


/**
 *错误码过滤器
 */

function successResponse(data){
    if (data.code == 2002) { 
        clearValidator()
        if(window.location.pathname.indexOf('admin') != -1){
            history.replace('/admin/login')
        }else{
            history.replace('/login')
        }
        return data;
    } else {
        return data;
    }
}

/**
 * 网络连接失败
 */
function errorRequest(err) { 
    if(err== 'Error: Bad Request'){
    }else{
        message.error('网络请求失败:' + err);
    }
}

function getTargetUrl(url) {
    if (typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'))) {
        return url
    }
    const key = typeof url === 'object' ? url.key: url
    let validator = loadValidator()
    const template = validator[key]
    if (template && typeof url === 'object' && url.args.length > 0) {
        return getString(template, ...url.args)
    }
    return template
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export async function request(url, items) {
    let target = getTargetUrl(url);
    if(!target){
        const data={code:2002};
        successResponse(data);
    }
    let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };
    if (items.isToken === undefined || items.isToken) {
        headers.Authorization = 'JWT ' + getAccessToken();
    }
    headers = {...headers, ...items.headers};
    let data = {
        method: items.method,
        headers
    };
    if (items.body) {
        if (data.method === 'post' || data.method === 'put') {
            if (items.body instanceof FormData) { 
                data.body = items.body
                delete headers['Content-Type']
            } else {
                data.body = JSON.stringify(items.body || {});
            }
        } else {
            target = queryUrl(target, items.body);
        }
    }
    return fetch(target, data)
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => (successResponse(data)))
        .catch((err) => (errorRequest(err)));
}

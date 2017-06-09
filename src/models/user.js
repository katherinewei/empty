import {request} from "../utils/request";
import {parse} from "qs";
import {message} from "antd";
import {saveValidator, clearValidator, isAdmin, isUser} from "./validator";
import {api, history} from "../config";
import {getString} from '../utils/helper'


function checkRole(pathname, history, prefix, login, check) {
    if (!pathname.startsWith(prefix)) {
        return false
    }
    if (pathname === login) {
        if (check()) {
            history.push(prefix)
        }
    } else if (!check()) {
        history.push(login)
    }
    return true
}

export default {
    namespace: 'user',
    state: {
        loading: false,
        visible:false,
    },
    subscriptions: {
        setup({history}) {
            history.listen(({pathname}) => {
                checkRole(pathname, history, '/admin', '/admin/login', isAdmin) ||
                checkRole(pathname, history, '/', '/login', isUser)
            })
        }
    },
    effects: {
        *login({payload, url}, {call, put}) { 
            yield put({type: 'loginRequest'})
            const data = yield call(request, api + url, {method: 'post', body: parse(payload), isToken: false})
            yield put({type: 'loginResponse', user: data})
            if (!data.code) {
                saveValidator(data)
                if(isUser()){
                    location.href =  '/';
                } else{
                    history.replace('/admin');
                }

            }else{
                //message.error(data.code+':'+data.message);
            }
        },
        *changePassword({payload}, {call, put}) {
            yield put({type: 'loginRequest'})
            const data = yield call(request, 'player_url', {method: 'put', body: parse(payload)})
            yield put({type: 'loginResponse', user: data})
            if (!data.code) {
                message.success(getString('password_success'));
                yield put({type: 'logout'})
            }else{
                message.error(data.code+':'+data.message);
            }
        },
        *logout({}, {put,select}) {
            yield put({type: 'logoutResponse'})
            clearValidator()
            const {pathname} = yield select(state => state.routing.locationBeforeTransitions)
            if(pathname.indexOf('admin') != -1){
                history.replace('/admin/login')
            }else{
                history.replace('/login')
            }
        },
        *findPassword({payload}, {call, put}) {
            yield put({type: 'loginRequest'})
            const url = 'operators/reset_pw/';
            const data = yield call(request, api + url, {method: 'put', body: parse(payload)})
            yield put({type: 'loginResponse', user: data})
            if (!data.code) {
                message.success(getString('password_success'));
                yield put({type: 'hideModal'})
            }else{
                message.error(data.code+':'+data.message);
            }
        },
    },
    reducers: {
        loginRequest(state) {
            return {...state, loading: true}
        },
        loginResponse(state, action) {
            if (action.user.code) {
                message.error(action.user.code+':'+action.user.message);
                return {...state, loading: false}
            } else {
                return {...state, ...action.user, loading: false}
            }
        },
        logoutResponse() {
            return {loading: false}
        },
        showModal(state, action) {
            return {state,visible: true,...action}
        },
        hideModal(state, action) {
            return {state,visible: false,...action}
        }
    },
}
import React from "react";
import {connect} from "dva";
import styles from './Login.less'
import LoginForm from '../components/LoginForm'
import FindPasswordActionForm from '../components/FindPasswordActionForm'
import {getString} from "../utils/helper";
const package_config = require("../../package.json");

const Login = ({ dispatch, user,}) => {
    const loginProps = {
        loginButtonLoading: user.loading,
        onLogin(name, password) {
            dispatch({
                type: 'user/login',
                url: 'operators/login',
                payload: {name, password}
            })
        }
    }
    function showModal(){
        dispatch({
            type: 'user/showModal',
        })
    }
    function hideModal() {
        dispatch({
            type: 'user/hideModal',
        })
    }
    function handleSubmit(value) {
        delete value.confirm;

        dispatch({
            type: 'user/findPassword',
            payload: value,
        })
    }


    const logo = require('../assets/images/logoIconBlue.png');
    return (
        <div className={styles.login}>
            <div className={styles.content}>
                <div className={styles.loginComponents}>
                    <div className={styles.codeBoxDemo}>
                        <div className={styles.managementSystem}><img src={logo}/> {getString('login_titleContent')}</div>
                        <LoginForm {...loginProps}></LoginForm>
                        <a className={styles.forgetPwd} onClick={() => showModal()}>{getString('login_forget_password')}</a>
                    </div>
                </div>
            </div>
            <div className={styles.footer}>
                <div>{getString('login_versionContent', package_config.version)}</div>
                <div>{getString('loginRecordContent')}</div>
            </div>
            <FindPasswordActionForm visible={user.visible}
                                onSubmit={value => handleSubmit(value)}
                                onClose={hideModal}
                                    confirmLoading = {user.loading}
                               />
        </div>
    )
}

export default connect(({user}) => ({
    user
}))(Login)
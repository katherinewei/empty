import React, {PropTypes} from "react";
import {Form, Icon, Input, Button} from "antd";
import {getString} from '../utils/helper'


const FormItem = Form.Item

const LoginForm = ({ onLogin,loginButtonLoading, form: {getFieldDecorator, validateFields}}) => {

    function handleSubmit(e) {
        e.preventDefault();
        validateFields((errors, value) => {
            if (!!errors) {
                return;
            }
            onLogin(value.username, value.password)
        })
    }

    function onChangeType(){ 
        var pwd = document.getElementById("password");
        pwd.type = 'password'
    }

    return (
        <Form onSubmit={handleSubmit} className="login-form">
            <FormItem>
                {getFieldDecorator("username", {
                    rules: [{required: true, message: getString("login_username")}]
                })(
                    <Input addonBefore={<Icon type="user"/>} placeholder={getString('login_username')}/>
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator("password", {
                    rules: [{required: true, message: getString('login_password')}],
                })(
                    <Input type="text" addonBefore={<Icon type="lock"/>} onChange={onChangeType}
                           placeholder={getString('login_password')} />
                )}
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button" size="large"  loading={loginButtonLoading}>
                    {getString('login_submit')}
                </Button>
            </FormItem>
        </Form>
    )
}

LoginForm.propTypes = {
    onLogin: PropTypes.func.isRequired,
    loginButtonLoading: PropTypes.bool,
}

export default Form.create()(LoginForm)

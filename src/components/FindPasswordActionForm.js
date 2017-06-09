import React, {PropTypes} from 'react'
import {Modal, Form, Input, Button} from 'antd'
import {getString} from '../utils/helper'
import {request} from '../utils/request'
import {api} from "../config"
import {message} from 'antd'

const FormItem = Form.Item

const FindPasswordActionForm = ({visible,confirmLoading,  onSubmit, onClose, form: {getFieldDecorator, validateFields, resetFields, getFieldsValue,getFieldValue}}) => {

    if(!visible){
        resetFields();
    }

    function handleOk() {
        validateFields((errors, value) => {
            if (errors) {
                return
            }
            onSubmit(value)
        })
    }

    function checkPhone(rule, value, callback) {
        if (!value) {
            callback(new Error(getString('operator_name_hint')));
        }
        if ((/^1[34578]\d{9}$/.test(value))) {
            callback();
        } else {
            callback(new Error(getString('operator_name_IsErr')));
        }
    }

    function verifButLoading() {
        var smsbtn = document.getElementById("smsbtn");
        var smsbtn_text = smsbtn.getElementsByTagName("span");

        var value = { ...getFieldsValue()}
        if(!value.name){
            message.error(getString('operator_name_hint'));
            return;
        }
        if((/^1[34578]\d{9}$/.test(value.name))){
            const verify = request(api +'verify/sms', {
                method: 'post',
                body: {name: value.name},
                isToken: false
            });
            if (verify.code && verify.code!= 0) {
                message.error(verify.code);
            }else{
                smsbtn.disabled = true;
                let intDiff = 90;
                window.setInterval(function(){
                    let  second=0;//时间默认值
                    if(intDiff > 0){
                        second = intDiff;
                        smsbtn_text[0].innerHTML = second+" "+getString('operator_second')
                    }

                    if(intDiff==0  &&  intDiff >= 0 ){
                        smsbtn.disabled = false;
                        smsbtn_text[0].innerHTML= getString('user_sendVerification');
                    }
                    intDiff--;
                }, 1000);
            }
        }
    }

    function onChangeType(){
        const pwd = document.getElementById("password"),confirm =  document.getElementById("confirm");
        pwd.type = 'password';
        confirm.type = 'password';
    }
    function checkPassword(rule, value, callback){
        if (value && value !== getFieldValue('password')) {
            const text = getString('password_password_inconsistent');
            callback(text);
        } else {
            callback();
        }
    }

    const actionProps = {
        title: getString('password_found'),
        visible,
        confirmLoading,
        onOk: handleOk,
        onCancel: onClose,
        okText: getString('CONFIRM'),
        cancelText: getString('Cancel'),
    }
    return (
        <Modal {...actionProps}>
            <Form>
                <FormItem label={getString('operator_name')} {...formItemLayout}>{
                    getFieldDecorator('name', {

                        rules: [{required: true, message: '*'}, {
                            validator: checkPhone,
                        }]
                    })(
                        <Input placeholder={getString('operator_name_hint')} />
                    )
                }</FormItem>
                <FormItem
                    label={getString('operator_code')}
                    {...formItemLayout}
                >
                    {getFieldDecorator('code', {

                        rules: [
                            { required: true, message: getString('operator_code_hint') },
                        ],
                    })(
                        <div><Input type="text" autoComplete="off" /><Button id="smsbtn" type="primary" onClick={() => verifButLoading()}>{getString('operator_send_verification')}</Button></div>
                    )}
                </FormItem>

                <FormItem
                    label={getString('password_new_password')}
                    {...formItemLayout}
                >
                    {getFieldDecorator('password', {

                        rules: [
                            { required: true, message: getString('password_new_password_hint') },
                        ],
                    })(
                        <Input type="password"/>
                    )}
                </FormItem>
                <FormItem
                    label={getString('password_confirm_password')}
                    {...formItemLayout}
                >
                    {getFieldDecorator('confirm', {

                        rules: [{
                            required: true, message: getString('password_confirm_password_hint'),
                        },{
                            validator: checkPassword,
                        }],
                    })(
                        <Input  type="password" />
                    )}
                </FormItem>
            </Form>
        </Modal>
    )
}

FindPasswordActionForm.propTypes = {
   // visible: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default Form.create()(FindPasswordActionForm)

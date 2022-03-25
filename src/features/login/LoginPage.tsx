import React, {Component, useEffect} from "react";
import {Form, Input, Button, Checkbox, Select, notification} from 'antd';
import './login.scss';
import {adminLogin} from "../../utils/requestUrl";
import {getAdminInfo, getToken, setAdminInfo, setToken} from '../../utils/accessToken';
const { Option } = Select;

const LoginPage = (props: { history: string[]; }) => {


    const onSubmit = (value:any) => {
        console.log(value);
        adminLogin(value,(result:any)=>{
            console.log(result);
            if (result.data.status===200){
                setToken(result.data.access_token);
                setAdminInfo(result.data.user);
                window.location.href="/";
            }else{
                notification["error"]({
                    message: 'Login Failed',
                    description: result.data.msg,
                });
            }
        },(error:any)=>{
            console.log(error);
        })
    }

    const forgotPassword = () => {
        props.history.push("/forgot")
    }


    return (
        <div className="loginForm">
            <div className="loginForm-head">
                <img src="/images/lo.png" className="App-logo" alt="logo" />
            </div>
            <Form
                onFinish={onSubmit}
                name="basic"
                initialValues={{ remember: true }}
                autoComplete="off"
                layout="vertical"
            >
                <Form.Item
                    label="language"
                    name="lan"
                    rules={[{ required: true }]}

                >
                    <Select
                        placeholder="语言"
                        allowClear
                    >
                        <Option value="chinese">中文</Option>
                        <Option value="france">français</Option>
                        <Option value="english">english</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{required:true,message:'Please input your email!'}]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{required:true,message:'Please input your password!'}]}
                >
                    <Input.Password />
                </Form.Item>
                <div className="loginForm-button-group">
                    <Checkbox>Remember me</Checkbox>
                    <Button type="link" className="forgot-link" onClick={forgotPassword}>忘记密码</Button>
                </div>

                <Button type="primary" htmlType="submit" className="submit-button">
                    Submit
                </Button>
            </Form>
        </div>
    );


}


export default LoginPage;

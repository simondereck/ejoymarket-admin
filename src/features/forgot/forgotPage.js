import React, {Component} from "react";
import { Form, Input, Button, Checkbox, Select } from 'antd';
import './forgot.scss';

class ForgotPage extends Component{

    render() {
        return <div className="forgot-form">
            <img src="/images/lo.png" className="App-logo" alt="logo" />
            <Form>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{required:true,message:"Email should not be blank"}]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button>forgot password</Button>
                </Form.Item>
            </Form>
        </div>
    }
}

export default ForgotPage;
import XLTheme from "../../components/xLTheme";
import {Button, Form, Select, Input} from "antd";
import {NavLink} from "react-router-dom";
import React, {useEffect, useState} from "react";
import TextArea from "antd/es/input/TextArea";
import './message.scss';
const { Option } = Select;

const MessageCreate = () => {
    const [loading,setLoading] = useState<boolean>(false);

    const onSubmit = (values:any) => {
        console.log(values);
    }

    return (
        <XLTheme loading={loading} subTitle="创建" title="系统信息" >
            <div className="create-system-message-form">
                <Form
                    onFinish={onSubmit}
                    name="basic"
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    layout="vertical"
                >
                    <Form.Item
                        label="Lan"
                        name="lan"
                        rules={[{required:true,message:"language should not be null"}]}
                    >
                        <Select
                            placeholder="Lan"
                            allowClear
                        >
                            <Option value="0">cn</Option>
                            <Option value="1">fr</Option>
                            <Option value="2">en</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message:"title should not be null" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Message"
                        name="message"
                        rules={[{ required: true ,message:"message should not be null"}]}

                    >
                        <TextArea className="xlTextArea"/>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" className="submit-button">
                        Create Message
                    </Button>
                </Form>
            </div>
        </XLTheme>
    )
}

export default MessageCreate;
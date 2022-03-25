import React, {useState} from "react";
import XLTheme from "../../components/xLTheme";
import {Button, Form, Input} from "antd";
import TextArea from "antd/es/input/TextArea";
import {openNotification} from "../../utils/tools";
import './article.scss';
import {createReportMessage} from "../../utils/requestUrl";

const ReportMessageCreate = (props:any) => {
    const [loading,setLoading] = useState<boolean>(false);

    const onSubmit = (values:any) => {
        setLoading(true);
        console.log(values);
        createReportMessage(values,function (result:any) {
            setLoading(false);
            if(result.data.code===200){
                props.history.push("/report/message");
            }
            openNotification(result.data.msg);
        },function (error:any) {
            setLoading(false);
            console.log(error);
        });
    }

    return (
        <XLTheme loading={loading} subTitle="创建" title="违规类别">
            <div className="report-message-create">
                <Form
                    onFinish={onSubmit}
                    name="basic"
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    layout="vertical"
                >
                    <Form.Item
                        label="别名"
                        name="name"
                        rules={[{required:true,message:'Please input  alias!'}]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="中文"
                        name="cn"
                        rules={[{required:true,message:'Please input chinese message!'}]}
                    >
                        <TextArea className="xlTextArea"/>
                    </Form.Item>
                    <Form.Item
                        label="法语"
                        name="fr"
                        rules={[{required:true,message:'Please input french message!'}]}
                    >
                        <TextArea className="xlTextArea"/>
                    </Form.Item>
                    <Form.Item
                        label="英语"
                        name="en"
                        rules={[{required:true,message:'Please input english message!'}]}
                    >
                        <TextArea className="xlTextArea"/>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" className="submit-button">
                        submit
                    </Button>
                </Form>
            </div>
        </XLTheme>
    )
}

export default ReportMessageCreate;
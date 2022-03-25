import React, {useEffect, useState} from "react";
import XLTheme from "../../components/xLTheme";
import {Button, Form, Input, Switch} from "antd";
import TextArea from "antd/es/input/TextArea";
import {openNotification} from "../../utils/tools";
import './article.scss';
import {createReportMessage, findReportById, updateReportById} from "../../utils/requestUrl";
import {ReportData} from "../../data/ReportData";

const ReportMessageUpdate = (props:any) => {
    const [loading,setLoading] = useState<boolean>(false);

    const [id,setId] = useState<number>(0);
    const [item,setItem] = useState<ReportData>();
    const [form] = Form.useForm();

    useEffect(()=>{
        setId(props.location.state.id);
        console.log(props.location.state.id);
        setLoading(true);
        findReportById(props.location.state.id,function (result:any) {
            setLoading(false);
            if (result.data.code===200){
                setItem(result.data.item);
                form.setFieldsValue({
                    name: result.data.item.name,
                    cn: result.data.item.cn,
                    fr: result.data.item.fr,
                    en: result.data.item.en,
                    status: result.data.item.status,
                });
            }else{
                openNotification(result.data.msg);
            }
        },function (error:any) {
            console.log(error);
            setLoading(false);
        });
    },[])

    const onSubmit = (values:any) => {
        setLoading(true);
        console.log(values);
        updateReportById(id,values,function (result:any) {
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
        <XLTheme loading={loading} subTitle="更新" title="违规类别">
            <div className="report-message-create">
                <Form
                    onFinish={onSubmit}
                    name="basic"
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    layout="vertical"
                    form={form}
                >
                    <Form.Item
                        label="激活"
                        name="status"
                    >
                        <Switch checkedChildren="激活" unCheckedChildren="关闭" className="xlSwitch"/>
                    </Form.Item>

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

export default ReportMessageUpdate;
import {Button, Form, Input, Layout, notification, Select, Spin} from "antd";
import React, {useEffect, useState} from "react";
import {getAdminById, updateAdmin} from "../../utils/requestUrl";
import {openNotification} from "../../utils/tools";
import XLTheme from "../../components/xLTheme";
const { Option } = Select;

const AdminUpdate = (props: { history: string[]; location: any ; }) =>{

    const [loading,setLoading] = useState<boolean>(false);
    const [form] = Form.useForm();
    const [id,setId] = useState<number>(0);
    useEffect(()=>{
        setLoading(true);
        setId(props.location.state.id);
        getAdminById({id:props.location.state.id},function (result:any) {
            setLoading(false);
            if (result.data.status===200){
                form.setFieldsValue({
                    username:result.data.admin.username,
                    email:result.data.admin.email,
                    password:result.data.admin.password,
                    gender:genderOptions[result.data.admin.gender],
                    status:statusOptions[result.data.admin.status],
                });

            }else{
                openNotification(result.data.msg);
                props.history.push("/admin");
            }
        },function (error:any) {
            console.log(error);
            setLoading(false);
        });
    },[]);



    const onUpdateClick = (values:any) =>{
        setLoading(true);
        console.log(values);
        if (values.status === statusOptions[0]){
            values.status = 0;
        }else if(values.status === statusOptions[1]){
            values.status = 1;
        }

        if(values.gender === genderOptions[0]){
            values.gender = 0;
        }else if(values.gender ===  genderOptions[1]){
            values.gender = 1;
        }
        values["id"] = id;
        updateAdmin(values,function (result:any) {
            openNotification(result.data.msg);
            setLoading(false);
            if (result.data.status===200){
                props.history.push("/admin");
            }
        },function (error:any) {
            console.log(error);
            setLoading(false);
        });
    }

    const genderOptions = ["male","female"];
    const statusOptions = ["block","active"];

    return (
        <XLTheme title="更新" subTitle="管理员" loading={loading}>
            <div className="create-admin-form">
                <Form
                    onFinish={onUpdateClick}
                    name="basic"
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    layout="vertical"
                    form={form}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{required:true,message:'Please input admin username!'}]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Gender"
                        name="gender"
                        rules={[{ required: true }]}
                    >
                        <Select
                            placeholder="gender"
                            allowClear
                        >
                            <Option value="0">male</Option>,
                            <Option value="1">female</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{required:true,message:'Please input admin email!'}]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{required:true,message:'Please input admin password!'}]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Status"
                        name="status"
                        rules={[{ required: true }]}
                    >
                        <Select
                            placeholder="status"
                            allowClear
                        >
                            <Option value="0">block</Option>
                            <Option value="1">active</Option>
                        </Select>
                    </Form.Item>

                    <Button type="primary" htmlType="submit" className="submit-button">
                        update Admin
                    </Button>
                </Form>
            </div>
        </XLTheme>
    );
}

export default AdminUpdate;
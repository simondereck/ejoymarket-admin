import {Button, Checkbox, Form, Input, Layout, notification, Select, Spin, Table} from "antd";
import React, {useState} from "react";
import './admin.scss';
import {createAdmin} from "../../utils/requestUrl";
import XLTheme from "../../components/xLTheme";
import {openNotification} from "../../utils/tools";
const { Option } = Select;

const AdminCreate = (props: { history: string[]; }) => {
    const [loading,setLoading] = useState<boolean>(false);

    const onSubmit = (value:any) => {
        setLoading(true);

        createAdmin(value,function (result:any) {
            setLoading(false);
            if (result.data.status===200){
                openNotification(result.data.msg);
                props.history.push("/admin");
            }else{
                openNotification(result.data.msg);
            }
        },function (error:any) {
            console.log(error);
            setLoading(false);
        });
    }

    return (
       <XLTheme title="创建" subTitle="管理员" loading={loading}>
           <div className="create-admin-form">
               <Form
                   onFinish={onSubmit}
                   name="basic"
                   initialValues={{ remember: true }}
                   autoComplete="off"
                   layout="vertical"
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
                       >
                           <Option value="0">femmale</Option>
                           <Option value="1">male</Option>
                           <Option value="2">unkonw</Option>
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
                       Create Admin
                   </Button>
               </Form>
           </div>
       </XLTheme>


    );
};

export default AdminCreate;
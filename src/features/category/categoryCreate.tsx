import {Button, Form, Input, Layout, Select, Spin, Switch,Upload,message} from "antd";
import React, {useEffect, useState} from "react";
import TextArea from "antd/es/input/TextArea";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './category.scss';
import XLTheme from "../../components/xLTheme";
import {beforeUpload, getBase64, openNotification} from "../../utils/tools";
import {createCategory, getAllCategories, getAllCategoriesByPid, uploadCategoryCover} from "../../utils/requestUrl";
import {CategoryData} from "../../data/CategoryData";
const { Option } = Select;


const CategoryCreate = (props:any) => {

    const [loading,setLoading] = useState<boolean>(false);
    const [imageLoading,setImageLoading] = useState<boolean>(false);
    const [imageUrl,setImageUrl] = useState('');
    const [path,setPath] = useState('');
    const [categoryItems,setCategoryItems] = useState<Array<CategoryData>>([]);
    let options:any = null;
    const [form] = Form.useForm();

    useEffect(()=>{
        findAllCategories();
    },[])


    const findAllCategories = () => {
        setLoading(true);
        getAllCategories([],function (result:any) {
            console.log(result);
            setLoading(false);
            if (result.data.status===200){
                setCategoryItems(result.data.items);
                console.log(categoryItems);
                console.log(899)
                // form.setFieldsValue({
                //     order: result.data.item.order,
                // });
            }
        },function (error:any) {
            console.log(error);
            setLoading(false);
        });
    }

    const onSubmit = (values:any) => {
        console.log(values);
        setLoading(true);
        if(path===''){
            setLoading(false);
            openNotification("please make sure you have upload category cover success");
            return;
        }
        const params = {
            image: path,
            enable: values.enable,
            pid: values.pid,
            order: 99,
            lan:'',
            name:'',
        };
        let lan = {
            cn:{name:'',active:false},
            fr:{name:'',active:false},
            en:{name:'',active:false},
        }
        if(values["order"]){
            params["order"] = values["order"];
        }
        if (values["cn"]){
            lan["cn"]["name"] = values["cn"];
            params["name"] = values["cn"];
        }
        if (values["cn_active"]){
            lan["cn"]["active"] = values["cn_active"];
        }
        if (values["fr"]){
            lan["fr"]["name"] = values["fr"];
        }
        if (values["fr_active"]){
            lan["fr"]["active"] = values["fr_active"];
        }
        if (values["en"]){
            lan["en"]["name"] = values["en"];
        }
        if (values["en_active"]){
            lan["en"]["active"] = values["en_active"];
        }
        params["lan"] = JSON.stringify(lan);

        createCategory(params,function (result:any) {
            console.log(result);
            setLoading(false);
            openNotification(result.data.msg);
            if (result.data.status===200){
                props.history.push("/category");
            }
        },function (error:any) {
            console.log(error);
            setLoading(false);
        });
    }

    const handleChange = (info:any) => {
        if (info.file.status === 'uploading') {
            setImageLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            if(info.file.response.status===200){
                setPath(info.file.response.filename);
                openNotification("image upload success!");
            }else{
                openNotification("image upload faild!");
            }
            getBase64(info.file.originFileObj, (imageUrl: any) =>{
                    setImageUrl(imageUrl);
                    setImageLoading(false);
                }
            )
        }
    };

    const uploadButton = (
        <div>
            {imageLoading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );


    const uploadCover = function (params:any) {
        console.log(params);
        const form = new FormData();

        const file = params.file;
        form.append('image', file);
        uploadCategoryCover(form,function (res:any) {
            console.log(res)
            if (res.data.status===200){
                openNotification("image upload success!");
                setPath(res.data.filename);
                setImageLoading(false);
                setImageUrl(res.data.filename);

            }else{
                openNotification("image upload faild!");

            }

        },function (error:any) {
            console.log(error);
        })

    }

    return (
        <XLTheme title="创建" subTitle="分类" loading={loading}>
            <div className="create-category-form">
                <Form
                    onFinish={onSubmit}
                    name="basic"
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    layout="vertical"
                    form={form}
                >
                    <div className="double-items-layout">
                        <div className="double-items-long">
                            <Form.Item
                                label="父亲"
                                name="pid"
                                rules={[{ required: true }]}
                            >
                                <Select
                                    placeholder="pid"
                                    allowClear
                                >
                                    <Option value="0">根节点</Option>
                                    {categoryItems.map((item)=>{
                                        return <Option value={item.id}>{item.name}</Option>
                                    })}
                                </Select>
                            </Form.Item>
                        </div>
                        <div className="double-items-short">
                            <Form.Item
                                label="激活"
                                name="enable"
                                rules={[{ required: true }]}
                            >
                                <Switch checkedChildren="激活" unCheckedChildren="关闭" className="xlSwitch" />
                            </Form.Item>
                        </div>

                    </div>
                    <div className="double-items-layout">
                        <div className="double-items-long">
                            <Upload
                                name="image"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                customRequest={uploadCover}
                                beforeUpload={beforeUpload}
                                // onChange={handleChange}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </div>

                        <div className="double-items-short">
                            <Form.Item
                                label="排序 (0 - 99,数越大排序靠后)"
                                name="order"
                            >
                                <Input />
                            </Form.Item>
                        </div>
                    </div>
                   <div className="double-items-layout">
                       <div className="double-items-long">
                           <Form.Item
                               label="中文"
                               name="cn"
                               rules={[{ required: true ,message:'请确保中文不为空！'}]}
                           >
                               <TextArea  className="xlTextArea"/>
                           </Form.Item>
                       </div>
                       <div className="double-items-short">
                           <Form.Item
                               label="中文激活"
                               name="cn_active"
                           >
                               <Switch checkedChildren="激活" unCheckedChildren="关闭" className="xlSwitch"/>
                           </Form.Item>
                       </div>
                   </div>
                    <div className="double-items-layout">
                        <div className="double-items-long">
                            <Form.Item
                                label="法语"
                                name="fr"
                            >
                                <TextArea className="xlTextArea"/>
                            </Form.Item>
                        </div>
                        <div className="double-items-short">
                            <Form.Item
                                label="法语激活"
                                name="fr_active"
                            >
                                <Switch checkedChildren="激活" unCheckedChildren="关闭"  className="xlSwitch"/>
                            </Form.Item>
                        </div>
                    </div>

                    <div className="double-items-layout">
                        <div className="double-items-long">
                            <Form.Item
                                label="英文"
                                name="en"
                            >
                                <TextArea className="xlTextArea"/>
                            </Form.Item>
                        </div>
                        <div className="double-items-short">
                            <Form.Item
                                label="英语激活"
                                name="en_active"
                            >
                                <Switch checkedChildren="激活" unCheckedChildren="关闭"  className="xlSwitch"/>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="single-item-layout">
                        <Button type="primary"  htmlType="submit" className="submit-button">创建分类</Button>
                    </div>
                </Form>
            </div>
        </XLTheme>
    );
};

export default CategoryCreate;
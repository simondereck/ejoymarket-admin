import {Button, Form, Input, Layout, Select, Spin, Switch, Upload} from "antd";
import React, {useEffect, useState} from "react";
import XLTheme from "../../components/xLTheme";
import {beforeUpload, getBase64, openNotification} from "../../utils/tools";
import {CategoryData} from '../../data/CategoryData';
import TextArea from "antd/es/input/TextArea";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import {createCategory, getCategoryById, updateCategory} from "../../utils/requestUrl";
const { Header, Content, Sider } = Layout;
const { Option } = Select;

const CategoryUpdate = (props:any) => {
    const [loading,setLoading] = useState<boolean>(false);
    const [form] = Form.useForm();
    const [id,setId] = useState<number>(0);
    const [imageUrl,setImageUrl] = useState('');
    const [imageLoading,setImageLoading] = useState<boolean>(false);
    const [categoryItems,setCategoryItems] = useState<Array<CategoryData>>([]);
    const [item,setItem] = useState<CategoryData>();
    const [path,setPath] = useState('');

    useEffect(()=>{
        setLoading(true);
        setId(props.location.state.id);
        getCategoryById(props.location.state.id,function (result:any) {
            setLoading(false);
            console.log(result);
            if(result.data.status===200){
                setItem(result.data.item);
                setCategoryItems(result.data.items);
                let valuePid = "";
                if(result.data.item.pid===0){
                    valuePid = "根结点";
                }else{
                    for (let i = 0; i < result.data.items.length; i++) {
                        if(result.data.items[i].id===result.data.item.pid){
                            valuePid = result.data.items[i].name;
                        }
                    }
                }
                setImageUrl(result.data.item.image);
                setPath(result.data.item.image);
                form.setFieldsValue({
                    pid: valuePid,
                    enable: result.data.item.enable,
                    cn: result.data.item.lan["cn"]["name"],
                    cn_active: result.data.item.lan["cn"]["active"],
                    fr: result.data.item.lan["fr"]["name"],
                    fr_active: result.data.item.lan["fr"]["active"],
                    en: result.data.item.lan["en"]["name"],
                    en_active: result.data.item.lan["en"]["active"],
                    order: result.data.item.order,
                });

            }
        },function (error:any) {
            console.log(error);
            setLoading(false);
        });
    },[]);

    const onSubmit = (values:any)=>{
        console.log(values);
        setLoading(true);

        if(values.pid===item?.id){
            setLoading(false);
            openNotification("不能选择自己作为父亲");
            return;
        }else if(values.pid=="根结点"){
            values.pid = 0;
        }

        if(path===''){
            // @ts-ignore
            setPath(item?.image);
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
        console.log(params);
        updateCategory(item?.id,params,function (result:any) {
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

    const handleChange = (info:any)=>{
        console.log(info);
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
    }

    const uploadButton = (
        <div>
            {imageLoading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <XLTheme title="更新" subTitle="分类" loading={loading}>
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
                                    {categoryItems.map((category)=>{
                                        return <Option value={category.id}>{category.name}</Option>
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
                                action={process.env.REACT_APP_BASE_URL + "/category/admin/upload"}
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
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
                        <Button type="primary"  htmlType="submit" className="submit-button">更新分类</Button>
                    </div>
                </Form>
            </div>

        </XLTheme>
    );
};

export default CategoryUpdate;
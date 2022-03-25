import XLTheme from "../../components/xLTheme";
import React, {useEffect, useState} from 'react';
import {Layout, Menu, Breadcrumb, Input, Select, Form} from 'antd';
import { Modal, Button } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import './category.scss';
import {createCategoryConfig, getAllCategories} from '../../utils/requestUrl';

import {
    CheckboxPlugin, CitesSelectPlugin,
    DatePickerPlugin,
    InputPlugins, pluginTypes, RangePlugin,
    SwitchPlugin,
    TextareaPlugin,
    TimePickerPlugin
} from "../../components/xLPlugins";
import {openNotification} from "../../utils/tools";

const { Option } = Select;

const CategoryConfigCreate = (props:any) => {
    const [loading,setLoading] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [plugin,setPlugin] = useState<JSX.Element>();
    const [config,setConfig] = useState<Map<string,any>>();
    const [categories,setCategories] = useState<Array<JSX.Element>>();

    useEffect(()=>{
        // findAllCategories();
        getAllCategories({},function (result:any) {
            console.log(result);
            const items = [];
            if (result.data.code===200){
                for (let i = 0; i < result.data.items.length; i++) {
                    const item = result.data.items[i];
                    items.push(<Option value={item.id}>{item.name}</Option>)
                }
            }
            setCategories(items);
        },function (error:any) {
            console.log(error);
        })
    },[]);

    const createConfig = (values:any) => {
        setLoading(true);
        if (config && config.size>0){
            const items: any[] = [];
            config.forEach(function (value,key) {
                items.push(value.config)
            })
            const params = {
                cid: values.cid,
                lan: values.lan,
                configJson: JSON.stringify(items),
            }
            createCategoryConfig(params,function (result:any) {
                setLoading(false);
                if (result.data.code===200){
                    props.history.push("/category/config");
                }
                openNotification(result.data.msg);
            },function (error:any) {
                console.log(error);
                setLoading(false);
            })
            return;
        }
        setLoading(false);
        openNotification("Plugins should be add!");

    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onSubmit = (values:any,type:string,plugin:JSX.Element) => {
        console.log(values);
        const item = {
            config: values,
            plugin: plugin
        }

        const items = new Map<string,any>();
        items.set(values.title,item);
        if (config){
            config.forEach(function (value,key) {
                items.set(key,value);
            });
        }
        setConfig(items);
        setIsModalVisible(false);
    }

    const removePlugin = (values:any)=>{
        console.log(config);
        if (config){
            config.delete(values.title);
        }
        setConfig(config);
    }
    const pluginSelect = (key:any) =>{
        switch (key){
            case pluginTypes.INPUT:
                setPlugin(<InputPlugins confirm={onSubmit} onDelete={removePlugin}/>)
                break;
            case pluginTypes.TEXTAREA:
                setPlugin(<TextareaPlugin confirm={onSubmit} onDelete={removePlugin}/>)
                break;
            case pluginTypes.SWITCHER:
                setPlugin(<SwitchPlugin confirm={onSubmit} onDelete={removePlugin}/>)
                break;
            case pluginTypes.CHECKBOX:
                setPlugin(<CheckboxPlugin confirm={onSubmit} onDelete={removePlugin}/>)
                break;
            case pluginTypes.DATEPICKER:
                setPlugin(<DatePickerPlugin confirm={onSubmit} onDelete={removePlugin}/>)
                break;
            case pluginTypes.TIMEPICKER:
                setPlugin(<TimePickerPlugin confirm={onSubmit} onDelete={removePlugin}/>)
                break;
            case pluginTypes.RANGE:
                setPlugin(<RangePlugin confirm={onSubmit} onDelete={removePlugin}/>)
                break;
            case pluginTypes.CITES:
                setPlugin(<CitesSelectPlugin confirm={onSubmit} onDelete={removePlugin}/>)
                break;
        }
        setIsModalVisible(true);

    }
    const getRenderPlugins = ()=>{
        let plugins: any[]=[];

        if (config){
            config.forEach(function (value,key) {
                plugins.unshift(value.plugin);
            });
        }

        return plugins;
    }
    return (
        <XLTheme title="分类配置" subTitle="创建" loading={loading}>
            <div className="category-config-create">
               <div className="category-plugins">
                   <div className="plugin-item" onClick={()=>pluginSelect(pluginTypes.INPUT)}>
                       输入框
                   </div>
                   <div className="plugin-item" onClick={()=>pluginSelect(pluginTypes.TEXTAREA)}>
                       文本框
                   </div>
                   <div className="plugin-item" onClick={()=>pluginSelect(pluginTypes.SWITCHER)}>
                       Switcher 开关
                   </div>
                   <div className="plugin-item" onClick={()=>pluginSelect(pluginTypes.DATEPICKER)}>
                       日期选择器
                   </div>
                   <div className="plugin-item" onClick={()=>pluginSelect(pluginTypes.TIMEPICKER)}>
                       时间选择器
                   </div>
                   <div className="plugin-item" onClick={()=>pluginSelect(pluginTypes.CHECKBOX)}>
                       Checkbox
                   </div>
                   <div className="plugin-item" onClick={()=>pluginSelect(pluginTypes.RANGE)}>
                       Range
                   </div>
                   <div className="plugin-item" onClick={()=>pluginSelect(pluginTypes.CITES)}>
                       城市组件
                   </div>
               </div>
                <div className="category-content">
                    {getRenderPlugins()}
                    <div className="category-config-submit-form">
                        <Form
                            name="basic"
                            initialValues={{ remember: true }}
                            autoComplete="off"
                            layout="vertical"
                            onFinish={createConfig}
                        >
                            <Form.Item
                                label="Category"
                                name="cid"
                                rules={[{ required: true }]}

                            >
                                <Select>
                                    {categories}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Lan"
                                name="lan"
                                rules={[{ required: true }]}
                            >
                                <Select>
                                    <Option value="0">zh</Option>
                                    <Option value="1">fr</Option>
                                    <Option value="2">en</Option>
                                </Select>
                            </Form.Item>
                            <Button type="primary"  htmlType="submit" className="submit-button">submit</Button>
                        </Form>
                    </div>
                </div>
            </div>

            <Modal
                title="Add Plugins"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ hidden:true }}
                cancelButtonProps={{ hidden:false }}
            >
                {plugin}
            </Modal>
        </XLTheme>
    );
};

export default CategoryConfigCreate;
import {Button, Form, Image, Input, Layout, Menu, Select, Space, Spin, Table, Tag} from "antd";
import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import XLTheme from "../../components/xLTheme";
import {deleteAdmin, deleteCategoryById, getAllCategories} from "../../utils/requestUrl";
import {CategoryData} from "../../data/CategoryData";
import {openNotification} from "../../utils/tools";

const CategoryPage = (props:any) => {
    const [loading,setLoading] = useState<boolean>(false);
    const [items,setItems] = useState<Array<CategoryData>>([]);

    useEffect(()=>{
        findAllCategories();
    },[]);

    const findAllCategories = () => {
        setLoading(true);
        getAllCategories({},function (result:any) {
           console.log(result);
           setLoading(false);
           if (result.data.status===200){
                setItems(result.data.items);
           }
        },function (error:any) {
            console.log(error);
            setLoading(false);
        });
    }


    const columns = [
        {
            title:"ID",
            dataIndex: "id",
            key:"id",
        },
        {
            title:"Default name",
            dataIndex: "name",
            key:"name",
        },
        {
            title:"Pid",
            dataIndex: "pid",
            key:"pid",
        },
        {
            title:"Order",
            dataIndex:"order",
            key:"order",
        },
        {
            'title':"Image",
            dataIndex: "image",
            key: "image",
            render:(image:any)=>(
                <Image width={150} src={image}/>
            )
        },
        {
            title:'Lan',
            dataIndex: "lan",
            key:"lan",
            render:(lan:any)=>(
                <div>
                    <div>
                        <Tag>{lan["cn"]["name"]}</Tag>
                        {lan["cn"]["active"]?<Tag color="green">active</Tag>:<Tag color="red">Block</Tag>}
                    </div>
                    <div>
                        {(lan["fr"]["name"]!=null&&lan["fr"]["name"]!='')?<Tag>{lan["fr"]["name"]}</Tag>:<Tag color="red">FR NOT SET</Tag>}
                        {lan["fr"]["active"]?<Tag color="green">active</Tag>:<Tag color="red">Block</Tag>}
                    </div>
                    <div>
                        {(lan["en"]["name"]!=null&&lan["en"]["name"]!='')?<Tag>{lan["en"]["name"]}</Tag>:<Tag color="red">EN NOT SET</Tag>}
                        {lan["en"]["active"]?<Tag color="green">active</Tag>:<Tag color="red">Block</Tag>}
                    </div>
                </div>
            )
        },
        {
            title:"Enable",
            dataIndex:"enable",
            key:"enable",
            render:(enable:any)=>(
                enable===false?
                    <Tag key="block" color="red">Block</Tag>
                    :<Tag key="active" color="green">Active</Tag>
            )
        },
        {
            title:"Action",
            key:"action",
            render:(text:any,record:any)=>(
                <Space size="middle">
                    <a onClick={()=>updateClick(record.id)}>update</a>
                    <a onClick={()=>deleteClick(record.id)}>delete</a>
                </Space>
            )
        }
    ];

    const updateClick = (id:number) => {
        // @ts-ignore
        props.history.push({
            pathname:"/category/update",
            state:{id:id}
        });
    }

    const deleteClick = (id:number) => {
        setLoading(true);

        deleteCategoryById(id,function (result:any) {
            setLoading(false);
            console.log(result);
            if (result.data.status===200){
                findAllCategories();
            }
            openNotification(result.data.msg);

        },function (error:any) {
            setLoading(false);
            console.log(error);
        });
    }


    const onSubmit = (values:any) => {
        console.log(values);
    }

    return (
        <XLTheme title="分类" subTitle="列表" loading={loading} extra={[
            <Button ghost={true}>
                <NavLink to="/category/create">
                    创建分类
                </NavLink>
            </Button>
        ]}>
            <Table dataSource={items} columns={columns} />
        </XLTheme>
    );
};

export default CategoryPage;
import {Button, Table, Tag} from "antd";
import {NavLink} from "react-router-dom";
import React, {useEffect, useState} from "react";
import XLTheme from "../../components/xLTheme";
import {getAllCategoryConfigs} from "../../utils/requestUrl";
import {openNotification} from "../../utils/tools";

const CategoryConfig = () => {
    const [loading,setLoading] = useState<boolean>(false);
    const [items,setItems] = useState<Array<any>>();

    useEffect(function () {
        findAllConfigs();
    },[]);

    const findAllConfigs = () =>{
        getAllCategoryConfigs({},function (result:any) {
            if(result.data.code===200){
                console.log(result.data.items);
                setItems(result.data.items);
            }else{
                openNotification(result.data.msg);
            }
        },function (error:any) {
            console.log(error);
        });
    }

    const columns = [
        {
            title:"ID",
            dataIndex: "id",
            key:"id",
        },
        {
            title:"Lan",
            dataIndex: "lan",
            key:"lan",
        },
        {
            title:"Category",
            dataIndex: "cid",
            key:"cid",
        },
        {
            title:"Config",
            dataIndex: "configJson",
            key:"configJson",
        },
        {
            title:"Status",
            dataIndex: "status",
            key:"status",
            render:(status:any)=>(
                status===false?
                    <Tag key="block" color="red">Block</Tag>
                    :<Tag key="active" color="green">Active</Tag>
            )
        }
    ]
    return (
        <XLTheme title="分类" subTitle="配置" loading={loading}
                 extra={[
                     <Button ghost={true}>
                         <NavLink to="/category/config/create">
                             创建分类配置
                         </NavLink>
                     </Button>
                 ]}
        >
            <Table dataSource={items} columns={columns} />
        </XLTheme>
    );
};

export default CategoryConfig;
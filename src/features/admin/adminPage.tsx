import {Component, useEffect, useState} from "react";
import {Button, Layout, notification, Space, Spin, Table, Tag} from "antd";
import {deleteAdmin, getAllAdmins, getAllUsers} from "../../utils/requestUrl";
import {AdminData} from "../../data/AdminData";
import {NavLink} from "react-router-dom";
import XLTheme from "../../components/xLTheme";
import {openNotification} from '../../utils/tools';

const AdminPage = (props: { history: string[]; })=>{

    let limit = 10;
    const [page,setPage] = useState<number>(0);
    const [pages,setPages] = useState<number>(10);
    const [items,setItems] = useState<Array<AdminData>>([]);
    const [loading,setLoading] = useState<boolean>(false);


    useEffect(()=>{
        findAllAdmins(page);
    },[]);


    const findAllAdmins = (current:number) => {
        setLoading(true);
        const params = {
            limit: limit,
            page: 0,
        };
        params['page'] = current;

        getAllAdmins(params,(result:any)=>{
            console.log(result);
            setLoading(false);

            if(result.data.status===200){
                //success
                limit = result.data.limit;
                setPages(result.data.pages);
                setItems(result.data.items);
            }
        },(error:any)=>{
            setLoading(false);
        });
    }

    const updateClick = (id:number) => {
        // @ts-ignore
        props.history.push({
            pathname:"/admin/update",
            state:{id:id}
        });
    }

    const deleteClick = (id:number) => {
        setLoading(true);
        const params = {
            id: id,
        };
        deleteAdmin(params,function (result:any) {
            setLoading(false);
            console.log(result);
            if (result.data.status===200){
                findAllAdmins(page);
            }
            openNotification(result.data.msg);

        },function (error:any) {
            setLoading(false);
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
            title:"Email",
            dataIndex: "email",
            key:"email",
        },
        {
            title:"Username",
            dataIndex: "username",
            key:"username",
        },
        {
            title:"Gender",
            dataIndex:"gender",
            key:"gender",
            render: (gender: number) =>(
                gender==0?"男":"女"
            ),
        },
        {
            title:"Status",
            dataIndex:"status",
            key:"status",
            render:(status:any)=>(
                status==0?
                    <Tag key="block" color="red">Block</Tag>
                    :<Tag key="active" color="green">Active</Tag>
            )
        },
        {
            title:"Action",
            key:"status",
            render:(text:any,record:any)=>(
                <Space size="middle">
                    <a onClick={()=>updateClick(record.id)}>update</a>
                    <a onClick={()=>deleteClick(record.id)}>delete</a>
                </Space>
            )
        }
    ];
    return (
        <XLTheme loading={loading} subTitle="列表" title="管理员" extra={[
            <Button ghost={true}>
                <NavLink to="/admin/create">
                    创建管理员
                </NavLink>
            </Button>
        ]}>
            <Table dataSource={items} columns={columns} />
        </XLTheme>
    );
}

export default AdminPage;
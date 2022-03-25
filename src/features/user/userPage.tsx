import React, {useEffect, useState} from "react";
import {Layout, Spin, Alert, notification, Table, Tag, Space, Button, Modal} from "antd";
import {changeUserStatus, deleteUser, getAllUsers, getUserDetail} from "../../utils/requestUrl";
import {UserData} from "../../data/UserData";
import XLTheme from "../../components/xLTheme";
import {openNotification} from "../../utils/tools";
import "./user.scss"
const UserPage = (Props: { history: string[]; })=> {

    let limit = 10;
    const [page,setPage] = useState<number>(0);
    const [pages,setPages] = useState<number>(10);
    const [items,setItems] = useState<Array<UserData>>([]);
    const [loading,setLoading] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [detail,setDetail] = useState<JSX.Element>();
    useEffect(()=>{
        findAllUsers(page);
    },[]);

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const findAllUsers = (current:number) =>{
        setLoading(true);
        const params = {
            limit: limit,
            page: 0,
        };
        params['page'] = current;
        getAllUsers(params,(result:any)=>{
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
    const prePage = () =>{
        setLoading(true);
        const current = page - 1;
        if (current<0){
            setLoading(false);
            openNotification("no more data");
            return;
        }
        setPage(current);
        findAllUsers(current);
    }


    const nextPage = () =>{
        setLoading(true);
        const current = page + 1;
        if (current>=pages){
            setLoading(false);
            openNotification("no more data");
            return;
        }
        setPage(current);
        findAllUsers(current);
    }

    const changeStatusClick = (id:number) => {
        changeUserStatus({id:id},function (result:any) {
            console.log(result);
            openNotification(result.data.msg);
            if (result.data.status===200){
                findAllUsers(page);
            }
        },function (error:any) {
            console.log(error);
        });
    }
    const deleteUserClick = (id:number) => {
        setLoading(true);
        setIsModalVisible(false);
        deleteUser({uid:id},function (result:any) {
            setLoading(false);
            openNotification(result.data.msg);
            if (result.data.status===200){
                findAllUsers(page);
            }
        },function (error:any) {
            setLoading(false);
            console.log(error);
        })
    }
    const getUserDetailClick = (id:number) => {
        setLoading(true);
        getUserDetail({uid:id},function (result:any) {
            setLoading(false);
            if (result.data.status===200){
                const user = result.data.user;
                const userDetail = <div>
                        <Button danger type="primary" onClick={()=>{deleteUserClick(id)}}>delete</Button>
                        <table className="user-detail">
                            <tr><th>Id</th><td>{user.id}</td></tr>
                            <tr><th>HeadImage</th><th><img src={user.headimage} width={100} height={100}/></th></tr>
                            <tr><th>Username</th><td>{user.username}</td></tr>
                            <tr><th>Email</th><td>{user.email}</td></tr>
                            <tr><th>Gender</th><td>{user.gender}</td></tr>
                            <tr><th>Status</th><td>{user.status}</td></tr>
                            <tr><th>Ctime</th><td>{user.ctime}</td></tr>
                            <tr><th>Utime</th><td>{user.utime}</td></tr>
                        </table>
                    </div>

                setDetail(userDetail);
                setIsModalVisible(true);
            }else{
                openNotification(result.data.msg);
            }

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
            render: (gender: number) => {
                switch (gender) {
                    case 0:
                        return "female";
                    case 1:
                        return "male";
                    default:
                        return "unkonw";
                }
            }
        },
        {
            title: "Headimage",
            dataIndex: "headimage",
            key:"headimage",
        },
        {
            title:"Status",
            dataIndex:"status",
            key:"status",
            render:(status:any)=>(
                status===0?
                    <Tag key="block" color="red">Block</Tag>
                    :<Tag key="active" color="green">Active</Tag>
            )
        },

        {
            title:"Action",
            key:"status",
            render:(record:any)=>(
                <Space size="middle">
                    <Button onClick={()=>{changeStatusClick(record.id)}}>change status</Button>
                    <Button onClick={()=>{getUserDetailClick(record.id)}}>detail</Button>
                </Space>
            )
        }
    ];


    return (
        <XLTheme title="用户" subTitle="列表" loading={loading}>
            <Table dataSource={items} columns={columns} pagination={false}/>
            <div className="pagination-bar">
                <div className="pagination-bar-items">
                    <Button onClick={()=>{prePage()}}>pre</Button>
                    <label>{page+1}/{pages}</label>
                    <Button onClick={()=>{nextPage()}}>next</Button>
                </div>
            </div>
            <Modal
                title="User Detail"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ hidden:true }}
                cancelButtonProps={{ hidden:false }}
            >
                {detail}
            </Modal>
        </XLTheme>
    );
};

export default UserPage;
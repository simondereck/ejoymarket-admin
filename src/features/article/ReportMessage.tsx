import XLTheme from "../../components/xLTheme";
import {Button, message, Space, Table, Tag} from "antd";
import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import {deleteReportById, getAllReportMessages} from "../../utils/requestUrl";
import {openNotification} from "../../utils/tools";
import {ReportData} from "../../data/ReportData";

const ReportMessage = (props:any) =>{

    const [loading,setLoading] = useState<boolean>(false);
    const [items,setItems] = useState<Array<ReportData>>([]);

    useEffect(()=>{
        findAllReportMessage();
    },[]);

    const findAllReportMessage = () => {
        setLoading(true);
        getAllReportMessages({},function (result:any) {
            setLoading(false);
            console.log(result);
            if (result.data.code===200){
                setItems(result.data.items);
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
            title:'Alisa',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: "CN",
            dataIndex: "cn",
            key: "cn",
        },
        {
            title: "FR",
            dataIndex: "fr",
            key: "fr",
        },
        {
            title: "EN",
            dataIndex: "en",
            key: "en",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render:(status:boolean)=>(
                status?<Tag color="green">Active</Tag>:<Tag color="red">Block</Tag>
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

    const updateClick = (id:number) => {
        props.history.push({
            pathname:"/report/message/update",
            state:{id:id}
        });
    }


    const deleteClick = (id:number) => {
        setLoading(true);
        deleteReportById(id,function (result:any) {
            console.log(result);
            setLoading(false);
            if (result.data.code===200){
                findAllReportMessage();
            }
            openNotification(result.data.msg);
        },function (error:any) {
            console.log(error);
            setLoading(false);
        });
    }

    return (
        <XLTheme loading={loading} subTitle="违规类别" title="列表" extra={[
            <Button ghost={true}>
                <NavLink to="/report/message/create">
                    创建违规类别
                </NavLink>
            </Button>
        ]}>
            <Table dataSource={items} columns={columns} />

        </XLTheme>
    )
}


export default ReportMessage;
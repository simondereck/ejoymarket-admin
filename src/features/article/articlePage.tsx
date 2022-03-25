import XLTheme from "../../components/xLTheme";
import {Button, Table} from "antd";
import {NavLink} from "react-router-dom";
import {useState} from "react";
import {AdminData} from "../../data/AdminData";

const ArticlePage = () => {

    const [items,setItems] = useState<Array<AdminData>>([]);
    const [loading,setLoading] = useState<boolean>(false);

    const columns = [
        {
            title:"ID",
            dataIndex: "id",
            key:"id",
        },
        {
            title:"Title",
            dataIndex: ""
        },
        {
            title:"",
            dataIndex: "",
            key:""
        }

    ];

    return (
        <XLTheme loading={loading} subTitle="列表" title="管理员" extra={[
            <Button ghost={true}>
                <NavLink to="/article/create">
                    创建系统帖子
                </NavLink>
            </Button>
        ]}>
            <Table dataSource={items} columns={columns} />
        </XLTheme>
    );
};

export default ArticlePage;
import XLTheme from "../../components/xLTheme";
import {Button, Table} from "antd";
import {NavLink} from "react-router-dom";
import {useState} from "react";

const MessagePage = ()=>{

    const [loading,setLoading] = useState<boolean>(false);
    const [items] = useState<Array<any>>();

    const columns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    }];

    return (
        <XLTheme loading={loading} subTitle="列表" title="系统信息" extra={[
            <Button ghost={true}>
                <NavLink to="/system/message/create">
                    创建系统信息
                </NavLink>
            </Button>
        ]}>
            <Table dataSource={items} columns={columns} />
        </XLTheme>
    );
}

export default MessagePage;
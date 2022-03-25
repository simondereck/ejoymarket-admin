import XLTheme from "../../components/xLTheme";
import {Button, Table} from "antd";
import {NavLink} from "react-router-dom";
import {useState} from "react";
import {AdminData} from "../../data/AdminData";

const ArticleCreate = () =>{

    const [loading,setLoading] = useState<boolean>(false);

    return (
        <XLTheme loading={loading} subTitle="创建" title="系统帖子" >

        </XLTheme>
    );
}

export default ArticleCreate;
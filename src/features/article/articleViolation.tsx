import {useState} from "react";
import XLTheme from "../../components/xLTheme";
import {Button} from "antd";
import {NavLink} from "react-router-dom";

const ArticleViolation = () => {
    const [loading,setLoading] = useState<boolean>(false);

    return (
        <XLTheme loading={loading} subTitle="列表" title="管理员" extra={[
            <Button ghost={true}>
                <NavLink to="/article/create">
                    创建文章
                </NavLink>
            </Button>
        ]}>
        </XLTheme>
    )
}

export default ArticleViolation;
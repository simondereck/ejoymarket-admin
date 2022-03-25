import XLTheme from "../../components/xLTheme";
import {useState} from "react";

const MessageUpdate = () => {

    const [loading,setLoading] = useState<boolean>(false);


    return (
        <XLTheme loading={loading} subTitle="更新" title="系统信息" >

        </XLTheme>
    );
}

export default MessageUpdate;
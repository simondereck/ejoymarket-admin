import LeftMenuPage from "../features/left/leftMenuPage";
import {Layout, Spin} from "antd";
import XLPageHeader from "./xLPageHeader";
import React, {useState} from "react";
const { Header, Content, Sider } = Layout;

const XLTheme = (props:any) => {
    let content;
    if (props.loading){
         content =   <Spin
            tip="Loading..."
            size="large"
            spinning={props.loading}
        >
            {props.children}
        </Spin>
    }else{
        content = <div>{props.children}</div>
    }


    return (
        <div className="xLtheme">
            <LeftMenuPage />
            <Layout>
                <XLPageHeader title={props.title} subTitle={props.subTitle} extra={props.extra}/>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                        height: "100%",
                        background:"whitesmoke",
                    }}
                >
                    {content}
                </Content>
            </Layout>
        </div>

    );

}

export default XLTheme;

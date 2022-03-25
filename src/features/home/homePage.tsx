import React, {Component} from "react";
import {Layout} from 'antd';
import LeftMenuPage from "../left/leftMenuPage";
import XLPageHeader from "../../components/xLPageHeader";
const { Header, Content, Sider } = Layout;
const HomePage = ()=>{

    return (
        <div className="xLtheme">
            <LeftMenuPage />
            <Layout>
                <XLPageHeader title="主页" subTitle="welcome"/>
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
                    Content
                </Content>
            </Layout>
        </div>
    )

}

export default HomePage;
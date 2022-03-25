import {Component, useEffect, useState} from "react";
import {Menu,Layout,Button} from 'antd';
import { AppstoreOutlined, MailOutlined,
    SettingOutlined, UserOutlined ,
    BookOutlined, SnippetsOutlined,
    NotificationOutlined
} from '@ant-design/icons';
import {NavLink} from 'react-router-dom'
import './left.scss';
import {getAdminInfo, removeToken, setToken} from "../../utils/accessToken";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class LeftMenuPage extends Component{
    // @ts-ignore
    static admin;
    constructor() {
        super();
        this.admin = getAdminInfo();
        console.log(this.admin);
    }

    handleClick = e => {
        console.log('click ', e);
    };

    logoutClick = e =>{
        removeToken()
        window.location.href="/";
    };


    render() {
        return <Sider width={220} className="site-layout-background">
            <div className="user-head">
                <div>Hi {this.admin.username}</div>
                <Button className="logout-button" onClick={this.logoutClick}>退出</Button>
            </div>
            <Menu
                onClick={this.handleClick}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                style={{ height: '100%', borderRight: 2 }}
            >
                <SubMenu key="user" icon={<UserOutlined />} title="用户">
                    <Menu.Item key="user-normal" >
                        <NavLink to="/users">
                            普通用户
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="user-admin" >
                        <NavLink to="/admin">
                            管理员
                        </NavLink>
                    </Menu.Item>
                </SubMenu>

                <SubMenu key="category" icon={<SnippetsOutlined />} title="帖子分类">
                    <Menu.Item key="category-all" >
                        <NavLink to="/category">
                            所有分类
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="category-config">
                        <NavLink to="/category/config">
                            分类配置
                        </NavLink>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="article" icon={<BookOutlined />} title="帖子">
                    <Menu.Item key="article-all" >
                        <NavLink to="/article">
                            所有帖子
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="article-block" >
                        <NavLink to="/article/violation">
                            违规帖子
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="article-new" >申述帖子</Menu.Item>
                    <Menu.Item key="report-message">
                        <NavLink to="/report/message">
                            违规分类列表
                        </NavLink>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="message" icon={<MailOutlined />} title="消息中心">
                    <Menu.Item key="message-all" >
                        <NavLink to="/system/message">
                            系统消息
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="message-push" >消息推送</Menu.Item>
                    <Menu.Item key="arts-new" >广告推送</Menu.Item>
                </SubMenu>
                <SubMenu key="ads" icon={<NotificationOutlined />} title="广告中心">
                    <Menu.Item key="carousel-all">
                        <NavLink to="/carousel/all">
                            滚动屏广告
                        </NavLink>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
    }
}


export default LeftMenuPage;

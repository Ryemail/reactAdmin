import React, { Component } from "react";
import { Layout, Menu, Icon, Avatar, Dropdown } from "antd";
import { Route, BrowserRouter as Router, NavLink, Switch } from "react-router-dom";
import MenuConfig from '../mock/menuConfig';
import Login from '../pages/login/';
import Home from '../pages/home/';
import Button from '../pages/button/';
import Echarts from '../pages/echarts/';
import "./index.less";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const menu = (
    <Menu>
        <Menu.Item>
            <NavLink to="/login">退出</NavLink>
        </Menu.Item>
    </Menu>
);
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            menuTreeNode: []
        };
        this.renderMenu = this.renderMenu.bind(this);
    }

    /* 菜单展开与收缩 */
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };

    componentWillMount() {
        const menuTreeNode = this.renderMenu(MenuConfig);
        this.setState({
            menuTreeNode
        });
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/" render={() =>
                        <Layout className="customize-layout">
                            <Sider breakpoint="lg"
                                trigger={null}
                                collapsible
                                collapsed={this.state.collapsed}
                                onCollapse={() => {
                                    this.toggle();
                                }}
                                width={256}
                                className="customize-aside"
                            >
                                <Sider className="customize-aside-children"
                                    trigger={null}
                                    width={276}
                                >
                                    <Sider
                                        trigger={null}
                                        collapsible
                                        collapsed={this.state.collapsed}
                                        width={256}
                                    >
                                        <div className="logo" />
                                        <Menu
                                            theme="dark"
                                            mode="inline"
                                            defaultSelectedKeys={['/home']}
                                        >
                                            {this.state.menuTreeNode}
                                        </Menu>
                                    </Sider>
                                </Sider>
                            </Sider>
                            <Layout>
                                {this.renderHeader()}
                                {this.renderContent()}
                            </Layout>
                        </Layout>
                    } />
                </Switch>
            </Router>
        );
    }

    // 渲染菜单
    renderMenu(data) {
        return data.map(item => {
            if (item.children) {
                return (
                    <SubMenu title={<span><Icon type="user" /><span>{item.title}</span></span>} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                );
            }
            return (
                <Menu.Item title={item.title} key={item.key}>
                    <NavLink to={item.key}>
                        <span>
                            <Icon type="file" />
                            <span> {item.title}</span>
                        </span>
                    </NavLink>
                </Menu.Item>
            );
        });
    };
    // 渲染header
    renderHeader() {
        return (
            <Header style={{ background: "#fff", padding: 0 }}>
                <Icon
                    className="trigger"
                    type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                    onClick={this.toggle}
                />
                <div className="header-right">
                    <Dropdown overlay={menu} placement="bottomCenter">
                        <div className="trigger">
                            <Avatar
                                style={{ backgroundColor: "#87d068", marginTop: -3 }}
                                icon="user"
                            />
                            <span style={{ paddingLeft: 6 }}>阮书垚</span>
                        </div>
                    </Dropdown>
                </div>
            </Header>
        )
    }
    // 渲染 content
    renderContent() {
        return (
            <Content className="customize-layout-content">
                <Content className="customize-layout-content customize-layout-content-children">
                    <Content>
                        <Switch>
                            <Route path="/home" exact component={Home} />
                            <Route path="/login" component={Login} />
                            <Route path="/ui/buttons" component={Button} />
                            <Route path="/ui/echarts" component={ Echarts} />
                        </Switch>
                    </Content>
                </Content>
            </Content>
        )
    }
}

export default App;

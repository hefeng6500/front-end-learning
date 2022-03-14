import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import * as server from "../api/login";
import {
  Layout,
  Menu,
  Icon,
  Breadcrumb,
  Badge,
  Radio,
  Button,
  Input,
  Row,
  Col,
  Carousel,
  Dropdown,
  message,
  Divider,
  Card,
  Tag,
  List,
  Tabs
} from "antd";

import "./index.css";

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      panes: [
        { title: '我的专栏', content: 'Content of Tab Pane 1', key: '1' },
        { title: '行业快讯', content: 'Content of Tab Pane 2', key: '2' },
      ]
    }
  }
  test() {
    server.test().then(res => { });
  }
  handleClick = e => {
    console.log('click ', e);
  }
  handleMenuClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
  }

  render() {
    const { Header, Content, Footer } = Layout;
    const Search = Input.Search;
    const { SubMenu } = Menu;
    const { TabPane } = Tabs;

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">
          <Icon type="user" />
          1st menu item
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="user" />
          2nd menu item
        </Menu.Item>
        <Menu.Item key="3">
          <Icon type="user" />
          3rd item
        </Menu.Item>
      </Menu>
    );

    const data = [
      'Racing car sprays burning fuel into crowd.',
      'Japanese princess to wed commoner.',
      'Australian walks 100km after outback crash.',
      'Man charged over missing wedding girl.',
      'Los Angeles battles huge wildfires.',
    ];

    return (
      <div>
        <Layout>
          <Header className="header">
            <div className="logo"> 博客Logo摆放 </div>
            <Menu
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              style={{ lineHeight: "50px", float: 'left' }}
            >
              <Menu.Item key="1">首页</Menu.Item>
              <Menu.Item key="2">
                团队
                <Badge className="has-team-news" status="processing" />
              </Menu.Item>
              <Menu.Item key="3"> 标签 </Menu.Item>
            </Menu>
            <Radio.Group className="user-box" value={'small'} onChange={this.handleSizeChange}>
              <Radio.Button value="large">Large</Radio.Button>
              <Radio.Button value="default">Default</Radio.Button>
              <Radio.Button value="small">
                <Icon type="user" />
              </Radio.Button>
            </Radio.Group>
            <Search
              className="search-box"
              placeholder="input search text"
              onSearch={value => console.log(value)}
              style={{ width: 200 }}
            />
          </Header>
          <Content style={{ padding: "10px 20px 50px" }}>
            <Row type="flex">
              <Col span={4}>
                <Menu
                  onClick={this.handleClick}
                  style={{ width: "100%" }}
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  mode="inline"
                >
                  <SubMenu
                    key="sub1"
                    title={
                      <span>
                        <Icon type="mail" />
                        <span>Navigation One</span>
                      </span>
                    }
                  >
                    <Menu.Item key="1">Option 1</Menu.Item>
                    <Menu.Item key="2">Option 2</Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub2"
                    title={
                      <span>
                        <Icon type="appstore" />
                        <span>Navigation Two</span>
                      </span>
                    }
                  >
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                  </SubMenu>
                  <SubMenu
                    key="sub4"
                    title={
                      <span>
                        <Icon type="setting" />
                        <span>Navigation Three</span>
                      </span>
                    }
                  >
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <Menu.Item key="11">Option 11</Menu.Item>
                    <Menu.Item key="12">Option 12</Menu.Item>
                  </SubMenu>
                </Menu>
              </Col>
              <Col span={14} style={{ padding: "0 15px" }}>
                <Carousel autoplay>
                  <div>
                    <h3>1</h3>
                  </div>
                  <div>
                    <h3>2</h3>
                  </div>
                  <div>
                    <h3>3</h3>
                  </div>
                  <div>
                    <h3>4</h3>
                  </div>
                </Carousel>
                <div className="top-switch">
                  <Dropdown overlay={menu}>
                    <Button>
                      Button <Icon type="down" />
                    </Button>
                  </Dropdown>
                  <div className="top-switch-2">
                    <a href="#">热门</a>
                    <Divider type="vertical" />
                    <a href="#" style={{ color: "gray" }}>最新</a>
                  </div>
                </div>
                <Divider type="horizontal" style={{ margin: "10px 0" }} />
                <List
                  pagination={{
                    onChange: page => {
                      console.log(page);
                    },
                    pageSize: 3,
                    position: 'bottom'
                  }}
                  dataSource={data}
                  renderItem={item => (
                    <List.Item>
                      <Card style={{ width: "100%" }}>
                        <h2 className="article-title">这是文章标题</h2>
                        <div className="post-meta">
                          <span className="meta-span">
                            <Icon type="user" className="icon" />
                            @nickname
                        </span>
                          <span className="meta-span">
                            <Icon type="clock-circle" className="icon" />
                            10分钟前
                        </span>
                        </div>
                        <div className="article-desc">
                          这里是文章描述
                      </div>
                        <div className="tags">
                          <Tag>Tag 1</Tag>
                          <Tag>Tag 1</Tag>
                          <Tag>Tag 1</Tag>
                        </div>
                      </Card>
                    </List.Item>
                  )}
                />

              </Col>
              <Col span={6}>
                <Card style={{ width: '100%', borderColor: '#42b983', }}>
                  <h3 style={{ color: '#42b983' }}>
                    <Icon type="notification" style={{ marginRight: '8px' }} />
                    <span>这里是一个公告标题</span>
                  </h3>
                  <p style={{ margin: '10px 0' }}>这里有一个描述性词汇描述性词汇描述性词汇描述性词汇描述性词汇</p>
                  <Button type="primary" style={{ width: '100%', background: '#42b983', borderColor: '#42b983', color: '#fff' }}>
                    开始浏览
                  </Button>
                </Card>

                <Card style={{ width: '100%', margin: '10px 0' }}>
                  <Icon type="tag" style={{ marginRight: '8px', fontSize: '16px' }} />
                  <span>热门标签</span>
                  <Divider type="horizontal" />
                  <Row className="hot-tag">
                    <Tag>前端</Tag>
                    <Tag>数据结构</Tag>
                    <Tag>WEB全栈</Tag>
                    <Tag>事件循环</Tag>
                    <Tag>浏览器</Tag>
                    <Tag>Node.js</Tag>
                    <Tag>负载均衡</Tag>
                    <Tag>微服务</Tag>
                    <Tag>计算机组成原理</Tag>
                    <Tag>蚂蚁金服前端</Tag>
                  </Row>
                </Card>

                <Card style={{ width: '100%', margin: '10px 0' }}>
                  <Tabs>
                    {this.state.panes.map(pane => (
                      <TabPane tab={pane.title} key={pane.key}>
                        {pane.content}
                      </TabPane>
                    ))}
                  </Tabs>
                </Card>
              </Col>
            </Row>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            HeFeng Blog© 2019 Created by Doctor Yang
          </Footer>
        </Layout>
      </div>
    );
  }
}

export default withRouter(Index);

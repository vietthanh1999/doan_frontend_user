import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default function LayoutAdmin(){
    return (
        <Layout hasSider>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            backgroundColor: 'white',
            borderRight: '1px solid #ccc',
          }}
        >
          <div className="logo" />
          <Menu theme="light" mode="inline" defaultSelectedKeys={['1']} style={{position: 'absolute', top: 100}}>
            <Menu.Item key="1" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
            <Menu.Item key="2" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
              Danh sách user
            </Menu.Item>
            <Menu.Item key="4" icon={<BarChartOutlined />}>
                Danh sách đăng ký thành chủ nhà
            </Menu.Item>
            <Menu.Item key="5" icon={<CloudOutlined />}>
              nav 5
            </Menu.Item>
            <Menu.Item key="6" icon={<AppstoreOutlined />}>
              nav 6
            </Menu.Item>
            <Menu.Item key="7" icon={<TeamOutlined />}>
              nav 7
            </Menu.Item>
            <Menu.Item key="8" icon={<ShopOutlined />}>
              nav 8
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>

            </div>
          </Content>
        </Layout>
      </Layout>
    )
}

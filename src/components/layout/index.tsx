import { Layout } from 'antd';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideMenu from './sideMenu';
import './style/index.less';

const { Header, Content, Sider } = Layout;

const LayoutComp: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Header className="header">
        {/* <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']} items={[]} /> */}
      </Header>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider theme="light" width={300} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <SideMenu />
          {/* <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} /> */}
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: '16px 16px' }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb> */}
            <div className="site-layout-background">
              <Outlet />
            </div>
          </Content>
          {/* <Footer style={{ textAlign: 'center' }}>React Web Learn</Footer> */}
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutComp;

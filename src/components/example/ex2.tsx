import { useState } from 'react';
import logo from '@/assets/icons/logo.svg';
import Home from 'comps/home/index';
import myToast from '@/utils/toast';

import { Button, Card, DatePicker, Empty, Layout, Radio, Space, message, Input } from 'antd';
import { ConfigProvider } from 'antd';
import { useRequest } from 'ahooks';
import '@/design/antd/custom-dark.css';
import '@/design/antd/custom-default.css';
import '@/design/App.css';
import { Outlet } from 'react-router-dom';

const Ex2: React.FC = () => {
  const [prefix, setPrefix] = useState('custom-default');

  const handlePrefixChange = (e: any) => {
    setPrefix(e.target.value);
    e.target.value === 'custom-default' && myToast.success('Successfully Changed!');
    e.target.value === 'custom-dark' && myToast.success('Successfully Changed!', true);
    // myToast.promise(changeUsername('Hi,Lvin'), {
    //   loading: 'Hi,Lvin',
    //   success: (data) => `Settings saved! ${data.success}`,
    //   error: (error) => <span>Settings saved! {error.message}</span>
    // });
  };
  const changeUsername = (username: string): Promise<{ success: boolean }> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve({ success: true });
        } else {
          reject(new Error('Failed to modify username' + username));
        }
      }, 1000);
    });
  };
  const [state, setState] = useState('');

  const { loading, run } = useRequest(changeUsername, {
    manual: true,
    onSuccess: (result, params) => {
      if (result.success) {
        setState('');
        message.success(`The username was changed to "${params[0]}" !`);
      }
    },
    onError: (error) => {
      message.error(error.message);
    }
  });
  return (
    <ConfigProvider prefixCls={prefix}>
      <div className={`App ${prefix}`}>
        <Layout>
          <Layout.Content>
            <Space>
              Change Theme:
              <Radio.Group onChange={handlePrefixChange} value={prefix}>
                <Radio value="custom-default">default Style</Radio>
                <Radio value="custom-dark">dark Style</Radio>
              </Radio.Group>
            </Space>
            <br />
            <Space>
              <DatePicker />
              <Empty />
              <Card title="Default size card" style={{ width: 300 }}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
              </Card>
            </Space>
            <br />
            <Space>
              <Radio.Group>
                <Radio.Button value="large">Large</Radio.Button>
                <Radio.Button value="default">Default</Radio.Button>
                <Radio.Button value="small">Small</Radio.Button>
              </Radio.Group>
              <br />
              <br />
              <Button type="primary">Primary</Button>
              <Button>Default</Button>
              <Button type="dashed">Dashed</Button>
              <br />
              <Button type="link">Link</Button>
              <br />
            </Space>
            <br />
          </Layout.Content>
        </Layout>
        <div>
          <Input
            onChange={(e) => setState(e.target.value)}
            value={state}
            placeholder="Please enter username"
            style={{ width: 240, marginRight: 16 }}
          />
          <Button disabled={loading} type="primary" onClick={() => run(state)}>
            {loading ? 'Loading' : 'Edit'}
          </Button>
          <img src={logo} className="App-logo" alt="logo" />
          <Home />
          <Outlet />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Ex2;

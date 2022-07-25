import { useState } from 'react';
import logo from '../src/assets/img/logo.svg';

import { Button, Card, DatePicker, Empty, Layout, Radio, Space, message, Input } from 'antd';
import { ConfigProvider } from 'antd';
import { useRequest } from 'ahooks';
import '../src/assets/css/custom-dark.css';
import '../src/assets/css/custom-default.css';
import '../src/assets/css/App.css';

const App = () => {
  const [prefix, setPrefix] = useState('custom-default');
  const handlePrefixChange = (e: any) => {
    setPrefix(e.target.value);
  };
  const changeUsername = (username: string): Promise<{ success: boolean }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
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
        </div>
      </div>
    </ConfigProvider>
  );
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to reload.
  //       </p>
  //       <Button type="primary">按钮</Button>
  //       <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
};

export default App;

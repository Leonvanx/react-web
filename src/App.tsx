import { useState } from 'react';
import '../src/assets/img/logo.svg';

import { Button, Card, DatePicker, Empty, Layout, Radio, Space } from 'antd';
import { ConfigProvider } from 'antd';

import '../src/assets/css/custom-dark.css';
import '../src/assets/css/custom-default.css';
import '../src/assets/css/App.css';

const App = () => {
  const [prefix, setPrefix] = useState('custom-default');
  const handlePrefixChange = (e: any) => {
    setPrefix(e.target.value);
  };
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
  //       <Button type='primary'>按钮</Button>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
};

export default App;

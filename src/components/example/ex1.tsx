import logo from '@/assets/icons/logo.svg';

import { Button } from 'antd';
import '@/design/antd/custom-dark.css';
import '@/design/antd/custom-default.css';
import '@/design/App.css';
import { Link, Outlet } from 'react-router-dom';

const Ex1: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Button type="primary">按钮</Button>
        <Link to="/Ex2">to Ex2</Link>
        <Link to="example">to Example</Link>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <Outlet />
      </header>
    </div>
  );
};

export default Ex1;

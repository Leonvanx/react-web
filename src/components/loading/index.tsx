import { Spin } from 'antd';
import './index.less';

const Loading: React.FC = () => {
  return (
    <div className="loadingSpin">
      <Spin size="large" className="spin-loading-class" tip="加载中，请稍后..." />
    </div>
  );
};
export default Loading;

import { Button, DatePicker } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <DatePicker />
      <Button
        onClick={() => {
          navigate('/ex2/invoice:dynamic-route-param');
        }}
      >
        测试
      </Button>
      <br />
      <Link to="/ex1">to Layout</Link>
      <br />
      <Link to="invoice:dynamic-route-param">to Ex2-children</Link>
    </>
  );
};
export default Home;

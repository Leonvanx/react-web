import { Button, DatePicker } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import timerStore from 'modules/test';
import { useEffect } from 'react';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const timeCur = timerStore.current;
  useEffect(() => {
    console.log(timerStore.current);
    // console.log(timerStore.start);
    timerStore.tick();
    console.log(timerStore.elapsedTime);
  }, [timeCur]);
  return (
    <>
      <DatePicker />
      <Button
        onClick={() => {
          timerStore.tick();
        }}
      >
        增加
      </Button>
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

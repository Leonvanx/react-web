import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Redirect: React.FC = () => {
  useEffect(() => {
    console.log('经过redict');
  }, []);
  return <Navigate to="/index" />;
};
export default Redirect;

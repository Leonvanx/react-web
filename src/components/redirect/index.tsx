import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Redirect: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log('经过redict');
    navigate('/login');
  }, [navigate]);
  return null;
};
export default Redirect;

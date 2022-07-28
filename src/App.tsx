import { useRoutes } from 'react-router-dom';
import { routeConfig } from './routers';

const App: React.FC = () => {
  const element = useRoutes(routeConfig);
  return element;
};

export default App;

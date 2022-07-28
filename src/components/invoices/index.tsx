import { Outlet } from 'react-router-dom';

const Invoices = () => {
  return (
    <div>
      <h1>Invoices</h1>
      <Outlet />
    </div>
  );
};
export default Invoices;

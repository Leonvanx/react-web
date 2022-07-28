import { useParams } from 'react-router-dom';

const Invoice = () => {
  const { invoiceId } = useParams();
  return <h1>Invoice {invoiceId}</h1>;
};
export default Invoice;

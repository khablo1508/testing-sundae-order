import Options from './Options';
import Button from 'react-bootstrap/Button';
import { useOrderDetails } from '../../contexts/OrderDetails';

export default function OrderEntry({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();

  function handleClick() {
    setOrderPhase('review');
  }
  return (
    <div>
      <h1>Design Your Sundae!</h1>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button
        disabled={orderDetails.totals.scoops === '$0.00' ? true : false}
        onClick={handleClick}
      >
        Submit order
      </Button>
    </div>
  );
}

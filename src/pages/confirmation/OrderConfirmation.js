import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import AlertBanner from '../common/AlertBanner';
import { useOrderDetails } from '../../contexts/OrderDetails';

function OrderConfirmation({ setOrderPhase }) {
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);
  const [, , resetOrder] = useOrderDetails();

  // get order number from server
  useEffect(() => {
    axios
      .post(`http://localhost:3030/order`)
      .then((response) => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch((error) => setError(true));
  }, []);

  if (error) {
    return <AlertBanner />;
  }

  function handleClick() {
    // clear the details
    resetOrder();

    // set order phase
    setOrderPhase('inProgress');
  }

  if (orderNumber) {
    return (
      <>
        <span aria-labelledby='thankYou'>Thank you!</span>
        <h3>Your order number is {orderNumber}</h3>
        <h6>as per our terms and conditions, nothing will happen now</h6>
        <Button onClick={handleClick}> Create new order</Button>
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default OrderConfirmation;

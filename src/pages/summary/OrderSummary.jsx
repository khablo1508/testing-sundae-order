import { useOrderDetails } from '../../contexts/OrderDetails';
import SummaryForm from './SummaryForm';

function OrderSummary({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails();

  const scoopsArray = Array.from(orderDetails.scoops.entries());
  const scoopsList = scoopsArray.map(([key, value]) => (
    <li key={key}>
      {value} * {key}
    </li>
  ));

  const hasToppings = () => {
    if (orderDetails.totals.toppings === '$0.00') {
      return false;
    } else {
      return true;
    }
  };
  let toppingsDispay = null;

  if (hasToppings) {
    const toppingsArray = Array.from(orderDetails.toppings.entries());
    const toppingsList = toppingsArray.map((key) => (
      <li key={key}>{key.slice(0, -1)}</li>
    ));

    toppingsDispay = (
      <>
        <h4>Toppings: {orderDetails.totals.toppings}</h4>
        <ul>{toppingsList}</ul>
      </>
    );
  }

  return (
    <>
      <h2>Order Summary</h2>
      <section>
        <h4>Scoops: {orderDetails.totals.scoops}</h4>
        <ul>{scoopsList}</ul>
      </section>
      <section>{toppingsDispay}</section>
      <h4>Total: {orderDetails.totals.grandTotal}</h4>
      <SummaryForm setOrderPhase={setOrderPhase} />
    </>
  );
}

export default OrderSummary;

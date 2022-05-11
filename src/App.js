import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import OrderEntry from './pages/entry/OrderEntry';
import OrderSummary from './pages/summary/OrderSummary';
import OrderConfirmation from './pages/confirmation/OrderConfirmation';
import { OrderDetailsProvider } from './contexts/OrderDetails';

function App() {
  const [orderPhase, setOrderPhase] = useState('inProgress');

  let Component = OrderEntry; //OrderEntry by default

  if (orderPhase === 'inProgress') {
    Component = OrderEntry;
  } else if (orderPhase === 'review') {
    Component = OrderSummary;
  } else {
    Component = OrderConfirmation;
  }

  return (
    <OrderDetailsProvider>
      <Container>
        <Component setOrderPhase={setOrderPhase} />
      </Container>
    </OrderDetailsProvider>
  );
}

export default App;

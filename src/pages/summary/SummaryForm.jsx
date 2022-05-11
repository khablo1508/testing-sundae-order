import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

function SummaryForm({ setOrderPhase }) {
  const [cbChecked, setCbChecked] = useState(false);

  const popover = (
    <Popover id='popover-basic'>
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement='right' overlay={popover}>
        <span style={{ color: 'blue' }}>Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderPhase('completed');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='terms-and-conditions'>
        <Form.Check
          type='checkbox'
          checked={cbChecked}
          onChange={(e) => setCbChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant='primary' type='submit' disabled={!cbChecked}>
        Confirm order
      </Button>
    </Form>
  );
}
export default SummaryForm;

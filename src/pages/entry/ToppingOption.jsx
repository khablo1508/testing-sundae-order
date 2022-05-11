import { Col, Form, Row } from 'react-bootstrap';

function ToppingOption({ name, imagePath, updateItemCount }) {
  return (
    <Col xs={12} sm={4} md={3} lg={2} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
      <Form.Group controlId={`${name}-count`}>
        <Form.Check
          type='checkbox'
          label={name}
          onChange={(e) => {
            updateItemCount(name, e.target.checked ? 1 : 0);
          }}
        />
      </Form.Group>
    </Col>
  );
}

export default ToppingOption;

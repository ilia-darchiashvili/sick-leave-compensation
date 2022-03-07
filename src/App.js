
import Calculator from './components/Calculator';
import Content from './components/Content';
import { Col, Container, Row } from 'react-bootstrap';
import './components/Calculator'
import './App.scss';

const App = () => {
  return (
    <Container className='main-wrapper'>
        <Row>
            <Col lg={8} md={12}>
                <Content />
            </Col>
            <Col lg={4} md={12} className='calculator-column'>
                <Calculator />
            </Col>
        </Row>
    </Container>
  );
}

export default App;

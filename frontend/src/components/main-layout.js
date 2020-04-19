import React from 'react';
import {Container, Row, Col} from 'reactstrap';
import Navbar from '../components/navbar';
import VisitForm from '../container/visit-form';
import VisitBanner from '../components/visit-banner';

import 'bootstrap';

const mainLayout = () => (
  <Container>
  <Row>
    <Col>
      <Navbar />
    </Col>
  </Row>
  <Row>
    <Col>
      <VisitBanner/>
    </Col>
  </Row>
  <Row>
  <Col>
        <VisitForm />
  </Col>
  </Row>
</Container>
);

export default mainLayout;
'use client'

import 'bootstrap/dist/css/bootstrap.css'
import { Col, Container, Row } from 'react-bootstrap'
import DeployEscrowForm from './components/DeployEscrowForm'


export default function Home() {
  return (
    <main>
      <Container>
        <h1>Escrow App</h1>
        <Row>
          <Col>
            <DeployEscrowForm />
          </Col>
          <Col>
          {/* here the deployed contracts */}
          </Col>
        </Row>
      </Container>
    </main>
  )
}

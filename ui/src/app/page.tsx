'use client'

import 'bootstrap/dist/css/bootstrap.css'
import { Col, Container, Row } from 'react-bootstrap'
import DeployEscrowForm from './components/DeployEscrowForm'
import EscrowList from './components/EscrowList'
import { ConnectButton } from '@rainbow-me/rainbowkit'


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
            <EscrowList />
          </Col>
          <Col>
            <ConnectButton/>
          </Col>
        </Row>
      </Container>
    </main>
  )
}

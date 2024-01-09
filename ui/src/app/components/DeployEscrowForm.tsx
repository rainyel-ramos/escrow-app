import { createTsForm } from "@ts-react/form";
import { z } from "zod";
import AddressField from "./AddressField";
import AmountField from "./AmountField";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { AddressSchema } from "../schemas/inputSchemas/addressSchema";
import { EscrowSchema } from "../schemas/formSchemas/escrowSchema";

// create the mapping
const mapping = [
  [AddressSchema, AddressField] as const,
  [z.number(), AmountField] as const,
] as const; // 👈 `as const` is necessary

// A typesafe React component
export const BaseDeployEscrowForm = createTsForm(mapping);

export default function DeployEscrowForm() {
  function onSubmit(data: z.infer<typeof EscrowSchema>) {
    // gets typesafe data when form is submitted
  }

  return (
    <BaseDeployEscrowForm
      schema={EscrowSchema}
      onSubmit={onSubmit}
      // renderAfter={() => }
      props={{
        beneficiary: {label: 'Beneficiary'},
        arbiter: {label: 'Arbiter'},
        amount: {},
      }}
    >
      {({ arbiter, beneficiary, amount }) => {
        return (
          <Container>
            <Form.Group>
              <Row>
                <Col>
                  {arbiter}
                </Col>
              </Row>
              <Row>
                <Col>
                  {beneficiary}
                </Col>
              </Row>
              <Row>
                <Col>
                  {amount}
                </Col>
              </Row>
            </Form.Group>
            <Button variant="primary" type='submit'>Deploy</Button>
          </Container>
        );
      }}
    </BaseDeployEscrowForm>
  );
}
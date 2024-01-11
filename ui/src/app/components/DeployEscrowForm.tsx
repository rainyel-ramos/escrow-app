import { createTsForm } from "@ts-react/form";
import { z } from "zod";
import AddressField from "./AddressField";
import AmountField from "./AmountField";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { AddressSchema } from "../schemas/inputSchemas/addressSchema";
import { EscrowSchema } from "../schemas/formSchemas/escrowSchema";
import {approve} from '@/utils/randomUtils';
import deploy from '@/utils/deploy';
import { useEthersSigner } from "@/utils/hooks";
import {ethers} from 'ethers';


// create the mapping
const mapping = [
  [AddressSchema, AddressField] as const,
  [z.number(), AmountField] as const,
] as const; // 👈 `as const` is necessary

// A typesafe React component
export const BaseDeployEscrowForm = createTsForm(mapping);

export default function DeployEscrowForm() {
  const signer = useEthersSigner();

  async function onSubmit(data: z.infer<typeof EscrowSchema>) {
    // gets typesafe data when form is submitted
    const beneficiary = data.beneficiary;
    const arbiter = data.arbiter;
    const value = ethers.toBigInt(data.amount);
    const escrowContract = await deploy(signer, arbiter, beneficiary, value);
    const escrowContractAddress = await escrowContract.getAddress();

    const escrow = {
      address: escrowContractAddress,
      arbiter,
      beneficiary,
      value: value.toString(),
      handleApprove: async () => {
        escrowContract.on('Approved', () => {
          document.getElementById(escrowContract.address).className =
            'complete';
          document.getElementById(escrowContract.address).innerText =
            "✓ It's been approved!";
        });
        await approve(escrowContract, signer);
      },
    };
    //TODO - use a redux store to store the escrows
    setEscrows([...escrows, escrow]);
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
            <Form.Group className="mb-3">
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
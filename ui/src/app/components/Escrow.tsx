import { useEthersSigner } from '@/utils/hooks';
import { approve } from '@/utils/randomUtils';
import { BasicEscrow } from '@/utils/types';
import { useContractEvent } from 'wagmi';
import EscrowAbi from '@/artifacts/contracts/Escrow.sol/Escrow.json';
import { Button, ListGroup } from 'react-bootstrap';


export interface EscrowProps {
    escrowProperties: BasicEscrow;
}

export default function Escrow({ escrowProperties }: EscrowProps) {
    const signer = useEthersSigner();
    const unwatch = useContractEvent({
        address: escrowProperties.address,
        abi: EscrowAbi.abi,
        eventName: 'Approved',
        listener(log) {
            console.log(log)
            //TODO - here change the status of the contract component
            unwatch?.();
        },
    })
    async function handleApprove() {
        await approve(signer, escrowProperties.address);
    }

    return (
        <ListGroup>
            <ListGroup.Item>Arbiter: {escrowProperties.arbiter}</ListGroup.Item>
            <ListGroup.Item>Beneficiary: {escrowProperties.beneficiary}</ListGroup.Item>
            <ListGroup.Item>Value: {escrowProperties.value}</ListGroup.Item>
            <Button variant="primary" onClick={handleApprove}>Approve</Button>
        </ListGroup>
    );
}

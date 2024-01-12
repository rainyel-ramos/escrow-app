import { useEthersSigner } from '@/utils/hooks';
import { approve } from '@/utils/randomUtils';
import { BasicEscrow } from '@/utils/types';
import { useContractEvent } from 'wagmi';
import EscrowAbi from '@/artifacts/contracts/Escrow.sol/Escrow.json';


export interface EscrowProps {
    escrowProperties: BasicEscrow;
}

export default function Escrow({escrowProperties}: EscrowProps) {
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
        <div className="existing-contract">
            <ul className="fields">
                <li>
                    <div> Arbiter </div>
                    <div> {escrowProperties.arbiter} </div>
                </li>
                <li>
                    <div> Beneficiary </div>
                    <div> {escrowProperties.beneficiary} </div>
                </li>
                <li>
                    <div> Value </div>
                    <div> {escrowProperties.value} </div>
                </li>
                <div
                    className="button"
                    id={escrowProperties.address}
                    onClick={(e) => {
                        e.preventDefault();

                        handleApprove();
                    }}
                >
                    Approve
                </div>
            </ul>
        </div>
    );
}

import { Escrow } from '@/typechain';
import { useEthersSigner } from '@/utils/hooks';
import { approve } from '@/utils/randomUtils';
import { BasicEscrow } from '@/utils/types';
import { useState } from 'react';


export interface EscrowProps {
    escrowContract: Escrow;
    escrowProperties: BasicEscrow;
}

export default function Escrow({escrowContract, escrowProperties}: EscrowProps) {
    const signer = useEthersSigner();
    const [data, setData] = useState<BasicEscrow>();

    async function handleApprove() {
        //TODO - here add some value to change from not approved to approved
        escrowContract.on(escrowContract.getEvent('Approved'), () => {
            document.getElementById(escrowContract.address).className =
                'complete';
            document.getElementById(escrowContract.address).innerText =
                "✓ It's been approved!";
        });
        await approve(escrowContract, signer);
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

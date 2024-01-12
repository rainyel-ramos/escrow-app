export interface BasicEscrow {
    address: `0x${string}`;
    arbiter: string;
    beneficiary: string;
    value: string;
    isApproved: boolean;
}
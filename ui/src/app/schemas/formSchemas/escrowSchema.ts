import { z } from "zod";
import { AddressSchema } from "../inputSchemas/addressSchema";

export const EscrowSchema = z.object({
    arbiter: AddressSchema, // renders TextField
    beneficiary: AddressSchema,
    amount: z.number(), // renders TextField
});
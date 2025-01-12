import { z } from "zod";

export const CheckoutSchema = z.object({
  customerName: z.string().min(1),
  email: z.string().email().min(1),
  phoneNumber: z.string().min(1),
  province: z.string().min(1),
  district: z.string().min(1),
  ward: z.string().min(1),
  address: z.string(),
});

export type CheckoutSchemaType = z.infer<typeof CheckoutSchema>;

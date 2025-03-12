import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const providerSchema = z.object({
  id: z.number(),
  name: z.string(),
  avatar: z.string(),
  sector: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  whatsapp: z.string(),
  rating: z.number(),
  status: z.string(),
  specialityId: z.number(),
  specialityName: z.string(),
  identityDocument: z.string(),
  verificationDocument: z.string(),
  location: z.string(),
  description: z.string(),
})

export type Provider = z.infer<typeof providerSchema>

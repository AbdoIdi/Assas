import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const companySchema = z.object({
  id: z.number(),
  name: z.string(),
  phone: z.string(),
  image: z.string(),
  place: z.string(),
  email: z.string(),
  adsPages: z.string()
})

export type Company = z.infer<typeof companySchema>

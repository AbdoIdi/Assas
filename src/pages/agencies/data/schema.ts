import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const chequebookSchema = z.object({
  rib: z.string(),
  ownerName: z.string(),
  numChequebook: z.number(),
  numFirstCheque: z.number(),
  numLastCheque: z.number(),
  createdAt: z.string().datetime(),
  pagesToGenerate: z.array(z.number())
})

export type Chequebook = z.infer<typeof chequebookSchema>

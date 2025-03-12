import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const chequebookSchema = z.object({
  id: z.number(),
  name: z.string(),
  chief: z.string(),
  phone: z.string(),
  image: z.string(),
  place: z.string(),
  email: z.string(),
  matricule: z.string()
})

export type Chequebook = z.infer<typeof chequebookSchema>

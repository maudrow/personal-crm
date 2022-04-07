export type DbContact = {
  id: string
} & Contact

export type Contact = {
  name: string
  email?: string
  phone?: string
  address?: string
  note_ids?: string[]
}

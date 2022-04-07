export type DbNote = {
  id: string
  user_id: string
} & Note

export type Note = {
  text: string
  tags?: string[]
}

import type {User} from '@supabase/supabase-js'
import {useEffect, useState} from 'react'
import {supabase} from '../utils/supabase-client'
import type {DbContact} from './__types__/Contact'
import type {DbNote, Note} from './__types__/Note'

export default function ContactEntry({
  user,
  contact,
  setErrorText,
  deleteContact,
}: {
  user: User
  contact: DbContact
  setErrorText: (text: string) => void
  deleteContact: (id: string) => void
}) {
  const [loading, setLoading] = useState(true)
  const [notes, setNotes] = useState<DbNote[]>([])
  const [noteText, setNoteText] = useState('')

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true)

        const {
          data: notes_,
          error,
          status,
        } = await supabase
          .from('notes')
          .select('*')
          .eq('user_id', user.id)
          .eq('contact_id', contact.id)
          .order('id', { ascending: true })

        if (error && status !== 406) {
          throw error
        }
        setNotes(notes_ || [])
      } catch (error) {
        setErrorText((error as Error).message)
      } finally {
        setLoading(false)
      }
    }
    fetchNotes()
  }, [contact.id, setErrorText, user.id])

  const addNote = async (note: Note) => {
    const {data, error} = await supabase
      .from('notes')
      .insert({...note, user_id: user.id, contact_id: contact.id})
      .single()
    if (error) {
      setErrorText(error.message)
    } else {
      setNotes([...notes, data])
    }
  }

  const deleteNote = async (id: string) => {
    try {
      await supabase.from('notes').delete().eq('id', id)
      setNotes(notes.filter((note) => note.id !== id))
    } catch (error) {
      setErrorText((error as Error).message)
    }
  }

  return (
    <>
      <div className="w-1/2 md:w-1/3 p-2">
        <div className="bg-gray-200 rounded-lg shadow-md p-4">
          <div className="flex flex-row">
            <div className="flex-1">
              <h3>{contact.name}</h3>
              <p>{contact.email}</p>
              <p>{contact.phone}</p>
              <p>{contact.address}</p>
              {loading && <div>Loading...</div>}
              {notes.map((note) => (
                <div key={note.id}>
                  <span>{note.text}</span>
                  {' - '}
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete Note
                  </button>
                </div>
              ))}
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault()
                addNote({
                  text: noteText,
                })
              }}
            >
              <div>
                <input
                  className="inputField"
                  type="text"
                  placeholder="Note"
                  value={noteText}
                  onChange={(event) => setNoteText(event.target.value)}
                  required
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Add Note
                </button>
              </div>
            </form>
            <div></div>
            <div className="flex-1">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => deleteContact(contact.id)}
              >
                Delete Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

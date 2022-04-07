import type {User} from '@supabase/supabase-js'
import {useEffect, useState} from 'react'
import {supabase} from '../utils/supabase-client'
import ContactEntry from './ContactEntry'
import type {Contact as ContactType, DbContact} from './__types__/Contact'

export default function Contact({user}: {user: User}) {
  if (!user) {
    throw new Error('User not found')
  }

  const [loading, setLoading] = useState(true)
  const [contacts, setContacts] = useState<DbContact[]>([])
  const [errorText, setErrorText] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true)

        const {
          data: contacts,
          error,
          status,
        } = await supabase
          .from('contacts')
          // .select('name, email, phone, address')
          .select('*')
          .eq('user_id', user.id)
          .order('id', { ascending: true })

        if (error && status !== 406) {
          throw error
        }
        setContacts(contacts || [])
      } catch (error) {
        setErrorText((error as Error).message)
      } finally {
        console.log('should stop loading')
        setLoading(false)
      }
    }
    fetchContacts()
  }, [user.id])

  const addContact = async (contact: ContactType) => {
    const {data, error} = await supabase
      .from('contacts')
      .insert({...contact, user_id: user.id})
      .single()
    if (error) {
      setErrorText(error.message)
    } else {
      setContacts([...contacts, data])
    }
  }
  const deleteContact = async (id: string) => {
    try {
      await supabase.from('contacts').delete().eq('id', id)
      setContacts(contacts.filter((contact) => contact.id !== id))
    } catch (error) {
      setErrorText((error as Error).message)
    }
  }

  return (
    <>
      <h1>Contacts</h1>
      <div className="flex flex-row flex-wrap">
        {loading && <div>Loading...</div>}
        {errorText && <div>{errorText}</div>}
        {contacts.map((contact) => (
          <ContactEntry
            key={contact.id}
            user={user}
            contact={contact}
            setErrorText={setErrorText}
            deleteContact={deleteContact}
          />
        ))}
      </div>
      <div className="flex flex-row flex-wrap">
        <div className="w-1/2 md:w-1/3 p-2">
          <div className="bg-gray-200 rounded-lg shadow-md p-4">
            <div className="flex flex-row">
              <div className="flex-1">
                <h3>Add Contact</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    addContact({
                      name,
                      email,
                      phone,
                      address,
                    })
                  }}
                >
                  <div>
                    <input
                      className="inputField"
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <input
                      className="inputField"
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      className="inputField"
                      type="text"
                      placeholder="Phone"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      className="inputField"
                      type="text"
                      placeholder="Address"
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      type="submit"
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

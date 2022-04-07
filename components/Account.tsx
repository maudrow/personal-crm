import type {Session} from '@supabase/supabase-js'
import {useEffect, useState} from 'react'
import {supabase} from '../utils/supabase-client'
import Avatar from './Avatar'
import Contact from './Contact'

export default function Account({session}: {session: Session}) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState<string>('')
  const [website, setWebsite] = useState('')
  const [avatar_url, setAvatarUrl] = useState('')

  const user = supabase.auth.user()

  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true)

        const {data, error, status} = await supabase
          .from('profiles')
          .select(`username, website, avatar_url`)
          .eq('id', user?.id)
          .single()

        if (error && status !== 406) {
          throw error
        }

        if (data) {
          setUsername(data.username)
          setWebsite(data.website)
          setAvatarUrl(data.avatar_url)
        }
      } catch (error) {
        alert((error as Error).message)
      } finally {
        setLoading(false)
      }
    }
    getProfile()
  }, [session, user?.id])

  if (!user) {
    throw new Error('User not found')
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string
    website: string
    avatar_url: string
  }) {
    try {
      setLoading(true)
      const user = supabase.auth.user()
      if (!user) {
        throw new Error('User not found')
      }

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      }

      const {error} = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })

      if (error) {
        throw error
      }
    } catch (error) {
      alert((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-widget">
      <Avatar
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url)
          updateProfile({username, website, avatar_url: url})
        }}
      />
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user?.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="website"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button block primary"
          onClick={() => updateProfile({username, website, avatar_url})}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button
          className="button block"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
      <Contact user={user} />
    </div>
  )
}

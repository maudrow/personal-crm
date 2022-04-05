import type {Session} from '@supabase/supabase-js'
import {useEffect, useState} from 'react'
import Account from '../components/Account'
import Auth from '../components/Auth'
import {supabase} from '../utils/supabase-client'

export default function Home() {
  const [session, setSession] = useState<Session | null>()

  useEffect(() => {
    const session = supabase.auth.session()
    setSession(session)

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="container" style={{padding: '50px 0 100px 0'}}>
      {!session ? (
        <Auth />
      ) : (
        <Account key={session.user?.id} session={session} />
      )}
    </div>
  )
}

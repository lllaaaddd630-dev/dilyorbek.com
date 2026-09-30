import { useState } from 'react'
import { profile } from '../data/profile'

export default function Avatar() {
  const [failed, setFailed] = useState(false)
  return <div className="avatar-outer"><div className="avatar-ring"><div className="avatar-inner">{!failed ? <img src={profile.avatar} alt={`Portrait of ${profile.name}`} onError={() => setFailed(true)} /> : <span className="avatar-fallback" aria-label={`${profile.name} portrait placeholder`}>{profile.name.charAt(0)}</span>}</div></div></div>
}

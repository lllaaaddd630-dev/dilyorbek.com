import { useState } from 'react'

export default function WinterCover({ cover, className = '', alt = '', variant = 0 }) {
  const [failed, setFailed] = useState(false)
  return <div className={`winter-cover cover-${variant % 3} ${className}`}>{cover && !failed ? <img src={cover} alt={alt} loading="lazy" onError={() => setFailed(true)} /> : <div className="cover-landscape" aria-hidden="true"><span className="cover-moon" /><span className="cover-ridge ridge-back" /><span className="cover-ridge ridge-front" /></div>}</div>
}

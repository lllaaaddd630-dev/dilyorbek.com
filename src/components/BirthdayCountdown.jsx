import { useEffect, useState } from 'react'
import { ArrowUpRight, CalendarDays } from 'lucide-react'
import { profile } from '../data/profile'
import { getBirthdayState } from '../utils/birthday'

export default function BirthdayCountdown() {
  const [remaining, setRemaining] = useState(() => getBirthdayState(profile.birthDate))
  useEffect(() => {
    const timer = setInterval(() => setRemaining(getBirthdayState(profile.birthDate)), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className={`birthday-section section-shell ${remaining.today ? 'celebrating' : ''}`} id="birthday">
      <div className="section-heading">
        <div><span className="kicker"><span className="kicker-line" /> THE NEXT CHAPTER</span><h2>A day worth <em>waiting for.</em></h2></div>
        <span className="section-aside"><CalendarDays size={16} /> 08 DECEMBER · TASHKENT TIME</span>
      </div>
      {remaining.today ? (
        <div className="birthday-greeting"><span className="greeting-spark" /><p>THE DAY IS HERE</p><h3>Today is {profile.name}’s birthday.</h3><span>Here’s to everything that comes next.</span></div>
      ) : (
        <div className="countdown-grid" role="timer" aria-label={`${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes and ${remaining.seconds} seconds until ${profile.name}'s birthday`}>
          {['days', 'hours', 'minutes', 'seconds'].map((unit, index) => <div className="countdown-tile" key={unit}><span className="tile-index">0{index + 1} / 04</span><strong>{String(remaining[unit]).padStart(2, '0')}</strong><span className="tile-unit">{unit.toUpperCase()}</span></div>)}
        </div>
      )}
      <div className="birthday-note"><span>Until the next chapter...</span><span>Born in {profile.birthYear} <ArrowUpRight size={15} /></span></div>
    </section>
  )
}

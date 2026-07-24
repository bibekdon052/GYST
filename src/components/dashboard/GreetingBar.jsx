import { useDashboardStore } from '../../store/dashboardStore'

export function GreetingBar({ user }) {
  const { state } = useDashboardStore()
  const displayName = state.appearance?.displayName?.trim()

  const now = new Date()
  const hour = now.getHours()
  const dayOfWeek = now.getDay()
  const dayOfYear = Math.floor(
    (now - new Date(now.getFullYear(), 0, 0)) / 86400000
  )

  // Name: custom override > email first name > fallback
  let name = displayName
  if (!name) {
    const email = user?.email || ''
    const localPart = email.split('@')[0] || 'there'
    const firstName = localPart.split('.')[0]
    name = firstName.charAt(0).toUpperCase() + firstName.slice(1)
  }

  // Time-based greeting
  let greeting = ''
  let greetingEmoji = ''
  if (hour >= 5 && hour < 12) {
    greeting = 'Good morning'
    greetingEmoji = dayOfYear % 2 === 0 ? '🌅' : '☀️'
  } else if (hour >= 12 && hour < 17) {
    greeting = 'Good arvo'
    greetingEmoji = '☀️'
  } else if (hour >= 17 && hour < 21) {
    greeting = 'Good evening'
    greetingEmoji = '🌆'
  } else {
    greeting = 'Hey night owl,'
    greetingEmoji = '🌙'
  }

  const DAY_MESSAGES = {
    0: ['Recharge day! Rest, reflect, reset 🌿', 'Sunday vibes — take it slow 😌'],
    1: ['New week, fresh start. Let\'s get it! 🚀', 'Making Mondays matter 💪'],
    2: ['Tuesday energy activated ⚡', 'Tuesdays are underrated 🔥'],
    3: ['Midweek! You\'re halfway there 🎯', 'Midweek momentum — keep it going 💫'],
    4: ['Almost Friday! One more push 💪', 'Thursday hustle mode 🏃'],
    5: ['TGIF! Finish strong, enjoy the weekend 🎉', 'Friday feeling 🥳'],
    6: ['Weekend mode: ON 🎊', 'Enjoy your Saturday ☀️'],
  }

  const messages = DAY_MESSAGES[dayOfWeek] || DAY_MESSAGES[0]
  const subMessage = messages[dayOfYear % messages.length]

  const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const dayName = DAY_NAMES[dayOfWeek]

  return (
    <div className="px-6 py-5">
      <h1 className="text-2xl font-bold text-text">
        {greeting}, {name}! {greetingEmoji}
      </h1>
      <p className="text-sm text-muted mt-1">
        {dayName} — {subMessage}
      </p>
    </div>
  )
}

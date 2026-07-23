export function GreetingBar({ user }) {
  const now = new Date()
  const hour = now.getHours()
  const dayOfWeek = now.getDay() // 0 = Sunday
  const dayOfYear = Math.floor(
    (now - new Date(now.getFullYear(), 0, 0)) / 86400000
  )

  // Extract first name from email
  const email = user?.email || ''
  const localPart = email.split('@')[0] || 'there'
  const firstName = localPart.split('.')[0]
  const name = firstName.charAt(0).toUpperCase() + firstName.slice(1)

  // Time-based greeting
  let greeting = ''
  let greetingEmoji = ''
  if (hour >= 5 && hour < 12) {
    greeting = 'Good morning'
    greetingEmoji = dayOfYear % 2 === 0 ? '🌅' : '☀️'
  } else if (hour >= 12 && hour < 17) {
    greeting = 'Good afternoon'
    greetingEmoji = '☀️'
  } else if (hour >= 17 && hour < 21) {
    greeting = 'Good evening'
    greetingEmoji = '🌆'
  } else {
    greeting = 'Hey night owl,'
    greetingEmoji = '🌙'
  }

  // Day-specific sub-messages
  const DAY_MESSAGES = {
    0: [ // Sunday
      'Recharge day! Rest, reflect, reset 🌿',
      'Sunday vibes 😊',
    ],
    1: [ // Monday
      'New week, fresh start. Let\'s get it! 🚀',
      'Making Mondays matter 💪',
    ],
    2: [ // Tuesday
      'Tuesday energy activated ⚡',
      'Tuesdays are underrated 🔥',
    ],
    3: [ // Wednesday
      'Midweek champion! You\'re halfway there 🎯',
      'Midweek momentum — keep it going 💫',
    ],
    4: [ // Thursday
      'Almost there! One more push 💪',
      'Thursday hustle mode on 🏃',
    ],
    5: [ // Friday
      'TGIF! Finish strong then enjoy the weekend 🎉',
      'Friday feeling 🥳',
    ],
    6: [ // Saturday
      'Weekend mode: ON 🎊',
      'Enjoy your Saturday ☀️',
    ],
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

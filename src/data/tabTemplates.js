export const TAB_TEMPLATES = [
  {
    id: 'banking-finance',
    name: 'Banking & Finance',
    icon: '🏦',
    description: 'Banks, payments, and tax portals in one place',
    color: 'from-emerald-500 to-green-600',
    categories: [
      {
        name: 'Australian Banks',
        icon: '🏦',
        platformIds: ['commbank', 'anz', 'nab', 'westpac', 'ing', 'up-bank', 'bendigo-bank', 'macquarie'],
      },
      {
        name: 'Payments & Transfers',
        icon: '💳',
        platformIds: ['paypal', 'afterpay', 'zip-pay', 'splitwise', 'wise', 'revolut'],
      },
      {
        name: 'Tax & Business',
        icon: '📊',
        platformIds: ['ato-online', 'mytax', 'mygov', 'asic-connect', 'abn-lookup', 'asic'],
      },
    ],
  },
  {
    id: 'government-services',
    name: 'Government Services',
    icon: '🏛️',
    description: 'Federal and state government portals',
    color: 'from-blue-500 to-blue-700',
    categories: [
      {
        name: 'Federal Services',
        icon: '🇦🇺',
        platformIds: ['mygov', 'ato-online', 'medicare', 'centrelink', 'services-australia', 'mytax'],
      },
      {
        name: 'State & Local',
        icon: '🗺️',
        platformIds: ['vicroads', 'service-nsw', 'service-qld', 'sa-gov', 'access-canberra'],
      },
      {
        name: 'Rights & Safety',
        icon: '⚖️',
        platformIds: ['fair-work', 'safe-work', 'smartraveller'],
      },
    ],
  },
  {
    id: 'health-wellbeing',
    name: 'Health & Wellbeing',
    icon: '🏥',
    description: 'Healthcare, insurance, and mental health support',
    color: 'from-rose-500 to-pink-600',
    categories: [
      {
        name: 'Health Insurance',
        icon: '🛡️',
        platformIds: ['medibank', 'bupa', 'hcf', 'nib'],
      },
      {
        name: 'Government Health',
        icon: '🩺',
        platformIds: ['mygov', 'medicare', 'ndis', 'dva'],
      },
      {
        name: 'Mental Wellbeing',
        icon: '🧠',
        platformIds: ['headspace', 'black-dog', 'lifeline'],
      },
    ],
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: '🎬',
    description: 'Streaming, music, and gaming all in one tab',
    color: 'from-purple-500 to-violet-600',
    categories: [
      {
        name: 'Australian Streaming',
        icon: '📺',
        platformIds: ['abc-iview', 'sbs-ondemand', 'binge', 'stan', 'kayo'],
      },
      {
        name: 'Global Streaming',
        icon: '🌍',
        platformIds: ['netflix', 'disney-plus', 'amazon-prime-video', 'paramount-plus'],
      },
      {
        name: 'Music & Audio',
        icon: '🎵',
        platformIds: ['spotify', 'apple-music', 'youtube-music', 'audible'],
      },
    ],
  },
  {
    id: 'shopping',
    name: 'Shopping',
    icon: '🛒',
    description: 'Online retail, groceries, and home goods',
    color: 'from-orange-500 to-amber-600',
    categories: [
      {
        name: 'Online Shopping',
        icon: '🛍️',
        platformIds: ['amazon-au', 'ebay-au', 'kmart', 'big-w', 'catch', 'myer', 'david-jones'],
      },
      {
        name: 'Groceries & Food',
        icon: '🥦',
        platformIds: ['woolworths', 'coles', 'uber-eats', 'doordash', 'menulog'],
      },
      {
        name: 'Home & Hardware',
        icon: '🔧',
        platformIds: ['bunnings', 'ikea-au', 'jb-hifi', 'harvey-norman'],
      },
    ],
  },
  {
    id: 'news-media',
    name: 'News & Media',
    icon: '📰',
    description: 'Australian and world news at a glance',
    color: 'from-slate-500 to-gray-600',
    categories: [
      {
        name: 'Australian News',
        icon: '🇦🇺',
        platformIds: ['abc-news', 'guardian-au', 'the-age', 'smh', 'herald-sun'],
      },
      {
        name: 'Broadcast & Video',
        icon: '📡',
        platformIds: ['9news', '7news', 'sky-news', 'abc-iview', 'sbs-ondemand'],
      },
      {
        name: 'Opinion & Analysis',
        icon: '💬',
        platformIds: ['crikey', 'saturday-paper', 'pedestrian', 'junkee', 'the-australian'],
      },
    ],
  },
  {
    id: 'social-community',
    name: 'Social & Community',
    icon: '📱',
    description: 'Social networks, messaging, and community',
    color: 'from-pink-500 to-rose-600',
    categories: [
      {
        name: 'Social Networks',
        icon: '🌐',
        platformIds: ['facebook', 'instagram', 'twitter-x', 'linkedin', 'tiktok', 'snapchat'],
      },
      {
        name: 'Messaging',
        icon: '💬',
        platformIds: ['whatsapp', 'signal', 'telegram', 'discord', 'messenger'],
      },
      {
        name: 'Content & Video',
        icon: '🎨',
        platformIds: ['youtube', 'reddit', 'pinterest', 'twitch'],
      },
    ],
  },
  {
    id: 'transport-travel',
    name: 'Transport & Travel',
    icon: '✈️',
    description: 'Public transport, rideshare, and travel planning',
    color: 'from-cyan-500 to-sky-600',
    categories: [
      {
        name: 'Public Transport',
        icon: '🚌',
        platformIds: ['myki', 'opal', 'go-card', 'metrocard', 'smartrider'],
      },
      {
        name: 'Rideshare & Maps',
        icon: '🗺️',
        platformIds: ['uber', 'didi', 'google-maps', 'waze', 'apple-maps'],
      },
      {
        name: 'Flights & Stays',
        icon: '✈️',
        platformIds: ['qantas', 'virgin-australia', 'jetstar', 'booking', 'airbnb', 'tripadvisor'],
      },
    ],
  },
  {
    id: 'home-lifestyle',
    name: 'Home & Lifestyle',
    icon: '🏠',
    description: 'Property, utilities, and household services',
    color: 'from-teal-500 to-emerald-600',
    categories: [
      {
        name: 'Property Search',
        icon: '🏡',
        platformIds: ['realestate', 'domain', 'homely', 'allhomes', 'corelogic'],
      },
      {
        name: 'Utilities & Bills',
        icon: '💡',
        platformIds: ['origin', 'agl', 'energy-australia', 'optus', 'telstra', 'aussie-broadband', 'iinet'],
      },
      {
        name: 'Home Services',
        icon: '🔨',
        platformIds: ['airtasker', 'hipages', 'bunnings'],
      },
    ],
  },
  {
    id: 'developer-tools',
    name: 'Developer Tools',
    icon: '💻',
    description: 'Code hosting, cloud, CI/CD and dev platforms',
    color: 'from-indigo-500 to-violet-600',
    categories: [
      {
        name: 'Code & Repos',
        icon: '📂',
        platformIds: ['github', 'gitlab', 'bitbucket', 'vscode-web', 'stackoverflow', 'dev-to'],
      },
      {
        name: 'Cloud & DevOps',
        icon: '☁️',
        platformIds: ['aws-console', 'azure-portal', 'gcp-console', 'cloudflare', 'netlify', 'vercel', 'heroku', 'digitalocean'],
      },
      {
        name: 'Tools & Monitoring',
        icon: '🔧',
        platformIds: ['postman', 'figma', 'linear', 'sentry', 'docker-hub', 'firebase-console', 'npm'],
      },
    ],
  },
]

export const CATEGORY_TEMPLATES = [
  {
    id: 'cat-email-calendar',
    name: 'Email & Calendar',
    icon: '📧',
    description: 'Inbox and scheduling tools',
    platformIds: ['gmail', 'outlook', 'google-calendar', 'outlook-calendar', 'calendly'],
  },
  {
    id: 'cat-cloud-storage',
    name: 'Cloud Storage',
    icon: '☁️',
    description: 'File storage and sharing',
    platformIds: ['google-drive', 'onedrive', 'dropbox', 'icloud-drive', 'box'],
  },
  {
    id: 'cat-project-mgmt',
    name: 'Project Management',
    icon: '📋',
    description: 'Tasks, boards, and project tracking',
    platformIds: ['notion', 'trello', 'asana', 'monday', 'jira', 'clickup', 'basecamp'],
  },
  {
    id: 'cat-video-calls',
    name: 'Video Calls',
    icon: '📹',
    description: 'Meeting and collaboration',
    platformIds: ['zoom', 'google-meet', 'microsoft-teams', 'webex'],
  },
  {
    id: 'cat-banking-au',
    name: 'Australian Banks',
    icon: '🏦',
    description: 'Major Australian banking apps',
    platformIds: ['commbank', 'anz', 'nab', 'westpac', 'ing', 'up-bank'],
  },
  {
    id: 'cat-gov-portals',
    name: 'Government Portals',
    icon: '🏛️',
    description: 'Key Australian government services',
    platformIds: ['mygov', 'ato-online', 'medicare', 'centrelink', 'services-australia'],
  },
  {
    id: 'cat-news-au',
    name: 'Australian News',
    icon: '📰',
    description: 'Local and national news sources',
    platformIds: ['abc-news', 'guardian-au', 'the-age', 'smh', 'herald-sun'],
  },
  {
    id: 'cat-streaming-au',
    name: 'Aussie Streaming',
    icon: '📺',
    description: 'Free Australian streaming services',
    platformIds: ['abc-iview', 'sbs-ondemand', 'binge', 'stan', 'kayo'],
  },
  {
    id: 'cat-social',
    name: 'Social Essentials',
    icon: '📱',
    description: 'Most-used social platforms',
    platformIds: ['facebook', 'instagram', 'twitter-x', 'linkedin', 'youtube'],
  },
  {
    id: 'cat-food-delivery',
    name: 'Food & Delivery',
    icon: '🍕',
    description: 'Order food and groceries online',
    platformIds: ['uber-eats', 'doordash', 'menulog', 'woolworths', 'coles'],
  },
  {
    id: 'cat-mental-health',
    name: 'Mental Health',
    icon: '🧠',
    description: 'Support and wellbeing resources',
    platformIds: ['headspace', 'black-dog', 'lifeline'],
  },
  {
    id: 'cat-transport',
    name: 'Getting Around',
    icon: '🚌',
    description: 'Transport cards and rideshare',
    platformIds: ['myki', 'opal', 'go-card', 'uber', 'didi', 'google-maps'],
  },
]

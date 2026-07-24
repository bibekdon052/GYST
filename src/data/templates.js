// ─────────────────────────────────────────────────────────
// GYST Profession Templates
// ─────────────────────────────────────────────────────────

export const TEMPLATES = [
  {
    id: 'teacher',
    name: 'Teacher / Educator',
    icon: '🏫',
    description: 'Everything for classroom and school admin in one place',
    tabs: [
      {
        id: 'work',
        name: 'Work',
        icon: '💼',
        categories: [
          {
            id: 'school-systems',
            name: 'School Systems',
            icon: '🏫',
            platformIds: ['compass', 'cases21', 'google-classroom', 'canvas', 'moodle'],
          },
          {
            id: 'communication',
            name: 'Communication',
            icon: '💬',
            platformIds: ['microsoft-teams', 'outlook', 'gmail', 'zoom', 'google-meet'],
          },
          {
            id: 'documents',
            name: 'Documents',
            icon: '📂',
            platformIds: ['google-drive', 'onedrive', 'sharepoint', 'microsoft-365'],
          },
          {
            id: 'wellbeing',
            name: 'Wellbeing Resources',
            icon: '💚',
            platformIds: ['beyond-blue', 'headspace', 'lifeline'],
          },
        ],
      },
      {
        id: 'personal',
        name: 'Personal',
        icon: '🏠',
        categories: [
          {
            id: 'banking',
            name: 'Banking',
            icon: '🏦',
            platformIds: ['commonwealth-bank', 'anz', 'paypal', 'up-bank'],
          },
          {
            id: 'government',
            name: 'Government',
            icon: '🏛️',
            platformIds: ['mygov', 'ato-online', 'medicare', 'centrelink'],
          },
          {
            id: 'health',
            name: 'Health',
            icon: '🏥',
            platformIds: ['healthengine', 'hotdoc', 'myhealth-record', 'medibank'],
          },
        ],
      },
    ],
  },
  {
    id: 'developer',
    name: 'Software Developer',
    icon: '💻',
    description: 'Code, cloud, and collaboration tools for developers',
    tabs: [
      {
        id: 'dev',
        name: 'Dev',
        icon: '🔧',
        categories: [
          {
            id: 'code-hosting',
            name: 'Code & Version Control',
            icon: '🐙',
            platformIds: ['github', 'gitlab', 'bitbucket', 'vscode-web'],
          },
          {
            id: 'cloud',
            name: 'Cloud Platforms',
            icon: '☁️',
            platformIds: ['aws-console', 'azure-portal', 'gcp-console', 'cloudflare', 'vercel', 'netlify'],
          },
          {
            id: 'project-management',
            name: 'Project Management',
            icon: '📋',
            platformIds: ['jira', 'linear', 'github', 'notion', 'slack'],
          },
          {
            id: 'tools',
            name: 'Dev Tools',
            icon: '🛠️',
            platformIds: ['postman', 'docker-hub', 'sentry', 'firebase-console', 'stackoverflow'],
          },
        ],
      },
      {
        id: 'work',
        name: 'Work',
        icon: '💼',
        categories: [
          {
            id: 'comms',
            name: 'Communication',
            icon: '💬',
            platformIds: ['slack', 'microsoft-teams', 'zoom', 'discord'],
          },
          {
            id: 'docs',
            name: 'Docs & Wiki',
            icon: '📝',
            platformIds: ['notion', 'confluence', 'google-drive', 'github'],
          },
        ],
      },
      {
        id: 'personal',
        name: 'Personal',
        icon: '🏠',
        categories: [
          {
            id: 'banking',
            name: 'Banking',
            icon: '🏦',
            platformIds: ['commonwealth-bank', 'anz', 'up-bank', 'wise'],
          },
          {
            id: 'government',
            name: 'Government',
            icon: '🏛️',
            platformIds: ['mygov', 'ato-online', 'medicare'],
          },
        ],
      },
    ],
  },
  {
    id: 'healthcare',
    name: 'Healthcare Professional',
    icon: '🩺',
    description: 'Clinical portals, health records and government services',
    tabs: [
      {
        id: 'clinical',
        name: 'Clinical',
        icon: '🏥',
        categories: [
          {
            id: 'clinical-portals',
            name: 'Clinical Portals',
            icon: '🩺',
            platformIds: ['myhealth-record', 'hotdoc', 'healthengine', 'medicare'],
          },
          {
            id: 'communication',
            name: 'Communication',
            icon: '💬',
            platformIds: ['microsoft-teams', 'outlook', 'zoom', 'webex'],
          },
          {
            id: 'records',
            name: 'Records & Docs',
            icon: '📋',
            platformIds: ['sharepoint', 'onedrive', 'google-drive', 'adobe-acrobat'],
          },
        ],
      },
      {
        id: 'admin',
        name: 'Admin',
        icon: '📊',
        categories: [
          {
            id: 'government-health',
            name: 'Government Health',
            icon: '🏛️',
            platformIds: ['mygov', 'medicare', 'dva', 'ndis', 'safe-work'],
          },
          {
            id: 'insurance',
            name: 'Health Insurance',
            icon: '💊',
            platformIds: ['medibank', 'bupa', 'hcf', 'nib'],
          },
        ],
      },
      {
        id: 'personal',
        name: 'Personal',
        icon: '🏠',
        categories: [
          {
            id: 'banking',
            name: 'Banking',
            icon: '🏦',
            platformIds: ['commonwealth-bank', 'anz', 'paypal'],
          },
          {
            id: 'government',
            name: 'Government',
            icon: '🏛️',
            platformIds: ['mygov', 'ato-online', 'centrelink'],
          },
        ],
      },
    ],
  },
  {
    id: 'student',
    name: 'Student',
    icon: '🎒',
    description: 'Study tools, LMS portals, and university admissions',
    tabs: [
      {
        id: 'study',
        name: 'Study',
        icon: '📚',
        categories: [
          {
            id: 'lms',
            name: 'Learning Management',
            icon: '🎓',
            platformIds: ['canvas', 'blackboard', 'moodle', 'google-classroom'],
          },
          {
            id: 'study-tools',
            name: 'Study Tools',
            icon: '✏️',
            platformIds: ['notion', 'google-drive', 'youtube', 'khan-academy'],
          },
          {
            id: 'communication',
            name: 'Communication',
            icon: '💬',
            platformIds: ['outlook', 'gmail', 'microsoft-teams', 'discord'],
          },
        ],
      },
      {
        id: 'uni-apps',
        name: 'Uni Applications',
        icon: '🏛️',
        categories: [
          {
            id: 'admissions',
            name: 'Admissions Centres',
            icon: '📝',
            platformIds: ['vtac', 'uac', 'qtac', 'satac', 'tisc'],
          },
          {
            id: 'learning',
            name: 'Online Learning',
            icon: '🌍',
            platformIds: ['coursera', 'edx', 'udemy', 'linkedin-learning', 'duolingo'],
          },
        ],
      },
      {
        id: 'personal',
        name: 'Personal',
        icon: '🏠',
        categories: [
          {
            id: 'banking',
            name: 'Banking',
            icon: '🏦',
            platformIds: ['commonwealth-bank', 'anz', 'up-bank', 'afterpay'],
          },
          {
            id: 'government',
            name: 'Government',
            icon: '🏛️',
            platformIds: ['mygov', 'centrelink', 'ato-online'],
          },
          {
            id: 'entertainment',
            name: 'Entertainment',
            icon: '🎬',
            platformIds: ['netflix', 'spotify', 'youtube', 'discord'],
          },
        ],
      },
    ],
  },
  {
    id: 'manager',
    name: 'Manager / Team Lead',
    icon: '👔',
    description: 'Leadership tools, team coordination and business finance',
    tabs: [
      {
        id: 'work',
        name: 'Work',
        icon: '💼',
        categories: [
          {
            id: 'team-communication',
            name: 'Team Communication',
            icon: '💬',
            platformIds: ['microsoft-teams', 'slack', 'zoom', 'google-meet'],
          },
          {
            id: 'project-management',
            name: 'Project Management',
            icon: '📋',
            platformIds: ['jira', 'asana', 'monday', 'trello', 'clickup'],
          },
          {
            id: 'docs-productivity',
            name: 'Docs & Productivity',
            icon: '📝',
            platformIds: ['microsoft-365', 'notion', 'sharepoint', 'google-drive'],
          },
        ],
      },
      {
        id: 'professional',
        name: 'Professional',
        icon: '🤝',
        categories: [
          {
            id: 'professional-network',
            name: 'Professional Network',
            icon: '🌐',
            platformIds: ['linkedin', 'slack', 'zoom'],
          },
          {
            id: 'learning',
            name: 'Professional Development',
            icon: '📚',
            platformIds: ['linkedin-learning', 'coursera', 'microsoft-learn'],
          },
        ],
      },
      {
        id: 'personal',
        name: 'Personal',
        icon: '🏠',
        categories: [
          {
            id: 'banking',
            name: 'Banking',
            icon: '🏦',
            platformIds: ['commonwealth-bank', 'anz', 'westpac', 'paypal'],
          },
          {
            id: 'government',
            name: 'Government',
            icon: '🏛️',
            platformIds: ['mygov', 'ato-online', 'medicare'],
          },
        ],
      },
    ],
  },
  {
    id: 'freelancer',
    name: 'Freelancer / Creative',
    icon: '🎨',
    description: 'Invoicing, client work, payments and portfolio tools',
    tabs: [
      {
        id: 'work',
        name: 'Work',
        icon: '💻',
        categories: [
          {
            id: 'client-work',
            name: 'Client Platforms',
            icon: '🤝',
            platformIds: ['linkedin', 'figma', 'notion', 'loom'],
          },
          {
            id: 'finance',
            name: 'Finance & Invoicing',
            icon: '💰',
            platformIds: ['paypal', 'wise', 'splitwise'],
          },
          {
            id: 'project-management',
            name: 'Project Management',
            icon: '📋',
            platformIds: ['notion', 'trello', 'asana', 'clickup'],
          },
          {
            id: 'communication',
            name: 'Communication',
            icon: '💬',
            platformIds: ['gmail', 'slack', 'zoom', 'calendly'],
          },
        ],
      },
      {
        id: 'creative',
        name: 'Creative',
        icon: '🎨',
        categories: [
          {
            id: 'design-tools',
            name: 'Design Tools',
            icon: '✏️',
            platformIds: ['figma', 'miro', 'adobe-acrobat'],
          },
          {
            id: 'storage',
            name: 'File Storage',
            icon: '💾',
            platformIds: ['google-drive', 'dropbox', 'onedrive'],
          },
        ],
      },
      {
        id: 'personal',
        name: 'Personal',
        icon: '🏠',
        categories: [
          {
            id: 'banking',
            name: 'Banking & Payments',
            icon: '🏦',
            platformIds: ['commonwealth-bank', 'anz', 'paypal', 'wise', 'up-bank'],
          },
          {
            id: 'government',
            name: 'Government',
            icon: '🏛️',
            platformIds: ['mygov', 'ato-online', 'abn-lookup', 'asic'],
          },
        ],
      },
    ],
  },
  {
    id: 'business-owner',
    name: 'Business Owner',
    icon: '🏢',
    description: 'Business compliance, accounting, and growth platforms',
    tabs: [
      {
        id: 'business',
        name: 'Business',
        icon: '🏢',
        categories: [
          {
            id: 'compliance',
            name: 'Compliance & Regulation',
            icon: '⚖️',
            platformIds: ['asic', 'ato-online', 'abn-lookup', 'fair-work'],
          },
          {
            id: 'accounting',
            name: 'Accounting & Finance',
            icon: '💰',
            platformIds: ['paypal', 'wise', 'asic-connect'],
          },
          {
            id: 'payments',
            name: 'Payments & Commerce',
            icon: '💳',
            platformIds: ['afterpay', 'zip-pay', 'paypal'],
          },
        ],
      },
      {
        id: 'operations',
        name: 'Operations',
        icon: '⚙️',
        categories: [
          {
            id: 'productivity',
            name: 'Productivity Suite',
            icon: '📋',
            platformIds: ['microsoft-365', 'google-workspace', 'notion', 'slack'],
          },
          {
            id: 'communication',
            name: 'Communication',
            icon: '💬',
            platformIds: ['gmail', 'outlook', 'zoom', 'microsoft-teams'],
          },
          {
            id: 'storage',
            name: 'Documents & Storage',
            icon: '📂',
            platformIds: ['google-drive', 'onedrive', 'dropbox', 'sharepoint'],
          },
        ],
      },
      {
        id: 'personal',
        name: 'Personal',
        icon: '🏠',
        categories: [
          {
            id: 'banking',
            name: 'Banking',
            icon: '🏦',
            platformIds: ['commonwealth-bank', 'anz', 'nab', 'westpac'],
          },
          {
            id: 'government',
            name: 'Government',
            icon: '🏛️',
            platformIds: ['mygov', 'ato-online', 'medicare', 'centrelink'],
          },
        ],
      },
    ],
  },
  {
    id: 'remote-worker',
    name: 'Remote Worker',
    icon: '🏡',
    description: 'Tools for the distributed and work-from-home professional',
    tabs: [
      {
        id: 'work',
        name: 'Work',
        icon: '💼',
        categories: [
          {
            id: 'communication',
            name: 'Communication',
            icon: '💬',
            platformIds: ['zoom', 'slack', 'microsoft-teams', 'google-meet', 'loom'],
          },
          {
            id: 'productivity',
            name: 'Productivity',
            icon: '📝',
            platformIds: ['notion', 'google-workspace', 'microsoft-365', 'trello', 'asana'],
          },
          {
            id: 'storage',
            name: 'File Storage',
            icon: '☁️',
            platformIds: ['google-drive', 'onedrive', 'dropbox'],
          },
          {
            id: 'scheduling',
            name: 'Scheduling',
            icon: '📅',
            platformIds: ['google-calendar', 'calendly', 'outlook-calendar'],
          },
        ],
      },
      {
        id: 'personal',
        name: 'Personal',
        icon: '🏠',
        categories: [
          {
            id: 'banking',
            name: 'Banking',
            icon: '🏦',
            platformIds: ['commonwealth-bank', 'anz', 'up-bank', 'paypal'],
          },
          {
            id: 'government',
            name: 'Government',
            icon: '🏛️',
            platformIds: ['mygov', 'ato-online', 'medicare'],
          },
          {
            id: 'entertainment',
            name: 'Downtime',
            icon: '🎬',
            platformIds: ['netflix', 'spotify', 'youtube', 'abc-iview'],
          },
        ],
      },
    ],
  },

  // ─── TRADIE ──────────────────────────────────────────────
  {
    id: 'tradie',
    name: 'Tradie / Tradesperson',
    icon: '🔧',
    description: 'Quotes, invoices, licensing and supplier platforms',
    tabs: [
      {
        id: 'work',
        name: 'Work',
        icon: '🔧',
        categories: [
          {
            id: 'licensing',
            name: 'Licensing & Compliance',
            icon: '📋',
            platformIds: ['safe-work', 'fair-work', 'mygov'],
          },
          {
            id: 'communication',
            name: 'Communication',
            icon: '💬',
            platformIds: ['gmail', 'outlook', 'zoom'],
          },
          {
            id: 'documents',
            name: 'Documents',
            icon: '📂',
            platformIds: ['google-drive', 'onedrive', 'dropbox'],
          },
        ],
      },
      {
        id: 'personal',
        name: 'Personal',
        icon: '🏠',
        categories: [
          {
            id: 'banking',
            name: 'Banking',
            icon: '🏦',
            platformIds: ['commonwealth-bank', 'anz', 'nab', 'paypal'],
          },
          {
            id: 'government',
            name: 'Government',
            icon: '🏛️',
            platformIds: ['mygov', 'ato-online', 'abn-lookup', 'medicare'],
          },
        ],
      },
    ],
  },

  // ─── NURSE / AGED CARE ────────────────────────────────────
  {
    id: 'nurse',
    name: 'Nurse / Aged Care',
    icon: '👩‍⚕️',
    description: 'Clinical rosters, patient records, professional development',
    tabs: [
      {
        id: 'clinical',
        name: 'Clinical',
        icon: '🏥',
        categories: [
          {
            id: 'clinical-portals',
            name: 'Clinical Portals',
            icon: '🩺',
            platformIds: ['myhealth-record', 'medicare', 'mygov'],
          },
          {
            id: 'communication',
            name: 'Communication',
            icon: '💬',
            platformIds: ['microsoft-teams', 'outlook', 'zoom'],
          },
          {
            id: 'learning',
            name: 'CPD & Learning',
            icon: '📚',
            platformIds: ['coursera', 'linkedin-learning'],
          },
        ],
      },
      {
        id: 'admin',
        name: 'Admin',
        icon: '📊',
        categories: [
          {
            id: 'government',
            name: 'Government Health',
            icon: '🏛️',
            platformIds: ['mygov', 'medicare', 'ndis', 'dva'],
          },
          {
            id: 'insurance',
            name: 'Health Insurance',
            icon: '💊',
            platformIds: ['medibank', 'bupa', 'hcf', 'nib'],
          },
        ],
      },
      {
        id: 'personal',
        name: 'Personal',
        icon: '🏠',
        categories: [
          {
            id: 'banking',
            name: 'Banking',
            icon: '🏦',
            platformIds: ['commonwealth-bank', 'anz', 'up-bank'],
          },
          {
            id: 'wellbeing',
            name: 'Wellbeing',
            icon: '💚',
            platformIds: ['beyond-blue', 'headspace', 'lifeline'],
          },
        ],
      },
    ],
  },

  // ─── RETIREE ──────────────────────────────────────────────
  {
    id: 'retiree',
    name: 'Retiree',
    icon: '🌴',
    description: 'Government services, health, banking and staying connected',
    tabs: [
      {
        id: 'essentials',
        name: 'Essentials',
        icon: '⭐',
        categories: [
          {
            id: 'government',
            name: 'Government',
            icon: '🏛️',
            platformIds: ['mygov', 'centrelink', 'ato-online', 'medicare', 'dva'],
          },
          {
            id: 'banking',
            name: 'Banking',
            icon: '🏦',
            platformIds: ['commonwealth-bank', 'anz', 'nab', 'westpac'],
          },
          {
            id: 'health',
            name: 'Health',
            icon: '🏥',
            platformIds: ['myhealth-record', 'healthengine', 'hotdoc', 'medibank', 'bupa'],
          },
        ],
      },
      {
        id: 'lifestyle',
        name: 'Lifestyle',
        icon: '🌿',
        categories: [
          {
            id: 'entertainment',
            name: 'Entertainment',
            icon: '🎬',
            platformIds: ['abc-iview', 'netflix', 'spotify', 'youtube'],
          },
          {
            id: 'connected',
            name: 'Staying Connected',
            icon: '💬',
            platformIds: ['gmail', 'facebook', 'zoom', 'google-meet'],
          },
        ],
      },
    ],
  },

  // ─── PARENT / HOMEMAKER ───────────────────────────────────
  {
    id: 'parent',
    name: 'Parent / Homemaker',
    icon: '👨‍👩‍👧',
    description: 'School, family admin, health and household',
    tabs: [
      {
        id: 'family',
        name: 'Family',
        icon: '👨‍👩‍👧',
        categories: [
          {
            id: 'school',
            name: 'School',
            icon: '🏫',
            platformIds: ['compass', 'google-classroom', 'canvas'],
          },
          {
            id: 'health',
            name: 'Health',
            icon: '🏥',
            platformIds: ['healthengine', 'hotdoc', 'myhealth-record', 'medibank'],
          },
          {
            id: 'shopping',
            name: 'Shopping',
            icon: '🛒',
            platformIds: ['amazon-au', 'ebay-au', 'afterpay'],
          },
        ],
      },
      {
        id: 'admin',
        name: 'Household Admin',
        icon: '📋',
        categories: [
          {
            id: 'banking',
            name: 'Banking',
            icon: '🏦',
            platformIds: ['commonwealth-bank', 'anz', 'nab', 'westpac'],
          },
          {
            id: 'government',
            name: 'Government',
            icon: '🏛️',
            platformIds: ['mygov', 'centrelink', 'medicare', 'ato-online'],
          },
          {
            id: 'utilities',
            name: 'Utilities',
            icon: '💡',
            platformIds: ['agl', 'origin-energy', 'telstra'],
          },
        ],
      },
    ],
  },

  // ─── SECONDARY STUDENT ────────────────────────────────────
  {
    id: 'secondary-student',
    name: 'Secondary Student',
    icon: '🎒',
    description: 'Yr 7–12 school portals, study tools and uni prep',
    tabs: [
      {
        id: 'school',
        name: 'School',
        icon: '📚',
        categories: [
          {
            id: 'lms',
            name: 'School Systems',
            icon: '🏫',
            platformIds: ['compass', 'google-classroom', 'canvas', 'moodle'],
          },
          {
            id: 'study',
            name: 'Study Tools',
            icon: '✏️',
            platformIds: ['google-drive', 'youtube', 'khan-academy', 'notion'],
          },
          {
            id: 'communication',
            name: 'Communication',
            icon: '💬',
            platformIds: ['gmail', 'outlook', 'microsoft-teams', 'discord'],
          },
        ],
      },
      {
        id: 'future',
        name: 'Future',
        icon: '🚀',
        categories: [
          {
            id: 'uni-admissions',
            name: 'Uni Admissions',
            icon: '🏛️',
            platformIds: ['vtac', 'uac', 'qtac', 'satac'],
          },
          {
            id: 'personal',
            name: 'Personal',
            icon: '🏠',
            platformIds: ['mygov', 'centrelink', 'ato-online', 'up-bank'],
          },
        ],
      },
    ],
  },

  // ─── FARMER / AGRICULTURAL ────────────────────────────────
  {
    id: 'farmer',
    name: 'Farmer / Agricultural',
    icon: '🌾',
    description: 'Rural services, government farm programs and market tools',
    tabs: [
      {
        id: 'farm',
        name: 'Farm',
        icon: '🌾',
        categories: [
          {
            id: 'government',
            name: 'Government & Rural',
            icon: '🏛️',
            platformIds: ['mygov', 'ato-online', 'abn-lookup', 'safe-work'],
          },
          {
            id: 'banking',
            name: 'Banking',
            icon: '🏦',
            platformIds: ['commonwealth-bank', 'anz', 'nab', 'bendigo-bank'],
          },
          {
            id: 'communication',
            name: 'Communication',
            icon: '📡',
            platformIds: ['gmail', 'outlook', 'zoom'],
          },
        ],
      },
      {
        id: 'personal',
        name: 'Personal',
        icon: '🏠',
        categories: [
          {
            id: 'services',
            name: 'Services',
            icon: '⭐',
            platformIds: ['mygov', 'centrelink', 'medicare', 'ato-online'],
          },
          {
            id: 'health',
            name: 'Health',
            icon: '🏥',
            platformIds: ['healthengine', 'hotdoc', 'myhealth-record'],
          },
        ],
      },
    ],
  },

  // ─── HOSPITALITY / CHEF ───────────────────────────────────
  {
    id: 'hospitality',
    name: 'Hospitality / Chef',
    icon: '👨‍🍳',
    description: 'Rosters, recipes, licensing and supplier portals',
    tabs: [
      {
        id: 'work',
        name: 'Work',
        icon: '👨‍🍳',
        categories: [
          {
            id: 'compliance',
            name: 'Compliance',
            icon: '📋',
            platformIds: ['safe-work', 'fair-work', 'abn-lookup'],
          },
          {
            id: 'comms',
            name: 'Communication',
            icon: '💬',
            platformIds: ['gmail', 'outlook', 'microsoft-teams'],
          },
        ],
      },
      {
        id: 'personal',
        name: 'Personal',
        icon: '🏠',
        categories: [
          {
            id: 'banking',
            name: 'Banking',
            icon: '🏦',
            platformIds: ['commonwealth-bank', 'anz', 'up-bank', 'paypal'],
          },
          {
            id: 'government',
            name: 'Government',
            icon: '🏛️',
            platformIds: ['mygov', 'ato-online', 'centrelink', 'medicare'],
          },
          {
            id: 'entertainment',
            name: 'Downtime',
            icon: '🎬',
            platformIds: ['youtube', 'spotify', 'netflix', 'abc-iview'],
          },
        ],
      },
    ],
  },

  // ─── REAL ESTATE ─────────────────────────────────────────
  {
    id: 'real-estate',
    name: 'Real Estate Agent',
    icon: '🏡',
    description: 'Property listings, client comms, compliance',
    tabs: [
      {
        id: 'work',
        name: 'Work',
        icon: '🏡',
        categories: [
          {
            id: 'listings',
            name: 'Property & Listings',
            icon: '🏠',
            platformIds: ['realestate-au', 'domain-au'],
          },
          {
            id: 'comms',
            name: 'Communication',
            icon: '💬',
            platformIds: ['gmail', 'outlook', 'zoom', 'microsoft-teams'],
          },
          {
            id: 'docs',
            name: 'Documents',
            icon: '📂',
            platformIds: ['google-drive', 'onedrive', 'dropbox', 'adobe-acrobat'],
          },
          {
            id: 'compliance',
            name: 'Compliance',
            icon: '⚖️',
            platformIds: ['asic', 'fair-work', 'mygov'],
          },
        ],
      },
      {
        id: 'personal',
        name: 'Personal',
        icon: '🏠',
        categories: [
          {
            id: 'banking',
            name: 'Banking',
            icon: '🏦',
            platformIds: ['commonwealth-bank', 'anz', 'nab', 'westpac'],
          },
          {
            id: 'government',
            name: 'Government',
            icon: '🏛️',
            platformIds: ['mygov', 'ato-online', 'medicare', 'vicroads'],
          },
        ],
      },
    ],
  },

  // ─── ARTIST / CREATIVE ───────────────────────────────────
  {
    id: 'artist',
    name: 'Artist / Creative',
    icon: '🎨',
    description: 'Design tools, portfolio, social media and client portals',
    tabs: [
      {
        id: 'creative',
        name: 'Creative',
        icon: '🎨',
        categories: [
          {
            id: 'design-tools',
            name: 'Design Tools',
            icon: '✏️',
            platformIds: ['figma', 'miro', 'adobe-acrobat'],
          },
          {
            id: 'portfolio',
            name: 'Portfolio & Social',
            icon: '📸',
            platformIds: ['instagram', 'linkedin', 'youtube'],
          },
          {
            id: 'client',
            name: 'Client Work',
            icon: '🤝',
            platformIds: ['notion', 'trello', 'loom', 'zoom'],
          },
        ],
      },
      {
        id: 'personal',
        name: 'Personal',
        icon: '🏠',
        categories: [
          {
            id: 'banking',
            name: 'Banking & Payments',
            icon: '🏦',
            platformIds: ['commonwealth-bank', 'paypal', 'wise', 'up-bank'],
          },
          {
            id: 'government',
            name: 'Government',
            icon: '🏛️',
            platformIds: ['mygov', 'ato-online', 'abn-lookup', 'medicare'],
          },
        ],
      },
    ],
  },

  // ─── SPORTS COACH / PT ────────────────────────────────────
  {
    id: 'sports-coach',
    name: 'Sports Coach / PT',
    icon: '🏋️',
    description: 'Session planning, client bookings and sport admin',
    tabs: [
      {
        id: 'coaching',
        name: 'Coaching',
        icon: '🏋️',
        categories: [
          {
            id: 'scheduling',
            name: 'Scheduling & Comms',
            icon: '📅',
            platformIds: ['google-calendar', 'zoom', 'gmail', 'microsoft-teams'],
          },
          {
            id: 'compliance',
            name: 'Compliance & ABN',
            icon: '📋',
            platformIds: ['abn-lookup', 'fair-work', 'safe-work', 'mygov'],
          },
        ],
      },
      {
        id: 'personal',
        name: 'Personal',
        icon: '🏠',
        categories: [
          {
            id: 'banking',
            name: 'Banking',
            icon: '🏦',
            platformIds: ['commonwealth-bank', 'anz', 'up-bank', 'paypal'],
          },
          {
            id: 'government',
            name: 'Government',
            icon: '🏛️',
            platformIds: ['mygov', 'ato-online', 'medicare'],
          },
          {
            id: 'wellbeing',
            name: 'Health & Wellbeing',
            icon: '💚',
            platformIds: ['headspace', 'beyond-blue'],
          },
        ],
      },
    ],
  },

  // ─── ACCOUNTANT ──────────────────────────────────────────
  {
    id: 'accountant',
    name: 'Accountant / Bookkeeper',
    icon: '📊',
    description: 'Tax, compliance, client portals and financial tools',
    tabs: [
      {
        id: 'work',
        name: 'Work',
        icon: '📊',
        categories: [
          {
            id: 'ato-portals',
            name: 'ATO & Compliance',
            icon: '🏛️',
            platformIds: ['ato-online', 'mygov', 'asic', 'abn-lookup', 'asic-connect'],
          },
          {
            id: 'productivity',
            name: 'Productivity',
            icon: '📋',
            platformIds: ['microsoft-365', 'google-workspace', 'notion', 'sharepoint'],
          },
          {
            id: 'comms',
            name: 'Communication',
            icon: '💬',
            platformIds: ['outlook', 'microsoft-teams', 'zoom', 'gmail'],
          },
        ],
      },
      {
        id: 'personal',
        name: 'Personal',
        icon: '🏠',
        categories: [
          {
            id: 'banking',
            name: 'Banking',
            icon: '🏦',
            platformIds: ['commonwealth-bank', 'anz', 'nab', 'westpac', 'macquarie'],
          },
          {
            id: 'government',
            name: 'Government',
            icon: '🏛️',
            platformIds: ['mygov', 'ato-online', 'medicare', 'centrelink'],
          },
        ],
      },
    ],
  },
]

export function getTemplateById(id) {
  return TEMPLATES.find(t => t.id === id) || null
}

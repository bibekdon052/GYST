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
]

export function getTemplateById(id) {
  return TEMPLATES.find(t => t.id === id) || null
}

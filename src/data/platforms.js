// ─────────────────────────────────────────────────────────
// GYST Platform Library — Australian platform catalogue
// ─────────────────────────────────────────────────────────

export const PLATFORM_CATEGORIES = [
  {
    id: 'email-calendar',
    name: 'Email & Calendar',
    icon: '📧',
    platforms: [
      { id: 'gmail', name: 'Gmail', url: 'https://mail.google.com', emoji: '📬', color: '#EA4335', description: 'Google email service', tags: ['email', 'google', 'mail'], category: 'email-calendar' },
      { id: 'outlook', name: 'Outlook', url: 'https://outlook.live.com', emoji: '📮', color: '#0078D4', description: 'Microsoft email and calendar', tags: ['email', 'microsoft', 'mail'], category: 'email-calendar' },
      { id: 'apple-mail', name: 'Apple Mail', url: 'https://www.icloud.com/mail', emoji: '✉️', color: '#1C1C1E', description: 'Apple Mail via iCloud', tags: ['email', 'apple', 'mail'], category: 'email-calendar' },
      { id: 'yahoo-mail', name: 'Yahoo Mail', url: 'https://mail.yahoo.com', emoji: '📩', color: '#6001D2', description: 'Yahoo email service', tags: ['email', 'yahoo', 'mail'], category: 'email-calendar' },
      { id: 'protonmail', name: 'ProtonMail', url: 'https://mail.proton.me', emoji: '🔐', color: '#6D4AFF', description: 'Encrypted email service', tags: ['email', 'secure', 'privacy'], category: 'email-calendar' },
      { id: 'fastmail', name: 'Fastmail', url: 'https://www.fastmail.com', emoji: '⚡', color: '#D33B43', description: 'Fast, private email service', tags: ['email', 'privacy', 'mail'], category: 'email-calendar' },
      { id: 'google-calendar', name: 'Google Calendar', url: 'https://calendar.google.com', emoji: '📅', color: '#1A73E8', description: 'Google scheduling and calendar', tags: ['calendar', 'google', 'schedule'], category: 'email-calendar' },
      { id: 'outlook-calendar', name: 'Outlook Calendar', url: 'https://outlook.live.com/calendar', emoji: '🗓️', color: '#0078D4', description: 'Microsoft calendar and scheduling', tags: ['calendar', 'microsoft', 'schedule'], category: 'email-calendar' },
      { id: 'calendly', name: 'Calendly', url: 'https://calendly.com', emoji: '🤝', color: '#006BFF', description: 'Meeting scheduling tool', tags: ['calendar', 'scheduling', 'meetings'], category: 'email-calendar' },
      { id: 'fantastical', name: 'Fantastical', url: 'https://fantastical.app', emoji: '🌟', color: '#FF3B30', description: 'Premium calendar app', tags: ['calendar', 'apple', 'schedule'], category: 'email-calendar' },
    ],
  },
  {
    id: 'banking-finance',
    name: 'Banking & Finance',
    icon: '🏦',
    platforms: [
      { id: 'commonwealth-bank', name: 'CommBank (NetBank)', url: 'https://www.netbank.com.au', emoji: '🏦', color: '#F9E11E', description: 'Commonwealth Bank online banking', tags: ['banking', 'cba', 'finance', 'australia'], category: 'banking-finance' },
      { id: 'anz', name: 'ANZ', url: 'https://www.anz.com.au/internet-banking', emoji: '💙', color: '#007DBA', description: 'ANZ Internet Banking', tags: ['banking', 'anz', 'finance', 'australia'], category: 'banking-finance' },
      { id: 'nab', name: 'NAB', url: 'https://www.nab.com.au/personal/internet-banking', emoji: '🔴', color: '#CF0A2C', description: 'NAB Internet Banking', tags: ['banking', 'nab', 'finance', 'australia'], category: 'banking-finance' },
      { id: 'westpac', name: 'Westpac', url: 'https://online.westpac.com.au', emoji: '🔵', color: '#D5002B', description: 'Westpac Online Banking', tags: ['banking', 'westpac', 'finance', 'australia'], category: 'banking-finance' },
      { id: 'bendigo-bank', name: 'Bendigo Bank', url: 'https://www.bendigobank.com.au/banking/internet-banking', emoji: '🌾', color: '#C8202F', description: 'Bendigo Bank Internet Banking', tags: ['banking', 'bendigo', 'finance', 'australia'], category: 'banking-finance' },
      { id: 'ing', name: 'ING Australia', url: 'https://www.ing.com.au', emoji: '🦁', color: '#FF6200', description: 'ING Internet Banking', tags: ['banking', 'ing', 'finance', 'australia'], category: 'banking-finance' },
      { id: 'macquarie', name: 'Macquarie Bank', url: 'https://www.macquarie.com.au/banking', emoji: '🏛️', color: '#002244', description: 'Macquarie Online Banking', tags: ['banking', 'macquarie', 'finance', 'australia'], category: 'banking-finance' },
      { id: 'suncorp', name: 'Suncorp', url: 'https://www.suncorp.com.au', emoji: '☀️', color: '#FFCB00', description: 'Suncorp Internet Banking', tags: ['banking', 'suncorp', 'finance', 'australia'], category: 'banking-finance' },
      { id: 'boq', name: 'Bank of Queensland', url: 'https://www.boq.com.au', emoji: '🦅', color: '#003087', description: 'BOQ Internet Banking', tags: ['banking', 'boq', 'finance', 'australia', 'queensland'], category: 'banking-finance' },
      { id: 'up-bank', name: 'Up Bank', url: 'https://up.com.au', emoji: '⬆️', color: '#F80', description: 'Up digital bank', tags: ['banking', 'up', 'neobank', 'australia'], category: 'banking-finance' },
      { id: 'revolut', name: 'Revolut', url: 'https://www.revolut.com/en-AU', emoji: '💳', color: '#0075EB', description: 'Digital banking and international transfers', tags: ['banking', 'neobank', 'international'], category: 'banking-finance' },
      { id: 'wise', name: 'Wise', url: 'https://wise.com', emoji: '🌍', color: '#37B700', description: 'International money transfers', tags: ['transfers', 'international', 'currency'], category: 'banking-finance' },
      { id: 'paypal', name: 'PayPal', url: 'https://www.paypal.com/au', emoji: '💰', color: '#003087', description: 'Online payments and transfers', tags: ['payments', 'online', 'shopping'], category: 'banking-finance' },
      { id: 'afterpay', name: 'Afterpay', url: 'https://www.afterpay.com/en-AU', emoji: '💚', color: '#B2FCE4', description: 'Buy now, pay later', tags: ['bnpl', 'shopping', 'finance', 'australia'], category: 'banking-finance' },
      { id: 'zip-pay', name: 'Zip Pay', url: 'https://zip.co/au', emoji: '🤐', color: '#AA8FFF', description: 'Zip buy now, pay later', tags: ['bnpl', 'shopping', 'finance', 'australia'], category: 'banking-finance' },
      { id: 'splitwise', name: 'Splitwise', url: 'https://www.splitwise.com', emoji: '🔀', color: '#5BC5A7', description: 'Split bills and expenses', tags: ['expenses', 'splitting', 'social'], category: 'banking-finance' },
      { id: 'asic-connect', name: 'ASIC Connect', url: 'https://connectonline.asic.gov.au', emoji: '📋', color: '#1B4F72', description: 'ASIC company and business registry', tags: ['government', 'business', 'australia', 'asic'], category: 'banking-finance' },
    ],
  },
  {
    id: 'government',
    name: 'Government & Services',
    icon: '🏛️',
    platforms: [
      { id: 'mygov', name: 'myGov', url: 'https://my.gov.au', emoji: '🏛️', color: '#1C3F75', description: 'Access government services online', tags: ['government', 'australia', 'services', 'centrelink', 'ato'], category: 'government' },
      { id: 'ato-online', name: 'ATO Online', url: 'https://www.ato.gov.au', emoji: '💼', color: '#003366', description: 'Australian Taxation Office online services', tags: ['tax', 'government', 'ato', 'australia'], category: 'government' },
      { id: 'medicare', name: 'Medicare', url: 'https://www.servicesaustralia.gov.au/medicare', emoji: '🏥', color: '#007DC5', description: 'Medicare claims and information', tags: ['health', 'government', 'medicare', 'australia'], category: 'government' },
      { id: 'centrelink', name: 'Centrelink', url: 'https://www.servicesaustralia.gov.au/centrelink', emoji: '🤝', color: '#005E8E', description: 'Centrelink payments and services', tags: ['government', 'centrelink', 'payments', 'australia'], category: 'government' },
      { id: 'services-australia', name: 'Services Australia', url: 'https://www.servicesaustralia.gov.au', emoji: '🇦🇺', color: '#003087', description: 'Services Australia portal', tags: ['government', 'australia', 'services'], category: 'government' },
      { id: 'mytax', name: 'myTax', url: 'https://my.gov.au', emoji: '📊', color: '#1C3F75', description: 'Lodge your tax return online via myGov', tags: ['tax', 'government', 'ato', 'australia'], category: 'government' },
      { id: 'abn-lookup', name: 'ABN Lookup', url: 'https://abr.business.gov.au', emoji: '🔍', color: '#003366', description: 'Search Australian Business Numbers', tags: ['business', 'abn', 'australia'], category: 'government' },
      { id: 'asic', name: 'ASIC', url: 'https://www.asic.gov.au', emoji: '⚖️', color: '#1B4F72', description: 'Australian Securities & Investments Commission', tags: ['government', 'business', 'regulation', 'australia'], category: 'government' },
      { id: 'vicroads', name: 'VicRoads', url: 'https://www.vicroads.vic.gov.au', emoji: '🚗', color: '#003C71', description: 'Victorian roads and transport authority', tags: ['victoria', 'government', 'transport', 'licence'], category: 'government' },
      { id: 'service-nsw', name: 'Service NSW', url: 'https://www.service.nsw.gov.au', emoji: '🦁', color: '#00558B', description: 'NSW Government services', tags: ['nsw', 'government', 'services', 'australia'], category: 'government' },
      { id: 'service-qld', name: 'Service QLD', url: 'https://www.qld.gov.au', emoji: '🌞', color: '#C6362C', description: 'Queensland Government services', tags: ['queensland', 'government', 'services', 'australia'], category: 'government' },
      { id: 'sa-gov', name: 'SA.GOV.AU', url: 'https://www.sa.gov.au', emoji: '🗺️', color: '#D40000', description: 'South Australia Government services', tags: ['sa', 'south australia', 'government', 'services'], category: 'government' },
      { id: 'access-canberra', name: 'Access Canberra', url: 'https://www.accesscanberra.act.gov.au', emoji: '🏙️', color: '#0065BD', description: 'ACT Government services', tags: ['act', 'canberra', 'government', 'services'], category: 'government' },
      { id: 'smartraveller', name: 'Smartraveller', url: 'https://www.smartraveller.gov.au', emoji: '✈️', color: '#003087', description: 'Australian Government travel advice', tags: ['travel', 'government', 'dfat', 'australia'], category: 'government' },
      { id: 'fair-work', name: 'Fair Work Australia', url: 'https://www.fairwork.gov.au', emoji: '⚖️', color: '#1C3F75', description: 'National workplace relations system', tags: ['work', 'employment', 'rights', 'australia'], category: 'government' },
      { id: 'safe-work', name: 'Safe Work Australia', url: 'https://www.safeworkaustralia.gov.au', emoji: '🦺', color: '#C8202F', description: 'Workplace health and safety', tags: ['work', 'safety', 'health', 'australia'], category: 'government' },
    ],
  },
  {
    id: 'work-productivity',
    name: 'Work & Productivity',
    icon: '💼',
    platforms: [
      { id: 'microsoft-365', name: 'Microsoft 365', url: 'https://www.office.com', emoji: '🪟', color: '#D83B01', description: 'Microsoft Office online apps', tags: ['work', 'office', 'microsoft', 'productivity'], category: 'work-productivity' },
      { id: 'google-workspace', name: 'Google Workspace', url: 'https://workspace.google.com', emoji: '🔵', color: '#4285F4', description: 'Google productivity suite', tags: ['work', 'google', 'productivity'], category: 'work-productivity' },
      { id: 'slack', name: 'Slack', url: 'https://slack.com', emoji: '💬', color: '#4A154B', description: 'Team messaging and collaboration', tags: ['communication', 'team', 'chat', 'work'], category: 'work-productivity' },
      { id: 'microsoft-teams', name: 'Microsoft Teams', url: 'https://teams.microsoft.com', emoji: '👥', color: '#464EB8', description: 'Microsoft team collaboration and video', tags: ['communication', 'team', 'meetings', 'microsoft'], category: 'work-productivity' },
      { id: 'zoom', name: 'Zoom', url: 'https://zoom.us', emoji: '📹', color: '#2D8CFF', description: 'Video conferencing platform', tags: ['meetings', 'video', 'conferencing'], category: 'work-productivity' },
      { id: 'webex', name: 'Webex', url: 'https://www.webex.com', emoji: '🎥', color: '#00B140', description: 'Cisco Webex meetings', tags: ['meetings', 'video', 'conferencing', 'cisco'], category: 'work-productivity' },
      { id: 'google-meet', name: 'Google Meet', url: 'https://meet.google.com', emoji: '📺', color: '#00897B', description: 'Google video meetings', tags: ['meetings', 'video', 'google'], category: 'work-productivity' },
      { id: 'notion', name: 'Notion', url: 'https://www.notion.so', emoji: '📝', color: '#000000', description: 'Notes, docs and project management', tags: ['notes', 'docs', 'productivity', 'wiki'], category: 'work-productivity' },
      { id: 'confluence', name: 'Confluence', url: 'https://www.atlassian.com/software/confluence', emoji: '🌊', color: '#0052CC', description: 'Atlassian team wiki and docs', tags: ['wiki', 'docs', 'atlassian', 'team'], category: 'work-productivity' },
      { id: 'sharepoint', name: 'SharePoint', url: 'https://sharepoint.com', emoji: '📂', color: '#0078D4', description: 'Microsoft SharePoint collaboration', tags: ['docs', 'collaboration', 'microsoft'], category: 'work-productivity' },
      { id: 'trello', name: 'Trello', url: 'https://trello.com', emoji: '🗂️', color: '#0052CC', description: 'Visual project management boards', tags: ['project', 'kanban', 'tasks', 'atlassian'], category: 'work-productivity' },
      { id: 'asana', name: 'Asana', url: 'https://asana.com', emoji: '🎯', color: '#F06A6A', description: 'Work and project management', tags: ['project', 'tasks', 'management'], category: 'work-productivity' },
      { id: 'monday', name: 'Monday.com', url: 'https://monday.com', emoji: '🌙', color: '#FF3D57', description: 'Work operating system for teams', tags: ['project', 'tasks', 'management'], category: 'work-productivity' },
      { id: 'jira', name: 'Jira', url: 'https://www.atlassian.com/software/jira', emoji: '🐞', color: '#0052CC', description: 'Issue and project tracking', tags: ['project', 'issues', 'agile', 'atlassian'], category: 'work-productivity' },
      { id: 'clickup', name: 'ClickUp', url: 'https://clickup.com', emoji: '⚡', color: '#7B68EE', description: 'All-in-one project management', tags: ['project', 'tasks', 'management'], category: 'work-productivity' },
      { id: 'basecamp', name: 'Basecamp', url: 'https://basecamp.com', emoji: '🏕️', color: '#1D2D35', description: 'Project management and team communication', tags: ['project', 'team', 'management'], category: 'work-productivity' },
      { id: 'airtable', name: 'Airtable', url: 'https://airtable.com', emoji: '🗄️', color: '#18BFFF', description: 'Spreadsheet-database hybrid', tags: ['database', 'spreadsheet', 'productivity'], category: 'work-productivity' },
      { id: 'miro', name: 'Miro', url: 'https://miro.com', emoji: '🎨', color: '#FFDD00', description: 'Online collaborative whiteboard', tags: ['whiteboard', 'brainstorm', 'collaboration'], category: 'work-productivity' },
      { id: 'loom', name: 'Loom', url: 'https://www.loom.com', emoji: '🎬', color: '#625DF5', description: 'Async video messaging', tags: ['video', 'async', 'communication'], category: 'work-productivity' },
      { id: 'docusign', name: 'DocuSign', url: 'https://www.docusign.com', emoji: '✍️', color: '#FFCE22', description: 'Electronic signatures and agreements', tags: ['signatures', 'documents', 'legal'], category: 'work-productivity' },
      { id: 'adobe-acrobat', name: 'Adobe Acrobat', url: 'https://acrobat.adobe.com', emoji: '📄', color: '#FF0000', description: 'PDF editing and management', tags: ['pdf', 'documents', 'adobe'], category: 'work-productivity' },
    ],
  },
  {
    id: 'cloud-storage',
    name: 'Cloud & Storage',
    icon: '☁️',
    platforms: [
      { id: 'google-drive', name: 'Google Drive', url: 'https://drive.google.com', emoji: '💾', color: '#4285F4', description: 'Google cloud file storage', tags: ['storage', 'cloud', 'google', 'files'], category: 'cloud-storage' },
      { id: 'onedrive', name: 'OneDrive', url: 'https://onedrive.live.com', emoji: '☁️', color: '#0078D4', description: 'Microsoft cloud storage', tags: ['storage', 'cloud', 'microsoft', 'files'], category: 'cloud-storage' },
      { id: 'dropbox', name: 'Dropbox', url: 'https://www.dropbox.com', emoji: '📦', color: '#0061FF', description: 'Cloud file storage and sharing', tags: ['storage', 'cloud', 'files', 'sharing'], category: 'cloud-storage' },
      { id: 'icloud-drive', name: 'iCloud Drive', url: 'https://www.icloud.com', emoji: '🍎', color: '#1C1C1E', description: 'Apple iCloud file storage', tags: ['storage', 'cloud', 'apple', 'files'], category: 'cloud-storage' },
      { id: 'box', name: 'Box', url: 'https://www.box.com', emoji: '📫', color: '#0061D5', description: 'Enterprise cloud content management', tags: ['storage', 'cloud', 'enterprise', 'files'], category: 'cloud-storage' },
      { id: 'mega', name: 'MEGA', url: 'https://mega.nz', emoji: '🔒', color: '#D9272E', description: 'Secure cloud storage', tags: ['storage', 'cloud', 'secure', 'files'], category: 'cloud-storage' },
      { id: 'pcloud', name: 'pCloud', url: 'https://www.pcloud.com', emoji: '⛅', color: '#17AEFB', description: 'Secure personal cloud storage', tags: ['storage', 'cloud', 'secure', 'files'], category: 'cloud-storage' },
    ],
  },
  {
    id: 'education',
    name: 'Education & Learning',
    icon: '🎓',
    platforms: [
      { id: 'canvas', name: 'Canvas LMS', url: 'https://www.instructure.com/canvas', emoji: '🖼️', color: '#E66000', description: 'Canvas learning management system', tags: ['lms', 'education', 'courses'], category: 'education' },
      { id: 'blackboard', name: 'Blackboard', url: 'https://www.blackboard.com', emoji: '📋', color: '#000000', description: 'Blackboard learning management system', tags: ['lms', 'education', 'courses'], category: 'education' },
      { id: 'moodle', name: 'Moodle', url: 'https://moodle.org', emoji: '🎓', color: '#F7634D', description: 'Open-source learning management system', tags: ['lms', 'education', 'courses', 'open-source'], category: 'education' },
      { id: 'google-classroom', name: 'Google Classroom', url: 'https://classroom.google.com', emoji: '🏫', color: '#34A853', description: 'Google learning management for schools', tags: ['lms', 'education', 'google', 'schools'], category: 'education' },
      { id: 'compass', name: 'Compass', url: 'https://www.compass.education', emoji: '🧭', color: '#0071BC', description: 'School management platform (Compass.education)', tags: ['school', 'education', 'australia', 'lms', 'compass'], category: 'education' },
      { id: 'cases21', name: 'CASES21', url: 'https://www.education.vic.gov.au/school/teachers/management/finance/Pages/cases21support.aspx', emoji: '📊', color: '#003C71', description: 'Victorian Government school administration system', tags: ['school', 'victoria', 'admin', 'government', 'cases21'], category: 'education' },
      { id: 'vtac', name: 'VTAC', url: 'https://www.vtac.edu.au', emoji: '🎓', color: '#003087', description: 'Victorian Tertiary Admissions Centre', tags: ['university', 'victoria', 'admissions', 'vtac'], category: 'education' },
      { id: 'uac', name: 'UAC', url: 'https://www.uac.edu.au', emoji: '🎓', color: '#003087', description: 'Universities Admissions Centre (NSW)', tags: ['university', 'nsw', 'admissions', 'uac'], category: 'education' },
      { id: 'qtac', name: 'QTAC', url: 'https://www.qtac.edu.au', emoji: '🎓', color: '#7B2D8B', description: 'Queensland Tertiary Admissions Centre', tags: ['university', 'queensland', 'admissions', 'qtac'], category: 'education' },
      { id: 'satac', name: 'SATAC', url: 'https://www.satac.edu.au', emoji: '🎓', color: '#003087', description: 'South Australian Tertiary Admissions Centre', tags: ['university', 'south australia', 'admissions', 'satac'], category: 'education' },
      { id: 'tisc', name: 'TISC', url: 'https://www.tisc.edu.au', emoji: '🎓', color: '#003087', description: 'Tertiary Institutions Service Centre (WA)', tags: ['university', 'western australia', 'admissions', 'tisc'], category: 'education' },
      { id: 'linkedin-learning', name: 'LinkedIn Learning', url: 'https://www.linkedin.com/learning', emoji: '📚', color: '#0A66C2', description: 'Professional online learning', tags: ['learning', 'courses', 'professional', 'linkedin'], category: 'education' },
      { id: 'coursera', name: 'Coursera', url: 'https://www.coursera.org', emoji: '🎓', color: '#0056D2', description: 'Online university courses', tags: ['courses', 'university', 'online', 'learning'], category: 'education' },
      { id: 'edx', name: 'edX', url: 'https://www.edx.org', emoji: '📖', color: '#02262B', description: 'Online learning from top universities', tags: ['courses', 'university', 'online', 'learning'], category: 'education' },
      { id: 'khan-academy', name: 'Khan Academy', url: 'https://www.khanacademy.org', emoji: '🦅', color: '#14BF96', description: 'Free online learning for all ages', tags: ['learning', 'free', 'education', 'kids'], category: 'education' },
      { id: 'duolingo', name: 'Duolingo', url: 'https://www.duolingo.com', emoji: '🦜', color: '#58CC02', description: 'Language learning app', tags: ['language', 'learning', 'fun'], category: 'education' },
      { id: 'skillshare', name: 'Skillshare', url: 'https://www.skillshare.com', emoji: '✏️', color: '#00E677', description: 'Creative and professional skills online', tags: ['courses', 'creative', 'skills', 'learning'], category: 'education' },
      { id: 'udemy', name: 'Udemy', url: 'https://www.udemy.com', emoji: '🎯', color: '#A435F0', description: 'Online courses marketplace', tags: ['courses', 'learning', 'skills'], category: 'education' },
      { id: 'microsoft-learn', name: 'Microsoft Learn', url: 'https://learn.microsoft.com', emoji: '🪟', color: '#0078D4', description: 'Free Microsoft training and certifications', tags: ['microsoft', 'learning', 'certifications'], category: 'education' },
      { id: 'google-skillshop', name: 'Google Skillshop', url: 'https://skillshop.withgoogle.com', emoji: '🔵', color: '#4285F4', description: 'Google certifications and training', tags: ['google', 'learning', 'certifications'], category: 'education' },
    ],
  },
  {
    id: 'health-wellbeing',
    name: 'Health & Wellbeing',
    icon: '🏥',
    platforms: [
      { id: 'healthengine', name: 'HealthEngine', url: 'https://healthengine.com.au', emoji: '🏥', color: '#00A6D6', description: 'Book GP and specialist appointments', tags: ['health', 'doctors', 'appointments', 'australia'], category: 'health-wellbeing' },
      { id: 'hotdoc', name: 'HotDoc', url: 'https://www.hotdoc.com.au', emoji: '📋', color: '#FF6B35', description: 'Online GP appointments and records', tags: ['health', 'doctors', 'gp', 'australia'], category: 'health-wellbeing' },
      { id: 'myhealth-record', name: 'My Health Record', url: 'https://www.myhealthrecord.gov.au', emoji: '📁', color: '#007DC5', description: 'Australian national health record', tags: ['health', 'records', 'government', 'australia'], category: 'health-wellbeing' },
      { id: 'medicare-online', name: 'Medicare Online', url: 'https://my.gov.au', emoji: '💊', color: '#007DC5', description: 'Medicare claims via myGov', tags: ['health', 'medicare', 'government', 'australia'], category: 'health-wellbeing' },
      { id: 'medibank', name: 'Medibank', url: 'https://www.medibank.com.au/member', emoji: '💙', color: '#007DC5', description: 'Medibank health insurance member portal', tags: ['health', 'insurance', 'australia'], category: 'health-wellbeing' },
      { id: 'bupa', name: 'Bupa', url: 'https://www.bupa.com.au/customer-zone', emoji: '❤️', color: '#002D9C', description: 'Bupa health insurance member portal', tags: ['health', 'insurance', 'australia'], category: 'health-wellbeing' },
      { id: 'hcf', name: 'HCF', url: 'https://www.hcf.com.au/member-login', emoji: '💜', color: '#6B0E89', description: 'HCF health insurance member portal', tags: ['health', 'insurance', 'australia'], category: 'health-wellbeing' },
      { id: 'nib', name: 'NIB', url: 'https://www.nib.com.au/customer', emoji: '🟢', color: '#00A651', description: 'NIB health insurance member portal', tags: ['health', 'insurance', 'australia'], category: 'health-wellbeing' },
      { id: 'australian-unity', name: 'Australian Unity', url: 'https://www.australianunity.com.au', emoji: '🌿', color: '#009A44', description: 'Australian Unity health and wellbeing', tags: ['health', 'insurance', 'australia'], category: 'health-wellbeing' },
      { id: 'headspace', name: 'Headspace', url: 'https://www.headspace.org.au', emoji: '💚', color: '#00B140', description: 'Youth mental health organisation (Australia)', tags: ['mental health', 'youth', 'wellbeing', 'australia'], category: 'health-wellbeing' },
      { id: 'beyond-blue', name: 'Beyond Blue', url: 'https://www.beyondblue.org.au', emoji: '🔵', color: '#003C71', description: 'Mental health support and information', tags: ['mental health', 'support', 'australia'], category: 'health-wellbeing' },
      { id: 'black-dog', name: 'Black Dog Institute', url: 'https://www.blackdoginstitute.org.au', emoji: '🐕', color: '#000000', description: 'Mental health research and support', tags: ['mental health', 'research', 'australia'], category: 'health-wellbeing' },
      { id: 'lifeline', name: 'Lifeline', url: 'https://www.lifeline.org.au', emoji: '☎️', color: '#FF6600', description: 'Crisis support and suicide prevention', tags: ['crisis', 'mental health', 'support', 'australia'], category: 'health-wellbeing' },
      { id: 'ndis', name: 'NDIS myplace', url: 'https://www.ndis.gov.au/participants/myplace-participants', emoji: '♿', color: '#003087', description: 'NDIS participant portal', tags: ['disability', 'government', 'ndis', 'australia'], category: 'health-wellbeing' },
      { id: 'dva', name: 'DVA (Veterans Affairs)', url: 'https://www.dva.gov.au', emoji: '🎖️', color: '#003087', description: 'Department of Veterans Affairs', tags: ['veterans', 'government', 'defence', 'australia'], category: 'health-wellbeing' },
    ],
  },
  {
    id: 'shopping-lifestyle',
    name: 'Shopping & Lifestyle',
    icon: '🛒',
    platforms: [
      { id: 'amazon-au', name: 'Amazon Australia', url: 'https://www.amazon.com.au', emoji: '📦', color: '#FF9900', description: 'Amazon online shopping', tags: ['shopping', 'online', 'amazon', 'australia'], category: 'shopping-lifestyle' },
      { id: 'ebay-au', name: 'eBay Australia', url: 'https://www.ebay.com.au', emoji: '🛒', color: '#E53238', description: 'eBay marketplace', tags: ['shopping', 'marketplace', 'ebay', 'australia'], category: 'shopping-lifestyle' },
      { id: 'kmart', name: 'Kmart', url: 'https://www.kmart.com.au', emoji: '🔴', color: '#E12726', description: 'Kmart online store', tags: ['shopping', 'retail', 'australia'], category: 'shopping-lifestyle' },
      { id: 'big-w', name: 'Big W', url: 'https://www.bigw.com.au', emoji: '🔵', color: '#003EA5', description: 'Big W online store', tags: ['shopping', 'retail', 'australia'], category: 'shopping-lifestyle' },
      { id: 'jb-hifi', name: 'JB Hi-Fi', url: 'https://www.jbhifi.com.au', emoji: '🎵', color: '#FFD700', description: 'Electronics and entertainment retailer', tags: ['electronics', 'shopping', 'australia'], category: 'shopping-lifestyle' },
      { id: 'harvey-norman', name: 'Harvey Norman', url: 'https://www.harveynorman.com.au', emoji: '🛋️', color: '#FF0000', description: 'Electronics and furniture retailer', tags: ['electronics', 'shopping', 'australia'], category: 'shopping-lifestyle' },
      { id: 'bunnings', name: 'Bunnings', url: 'https://www.bunnings.com.au', emoji: '🔨', color: '#D5002B', description: 'Hardware and home improvement', tags: ['hardware', 'home', 'shopping', 'australia'], category: 'shopping-lifestyle' },
      { id: 'ikea-au', name: 'IKEA Australia', url: 'https://www.ikea.com/au', emoji: '🪑', color: '#FFDA1A', description: 'IKEA furniture and home products', tags: ['furniture', 'home', 'shopping'], category: 'shopping-lifestyle' },
      { id: 'woolworths', name: 'Woolworths Online', url: 'https://www.woolworths.com.au', emoji: '🛒', color: '#00AF64', description: 'Woolworths grocery online shopping', tags: ['grocery', 'food', 'shopping', 'australia'], category: 'shopping-lifestyle' },
      { id: 'coles', name: 'Coles Online', url: 'https://www.coles.com.au', emoji: '🛍️', color: '#E31837', description: 'Coles grocery online shopping', tags: ['grocery', 'food', 'shopping', 'australia'], category: 'shopping-lifestyle' },
      { id: 'dan-murphys', name: "Dan Murphy's", url: 'https://www.danmurphys.com.au', emoji: '🍷', color: '#880000', description: 'Australia\'s biggest liquor retailer', tags: ['liquor', 'shopping', 'australia'], category: 'shopping-lifestyle' },
      { id: 'uber-eats', name: 'Uber Eats', url: 'https://www.ubereats.com/au', emoji: '🍔', color: '#142328', description: 'Food delivery via Uber Eats', tags: ['food', 'delivery', 'australia'], category: 'shopping-lifestyle' },
      { id: 'doordash', name: 'DoorDash', url: 'https://www.doordash.com/en-AU', emoji: '🚪', color: '#FF3008', description: 'Food delivery via DoorDash', tags: ['food', 'delivery', 'australia'], category: 'shopping-lifestyle' },
      { id: 'menulog', name: 'Menulog', url: 'https://www.menulog.com.au', emoji: '🍕', color: '#FF4A00', description: 'Food and restaurant delivery', tags: ['food', 'delivery', 'australia'], category: 'shopping-lifestyle' },
      { id: 'catch', name: 'Catch.com.au', url: 'https://www.catch.com.au', emoji: '🐟', color: '#FF6600', description: 'Online deals and marketplace', tags: ['shopping', 'deals', 'australia'], category: 'shopping-lifestyle' },
      { id: 'myer', name: 'Myer', url: 'https://www.myer.com.au', emoji: '🛍️', color: '#C8A96E', description: 'Myer department store online', tags: ['fashion', 'shopping', 'australia'], category: 'shopping-lifestyle' },
      { id: 'david-jones', name: 'David Jones', url: 'https://www.davidjones.com', emoji: '🎩', color: '#000000', description: 'David Jones premium department store', tags: ['fashion', 'shopping', 'australia'], category: 'shopping-lifestyle' },
    ],
  },
  {
    id: 'transport-travel',
    name: 'Transport & Travel',
    icon: '🚗',
    platforms: [
      { id: 'myki', name: 'myki', url: 'https://www.ptv.vic.gov.au/tickets/myki', emoji: '🚌', color: '#007DC5', description: 'Melbourne public transport card management', tags: ['transport', 'victoria', 'melbourne', 'public transport'], category: 'transport-travel' },
      { id: 'opal', name: 'Opal Card', url: 'https://www.opal.com.au', emoji: '💳', color: '#00A5CC', description: 'Sydney public transport card', tags: ['transport', 'nsw', 'sydney', 'public transport'], category: 'transport-travel' },
      { id: 'go-card', name: 'Go Card', url: 'https://gocard.translink.com.au', emoji: '🚆', color: '#00A651', description: 'Queensland public transport card', tags: ['transport', 'queensland', 'brisbane', 'public transport'], category: 'transport-travel' },
      { id: 'metrocard', name: 'Metrocard (SA)', url: 'https://www.adelaidemetro.com.au/tickets-and-cards/metroCARD', emoji: '🚇', color: '#9B0E1C', description: 'Adelaide public transport card', tags: ['transport', 'south australia', 'adelaide', 'public transport'], category: 'transport-travel' },
      { id: 'smartrider', name: 'SmartRider (WA)', url: 'https://www.transperth.wa.gov.au/SmartRider', emoji: '🚌', color: '#0057A8', description: 'Perth public transport card', tags: ['transport', 'western australia', 'perth', 'public transport'], category: 'transport-travel' },
      { id: 'google-maps', name: 'Google Maps', url: 'https://maps.google.com', emoji: '🗺️', color: '#4285F4', description: 'Maps, navigation and directions', tags: ['maps', 'navigation', 'directions', 'google'], category: 'transport-travel' },
      { id: 'apple-maps', name: 'Apple Maps', url: 'https://maps.apple.com', emoji: '📍', color: '#1C1C1E', description: 'Apple maps and navigation', tags: ['maps', 'navigation', 'apple'], category: 'transport-travel' },
      { id: 'waze', name: 'Waze', url: 'https://www.waze.com', emoji: '😊', color: '#05C8F7', description: 'Community-based navigation app', tags: ['maps', 'navigation', 'driving', 'traffic'], category: 'transport-travel' },
      { id: 'uber', name: 'Uber', url: 'https://www.uber.com/au', emoji: '🚗', color: '#000000', description: 'Ride-hailing service', tags: ['transport', 'ride-hailing', 'australia'], category: 'transport-travel' },
      { id: 'didi', name: 'DiDi', url: 'https://web.didiglobal.com/au', emoji: '🐼', color: '#FF6600', description: 'DiDi ride-hailing service Australia', tags: ['transport', 'ride-hailing', 'australia'], category: 'transport-travel' },
      { id: 'qantas', name: 'Qantas', url: 'https://www.qantas.com', emoji: '🦘', color: '#FF0000', description: 'Qantas airline booking and frequent flyer', tags: ['travel', 'airline', 'flights', 'australia'], category: 'transport-travel' },
      { id: 'virgin-australia', name: 'Virgin Australia', url: 'https://www.virginaustralia.com', emoji: '✈️', color: '#D5001C', description: 'Virgin Australia flights and Velocity', tags: ['travel', 'airline', 'flights', 'australia'], category: 'transport-travel' },
      { id: 'jetstar', name: 'Jetstar', url: 'https://www.jetstar.com/au', emoji: '⭐', color: '#F26722', description: 'Jetstar low-cost airline', tags: ['travel', 'airline', 'flights', 'australia'], category: 'transport-travel' },
      { id: 'booking', name: 'Booking.com', url: 'https://www.booking.com', emoji: '🏨', color: '#003580', description: 'Hotel and accommodation booking', tags: ['travel', 'accommodation', 'hotels'], category: 'transport-travel' },
      { id: 'airbnb', name: 'Airbnb', url: 'https://www.airbnb.com.au', emoji: '🏠', color: '#FF5A5F', description: 'Holiday rentals and experiences', tags: ['travel', 'accommodation', 'rentals'], category: 'transport-travel' },
      { id: 'tripadvisor', name: 'TripAdvisor', url: 'https://www.tripadvisor.com.au', emoji: '🦉', color: '#00AF87', description: 'Travel reviews and planning', tags: ['travel', 'reviews', 'planning'], category: 'transport-travel' },
    ],
  },
  {
    id: 'social-comms',
    name: 'Social & Communication',
    icon: '💬',
    platforms: [
      { id: 'facebook', name: 'Facebook', url: 'https://www.facebook.com', emoji: '👤', color: '#1877F2', description: 'Social networking platform', tags: ['social', 'facebook', 'networking'], category: 'social-comms' },
      { id: 'instagram', name: 'Instagram', url: 'https://www.instagram.com', emoji: '📸', color: '#E1306C', description: 'Photo and video sharing social network', tags: ['social', 'photos', 'instagram'], category: 'social-comms' },
      { id: 'linkedin', name: 'LinkedIn', url: 'https://www.linkedin.com', emoji: '💼', color: '#0A66C2', description: 'Professional networking platform', tags: ['professional', 'networking', 'linkedin'], category: 'social-comms' },
      { id: 'twitter-x', name: 'Twitter / X', url: 'https://x.com', emoji: '𝕏', color: '#000000', description: 'Microblogging and social networking', tags: ['social', 'twitter', 'news'], category: 'social-comms' },
      { id: 'whatsapp', name: 'WhatsApp', url: 'https://web.whatsapp.com', emoji: '💚', color: '#25D366', description: 'Messaging and video calls', tags: ['messaging', 'chat', 'calls'], category: 'social-comms' },
      { id: 'signal', name: 'Signal', url: 'https://signal.org', emoji: '🔐', color: '#3A76F0', description: 'Private encrypted messaging', tags: ['messaging', 'privacy', 'secure'], category: 'social-comms' },
      { id: 'discord', name: 'Discord', url: 'https://discord.com', emoji: '🎮', color: '#5865F2', description: 'Community chat and voice platform', tags: ['chat', 'gaming', 'communities'], category: 'social-comms' },
      { id: 'telegram', name: 'Telegram', url: 'https://web.telegram.org', emoji: '✈️', color: '#2CA5E0', description: 'Fast and secure messaging app', tags: ['messaging', 'chat', 'secure'], category: 'social-comms' },
      { id: 'messenger', name: 'Messenger', url: 'https://www.messenger.com', emoji: '💬', color: '#0099FF', description: 'Facebook Messenger for the web', tags: ['messaging', 'facebook', 'chat'], category: 'social-comms' },
      { id: 'snapchat', name: 'Snapchat', url: 'https://web.snapchat.com', emoji: '👻', color: '#FFFC00', description: 'Ephemeral photo and video messaging', tags: ['social', 'photos', 'messaging'], category: 'social-comms' },
      { id: 'tiktok', name: 'TikTok', url: 'https://www.tiktok.com', emoji: '🎵', color: '#000000', description: 'Short video social platform', tags: ['social', 'video', 'tiktok'], category: 'social-comms' },
      { id: 'pinterest', name: 'Pinterest', url: 'https://www.pinterest.com.au', emoji: '📌', color: '#E60023', description: 'Visual discovery and inspiration', tags: ['social', 'images', 'inspiration'], category: 'social-comms' },
      { id: 'reddit', name: 'Reddit', url: 'https://www.reddit.com', emoji: '🤖', color: '#FF4500', description: 'Community-based discussion platform', tags: ['social', 'forums', 'communities'], category: 'social-comms' },
      { id: 'youtube', name: 'YouTube', url: 'https://www.youtube.com', emoji: '▶️', color: '#FF0000', description: 'Video sharing and streaming platform', tags: ['video', 'streaming', 'youtube'], category: 'social-comms' },
      { id: 'twitch', name: 'Twitch', url: 'https://www.twitch.tv', emoji: '🎮', color: '#9146FF', description: 'Live streaming platform', tags: ['streaming', 'gaming', 'live'], category: 'social-comms' },
      { id: 'bereal', name: 'BeReal', url: 'https://www.bereal.com', emoji: '📷', color: '#000000', description: 'Authentic daily photo sharing', tags: ['social', 'photos', 'authentic'], category: 'social-comms' },
    ],
  },
  {
    id: 'entertainment',
    name: 'Entertainment & Media',
    icon: '🎬',
    platforms: [
      { id: 'netflix', name: 'Netflix', url: 'https://www.netflix.com', emoji: '🎬', color: '#E50914', description: 'Netflix streaming service', tags: ['streaming', 'movies', 'tv', 'netflix'], category: 'entertainment' },
      { id: 'stan', name: 'Stan', url: 'https://www.stan.com.au', emoji: '📺', color: '#0072F5', description: 'Australian streaming platform', tags: ['streaming', 'movies', 'tv', 'australia'], category: 'entertainment' },
      { id: 'disney-plus', name: 'Disney+', url: 'https://www.disneyplus.com', emoji: '✨', color: '#113CCF', description: 'Disney, Marvel, Star Wars streaming', tags: ['streaming', 'movies', 'disney'], category: 'entertainment' },
      { id: 'binge', name: 'Binge', url: 'https://binge.com.au', emoji: '🍿', color: '#FF3366', description: 'Foxtel streaming service', tags: ['streaming', 'tv', 'foxtel', 'australia'], category: 'entertainment' },
      { id: 'paramount-plus', name: 'Paramount+', url: 'https://www.paramountplus.com/au', emoji: '⭐', color: '#0064FF', description: 'Paramount+ streaming in Australia', tags: ['streaming', 'movies', 'tv', 'australia'], category: 'entertainment' },
      { id: 'sbs-ondemand', name: 'SBS On Demand', url: 'https://www.sbs.com.au/ondemand', emoji: '🌏', color: '#E4003A', description: 'SBS free streaming service', tags: ['streaming', 'free', 'sbs', 'australia'], category: 'entertainment' },
      { id: 'abc-iview', name: 'ABC iview', url: 'https://iview.abc.net.au', emoji: '📡', color: '#000000', description: 'ABC free streaming service', tags: ['streaming', 'free', 'abc', 'australia'], category: 'entertainment' },
      { id: 'kayo', name: 'Kayo Sports', url: 'https://kayosports.com.au', emoji: '⚽', color: '#00D068', description: 'Australian sports streaming', tags: ['sports', 'streaming', 'australia'], category: 'entertainment' },
      { id: 'spotify', name: 'Spotify', url: 'https://open.spotify.com', emoji: '🎵', color: '#1DB954', description: 'Music and podcast streaming', tags: ['music', 'podcasts', 'streaming', 'spotify'], category: 'entertainment' },
      { id: 'apple-music', name: 'Apple Music', url: 'https://music.apple.com', emoji: '🍎', color: '#FA2D48', description: 'Apple music streaming service', tags: ['music', 'streaming', 'apple'], category: 'entertainment' },
      { id: 'youtube-music', name: 'YouTube Music', url: 'https://music.youtube.com', emoji: '🎶', color: '#FF0000', description: 'YouTube Music streaming', tags: ['music', 'streaming', 'youtube', 'google'], category: 'entertainment' },
      { id: 'amazon-prime-video', name: 'Prime Video', url: 'https://www.amazon.com.au/gp/video/storefront', emoji: '📽️', color: '#00A8E0', description: 'Amazon Prime Video streaming', tags: ['streaming', 'movies', 'tv', 'amazon'], category: 'entertainment' },
      { id: 'audible', name: 'Audible', url: 'https://www.audible.com.au', emoji: '🎧', color: '#F8991D', description: 'Audiobook and podcast service', tags: ['audiobooks', 'podcasts', 'amazon'], category: 'entertainment' },
      { id: 'kindle', name: 'Kindle', url: 'https://read.amazon.com', emoji: '📚', color: '#FF9900', description: 'Amazon Kindle ebooks', tags: ['ebooks', 'reading', 'amazon'], category: 'entertainment' },
      { id: 'steam', name: 'Steam', url: 'https://store.steampowered.com', emoji: '🎮', color: '#1B2838', description: 'PC gaming platform', tags: ['gaming', 'games', 'steam'], category: 'entertainment' },
      { id: 'epic-games', name: 'Epic Games', url: 'https://www.epicgames.com', emoji: '🕹️', color: '#2F2F2F', description: 'Epic Games Store', tags: ['gaming', 'games', 'epic'], category: 'entertainment' },
    ],
  },
  {
    id: 'news-info',
    name: 'News & Information',
    icon: '📰',
    platforms: [
      { id: 'abc-news', name: 'ABC News', url: 'https://www.abc.net.au/news', emoji: '📡', color: '#000000', description: 'Australian public broadcaster news', tags: ['news', 'australia', 'abc', 'public'], category: 'news-info' },
      { id: 'guardian-au', name: 'The Guardian Australia', url: 'https://www.theguardian.com/au', emoji: '🗞️', color: '#052962', description: 'Guardian Australian edition', tags: ['news', 'australia', 'journalism'], category: 'news-info' },
      { id: 'the-age', name: 'The Age', url: 'https://www.theage.com.au', emoji: '📰', color: '#003087', description: 'Melbourne\'s The Age newspaper', tags: ['news', 'victoria', 'melbourne', 'australia'], category: 'news-info' },
      { id: 'smh', name: 'Sydney Morning Herald', url: 'https://www.smh.com.au', emoji: '📰', color: '#003087', description: 'Sydney Morning Herald', tags: ['news', 'nsw', 'sydney', 'australia'], category: 'news-info' },
      { id: 'herald-sun', name: 'Herald Sun', url: 'https://www.heraldsun.com.au', emoji: '🌞', color: '#E5001A', description: 'Melbourne\'s Herald Sun', tags: ['news', 'victoria', 'melbourne', 'australia'], category: 'news-info' },
      { id: 'the-australian', name: 'The Australian', url: 'https://www.theaustralian.com.au', emoji: '🇦🇺', color: '#222222', description: 'National broadsheet newspaper', tags: ['news', 'australia', 'national'], category: 'news-info' },
      { id: 'news-com-au', name: 'News.com.au', url: 'https://www.news.com.au', emoji: '📢', color: '#CC0000', description: 'News Corp Australia news site', tags: ['news', 'australia'], category: 'news-info' },
      { id: '9news', name: '9News', url: 'https://www.9news.com.au', emoji: '9️⃣', color: '#E0001B', description: '9News Australian news', tags: ['news', 'australia', 'tv'], category: 'news-info' },
      { id: '7news', name: '7News', url: 'https://7news.com.au', emoji: '7️⃣', color: '#E72929', description: '7News Australian news', tags: ['news', 'australia', 'tv'], category: 'news-info' },
      { id: 'sky-news', name: 'Sky News Australia', url: 'https://www.skynews.com.au', emoji: '🌤️', color: '#005DA0', description: 'Sky News Australia', tags: ['news', 'australia', 'tv'], category: 'news-info' },
      { id: 'saturday-paper', name: 'The Saturday Paper', url: 'https://www.thesaturdaypaper.com.au', emoji: '📋', color: '#D4A017', description: 'Quality independent Australian journalism', tags: ['news', 'australia', 'journalism', 'independent'], category: 'news-info' },
      { id: 'crikey', name: 'Crikey', url: 'https://www.crikey.com.au', emoji: '🦎', color: '#E5001A', description: 'Independent Australian news and commentary', tags: ['news', 'australia', 'independent', 'media'], category: 'news-info' },
      { id: 'pedestrian', name: 'Pedestrian.TV', url: 'https://www.pedestrian.tv', emoji: '🚶', color: '#FF3300', description: 'Australian youth culture and news', tags: ['news', 'australia', 'youth', 'culture'], category: 'news-info' },
      { id: 'junkee', name: 'Junkee', url: 'https://junkee.com', emoji: '🎯', color: '#FF4500', description: 'Australian youth media site', tags: ['news', 'australia', 'youth', 'culture'], category: 'news-info' },
    ],
  },
  {
    id: 'it-developer',
    name: 'IT & Development',
    icon: '🔧',
    platforms: [
      { id: 'github', name: 'GitHub', url: 'https://github.com', emoji: '🐙', color: '#181717', description: 'Code hosting and collaboration', tags: ['code', 'git', 'development', 'devops'], category: 'it-developer' },
      { id: 'gitlab', name: 'GitLab', url: 'https://gitlab.com', emoji: '🦊', color: '#FC6D26', description: 'DevOps platform and code hosting', tags: ['code', 'git', 'devops', 'ci-cd'], category: 'it-developer' },
      { id: 'bitbucket', name: 'Bitbucket', url: 'https://bitbucket.org', emoji: '🪣', color: '#0052CC', description: 'Atlassian code hosting platform', tags: ['code', 'git', 'atlassian', 'devops'], category: 'it-developer' },
      { id: 'vscode-web', name: 'VS Code Web', url: 'https://vscode.dev', emoji: '💻', color: '#007ACC', description: 'Visual Studio Code in the browser', tags: ['code', 'editor', 'ide', 'microsoft'], category: 'it-developer' },
      { id: 'aws-console', name: 'AWS Console', url: 'https://console.aws.amazon.com', emoji: '☁️', color: '#FF9900', description: 'Amazon Web Services management console', tags: ['cloud', 'aws', 'devops', 'infrastructure'], category: 'it-developer' },
      { id: 'azure-portal', name: 'Azure Portal', url: 'https://portal.azure.com', emoji: '🔷', color: '#0089D6', description: 'Microsoft Azure cloud portal', tags: ['cloud', 'azure', 'microsoft', 'devops'], category: 'it-developer' },
      { id: 'gcp-console', name: 'Google Cloud Console', url: 'https://console.cloud.google.com', emoji: '🔵', color: '#4285F4', description: 'Google Cloud Platform console', tags: ['cloud', 'gcp', 'google', 'devops'], category: 'it-developer' },
      { id: 'cloudflare', name: 'Cloudflare', url: 'https://dash.cloudflare.com', emoji: '🌐', color: '#F48120', description: 'Cloudflare dashboard and DNS', tags: ['dns', 'cdn', 'security', 'devops'], category: 'it-developer' },
      { id: 'netlify', name: 'Netlify', url: 'https://app.netlify.com', emoji: '🔷', color: '#00C7B7', description: 'Web hosting and deployment platform', tags: ['hosting', 'deployment', 'jamstack'], category: 'it-developer' },
      { id: 'vercel', name: 'Vercel', url: 'https://vercel.com', emoji: '▲', color: '#000000', description: 'Frontend cloud deployment platform', tags: ['hosting', 'deployment', 'frontend', 'nextjs'], category: 'it-developer' },
      { id: 'firebase-console', name: 'Firebase Console', url: 'https://console.firebase.google.com', emoji: '🔥', color: '#FFCA28', description: 'Google Firebase project console', tags: ['firebase', 'google', 'backend', 'devops'], category: 'it-developer' },
      { id: 'heroku', name: 'Heroku', url: 'https://dashboard.heroku.com', emoji: '💜', color: '#430098', description: 'Cloud application platform', tags: ['hosting', 'deployment', 'cloud'], category: 'it-developer' },
      { id: 'digitalocean', name: 'DigitalOcean', url: 'https://cloud.digitalocean.com', emoji: '🌊', color: '#0080FF', description: 'Cloud infrastructure provider', tags: ['cloud', 'hosting', 'infrastructure'], category: 'it-developer' },
      { id: 'docker-hub', name: 'Docker Hub', url: 'https://hub.docker.com', emoji: '🐳', color: '#2496ED', description: 'Docker container registry', tags: ['docker', 'containers', 'devops'], category: 'it-developer' },
      { id: 'stackoverflow', name: 'Stack Overflow', url: 'https://stackoverflow.com', emoji: '📚', color: '#F58025', description: 'Developer Q&A community', tags: ['development', 'qa', 'community', 'programming'], category: 'it-developer' },
      { id: 'dev-to', name: 'Dev.to', url: 'https://dev.to', emoji: '👨‍💻', color: '#0A0A0A', description: 'Developer community and articles', tags: ['development', 'community', 'articles'], category: 'it-developer' },
      { id: 'npm', name: 'npm', url: 'https://www.npmjs.com', emoji: '📦', color: '#CB3837', description: 'Node package manager registry', tags: ['javascript', 'packages', 'nodejs'], category: 'it-developer' },
      { id: 'pypi', name: 'PyPI', url: 'https://pypi.org', emoji: '🐍', color: '#3572A5', description: 'Python package index', tags: ['python', 'packages', 'programming'], category: 'it-developer' },
      { id: 'postman', name: 'Postman', url: 'https://web.postman.co', emoji: '📮', color: '#FF6C37', description: 'API development and testing platform', tags: ['api', 'testing', 'development'], category: 'it-developer' },
      { id: 'figma', name: 'Figma', url: 'https://www.figma.com', emoji: '🎨', color: '#F24E1E', description: 'Collaborative interface design tool', tags: ['design', 'ui', 'ux', 'collaboration'], category: 'it-developer' },
      { id: 'linear', name: 'Linear', url: 'https://linear.app', emoji: '📐', color: '#5E6AD2', description: 'Modern issue tracking for software teams', tags: ['project', 'issues', 'development', 'agile'], category: 'it-developer' },
      { id: 'sentry', name: 'Sentry', url: 'https://sentry.io', emoji: '🔍', color: '#362D59', description: 'Application error monitoring', tags: ['monitoring', 'errors', 'debugging', 'devops'], category: 'it-developer' },
    ],
  },
  {
    id: 'home-property',
    name: 'Home & Property',
    icon: '🏠',
    platforms: [
      { id: 'realestate', name: 'realestate.com.au', url: 'https://www.realestate.com.au', emoji: '🏡', color: '#E91E1E', description: 'Australia\'s number one property site', tags: ['property', 'real estate', 'buying', 'renting', 'australia'], category: 'home-property' },
      { id: 'domain', name: 'Domain', url: 'https://www.domain.com.au', emoji: '🏘️', color: '#003087', description: 'Domain property portal', tags: ['property', 'real estate', 'buying', 'renting', 'australia'], category: 'home-property' },
      { id: 'homely', name: 'Homely', url: 'https://www.homely.com.au', emoji: '🏠', color: '#00B140', description: 'Homely property search Australia', tags: ['property', 'real estate', 'australia'], category: 'home-property' },
      { id: 'allhomes', name: 'Allhomes', url: 'https://www.allhomes.com.au', emoji: '🏙️', color: '#003087', description: 'ACT and region property listings', tags: ['property', 'act', 'canberra', 'australia'], category: 'home-property' },
      { id: 'corelogic', name: 'CoreLogic', url: 'https://www.corelogic.com.au', emoji: '📊', color: '#003087', description: 'Property data and analytics', tags: ['property', 'data', 'analytics', 'australia'], category: 'home-property' },
      { id: 'pexa', name: 'PEXA', url: 'https://www.pexa.com.au', emoji: '📝', color: '#00539F', description: 'Property exchange and settlement platform', tags: ['property', 'settlement', 'legal', 'australia'], category: 'home-property' },
      { id: 'airtasker', name: 'Airtasker', url: 'https://www.airtasker.com', emoji: '🔨', color: '#1CB6E0', description: 'Find local services and tasks', tags: ['services', 'tasks', 'local', 'australia'], category: 'home-property' },
      { id: 'hipages', name: 'Hipages', url: 'https://hipages.com.au', emoji: '🏗️', color: '#FF5733', description: 'Find trusted tradies online', tags: ['trades', 'services', 'home', 'australia'], category: 'home-property' },
      { id: 'origin', name: 'Origin Energy', url: 'https://www.originenergy.com.au', emoji: '💡', color: '#FF6900', description: 'Origin Energy account management', tags: ['energy', 'electricity', 'gas', 'utilities', 'australia'], category: 'home-property' },
      { id: 'agl', name: 'AGL', url: 'https://www.agl.com.au', emoji: '⚡', color: '#E30613', description: 'AGL Energy account management', tags: ['energy', 'electricity', 'gas', 'utilities', 'australia'], category: 'home-property' },
      { id: 'energy-australia', name: 'EnergyAustralia', url: 'https://www.energyaustralia.com.au', emoji: '🔌', color: '#003087', description: 'EnergyAustralia account management', tags: ['energy', 'electricity', 'utilities', 'australia'], category: 'home-property' },
      { id: 'optus', name: 'Optus', url: 'https://www.optus.com.au/myaccount', emoji: '📱', color: '#5DDE78', description: 'Optus account management', tags: ['telco', 'mobile', 'internet', 'australia'], category: 'home-property' },
      { id: 'telstra', name: 'Telstra', url: 'https://www.telstra.com.au/my-account', emoji: '📶', color: '#005AC1', description: 'Telstra account management', tags: ['telco', 'mobile', 'internet', 'australia'], category: 'home-property' },
      { id: 'aussie-broadband', name: 'Aussie Broadband', url: 'https://my.aussiebroadband.com.au', emoji: '🌐', color: '#F68B1F', description: 'Aussie Broadband account management', tags: ['internet', 'nbn', 'australia'], category: 'home-property' },
      { id: 'iinet', name: 'iiNet', url: 'https://www.iinet.net.au/myiinet', emoji: '📡', color: '#003087', description: 'iiNet internet account management', tags: ['internet', 'nbn', 'australia'], category: 'home-property' },
    ],
  },
]

// Flat list of all platforms for search
export const ALL_PLATFORMS = PLATFORM_CATEGORIES.flatMap(cat => cat.platforms)

/**
 * Fuzzy search across platforms by name, description, and tags.
 * Returns results sorted by relevance score.
 */
export function searchPlatforms(query) {
  if (!query || query.trim() === '') return ALL_PLATFORMS

  const q = query.toLowerCase().trim()
  const words = q.split(/\s+/)

  const scored = ALL_PLATFORMS.map(platform => {
    const nameLower = platform.name.toLowerCase()
    const descLower = (platform.description || '').toLowerCase()
    const tagsStr = (platform.tags || []).join(' ').toLowerCase()
    const combined = `${nameLower} ${descLower} ${tagsStr}`

    let score = 0

    // Exact name match — highest weight
    if (nameLower === q) score += 100
    // Name starts with query
    else if (nameLower.startsWith(q)) score += 60
    // Name contains query
    else if (nameLower.includes(q)) score += 40

    // Word-level matches
    words.forEach(word => {
      if (nameLower.includes(word)) score += 20
      if (tagsStr.includes(word)) score += 10
      if (descLower.includes(word)) score += 5
    })

    return { platform, score }
  })

  return scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ platform }) => platform)
}

/**
 * Get a platform by ID.
 */
export function getPlatformById(id) {
  return ALL_PLATFORMS.find(p => p.id === id) || null
}

/**
 * Get platforms by category ID.
 */
export function getPlatformsByCategory(categoryId) {
  return ALL_PLATFORMS.filter(p => p.category === categoryId)
}

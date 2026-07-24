import { Link } from 'react-router-dom'

const UPDATED = '24 July 2026'

function Section({ title, children }) {
  return (
    <section className="space-y-3">
      <h2 className="text-base font-semibold text-text border-b border-border pb-2">{title}</h2>
      <div className="text-sm text-muted leading-relaxed space-y-2">{children}</div>
    </section>
  )
}

function Row({ label, children }) {
  return (
    <div className="flex gap-3">
      <span className="shrink-0 font-medium text-text/70 w-40">{label}</span>
      <span>{children}</span>
    </div>
  )
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <div className="max-w-2xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-10">
          <Link to="/" className="inline-flex items-center gap-2 text-xs text-muted hover:text-text mb-8 transition-colors">
            <span>←</span> Back
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-violet-600 flex items-center justify-center text-xl shadow-lg shadow-accent/20">
              🛩️
            </div>
            <span className="font-bold text-lg">GYST</span>
          </div>
          <h1 className="text-2xl font-bold text-text mb-1">Privacy Policy</h1>
          <p className="text-xs text-muted">Last updated: {UPDATED}</p>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-8 space-y-8">

          <Section title="Who we are">
            <p>
              GYST ("Get Your Stuff Together") is a personal dashboard application that lets you
              organise links, widgets, and productivity tools in one place. It is operated by Bibek
              Wagle.
            </p>
            <p>
              This policy explains what data we collect, why, and your rights under the
              <strong className="text-text"> Australian Privacy Act 1988 (Cth)</strong> and the
              Australian Privacy Principles (APPs).
            </p>
          </Section>

          <Section title="What data we collect">
            <p className="font-medium text-text/80">1. Account information</p>
            <p>
              When you sign up, <strong className="text-text">Firebase Authentication</strong>{' '}
              (Google) stores your email address and a unique user ID. This is required to
              identify your account and is processed on Google's servers in Ireland.
            </p>

            <p className="font-medium text-text/80 pt-1">2. Dashboard data</p>
            <p>
              Your layout, saved links, category structure, and widget settings are stored in
              <strong className="text-text"> Firebase Firestore</strong> under your user ID.
              Only you can read or write your own data — no other user or administrator has
              access.
            </p>

            <p className="font-medium text-text/80 pt-1">3. Location (optional)</p>
            <p>
              If you allow location access in the weather widget or info bar, your device
              coordinates are sent directly to{' '}
              <strong className="text-text">Open-Meteo</strong> (open-meteo.com) to fetch local
              conditions. This is fully optional — you may use Melbourne as a default instead.
              GYST does not store or log your coordinates.
            </p>

            <p className="font-medium text-text/80 pt-1">4. News feed requests</p>
            <p>
              When you use the News widget, RSS headlines are fetched via{' '}
              <strong className="text-text">corsproxy.io</strong>. No personal data is included
              in these requests — only the public RSS feed URL.
            </p>
          </Section>

          <Section title="What we do NOT collect">
            <ul className="list-none space-y-1">
              {[
                'Names, phone numbers, or physical addresses',
                'Payment or financial information',
                'Personal files or documents',
                'Browsing history or activity outside GYST',
                'Analytics, tracking pixels, or advertising identifiers',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="How we use your data">
            <p>
              Your data is used solely to provide the GYST dashboard service — to display your
              layout when you log in and to save changes you make. We do not sell, share, or use
              your data for advertising or profiling.
            </p>
          </Section>

          <Section title="Third-party services">
            <div className="space-y-2">
              <Row label="Firebase (Google)">
                Authentication and database storage.{' '}
                <a
                  href="https://firebase.google.com/support/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Privacy Policy
                </a>
              </Row>
              <Row label="Open-Meteo">
                Weather data (no account required, no personal data sent).{' '}
                <a
                  href="https://open-meteo.com/en/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Terms
                </a>
              </Row>
              <Row label="corsproxy.io">
                CORS proxy for public RSS news feeds.
              </Row>
              <Row label="Google Fonts">
                Typography loaded from fonts.googleapis.com and fonts.gstatic.com.
              </Row>
            </div>
          </Section>

          <Section title="Data retention">
            <p>
              Your dashboard data is retained for as long as your account exists. Deleting your
              account removes all associated data from Firestore. Firebase Authentication data
              (your email) is also deleted at that point.
            </p>
          </Section>

          <Section title="Your rights">
            <p>Under the Australian Privacy Act 1988 you have the right to:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your account and associated data</li>
              <li>Complain to the <strong className="text-text">Office of the Australian Information Commissioner</strong> (OAIC) if you believe your privacy has been breached</li>
            </ul>
          </Section>

          <Section title="Contact">
            <p>
              For privacy enquiries or to exercise your rights, contact:{' '}
              <a
                href="mailto:bibekdon052@gmail.com"
                className="text-accent hover:underline"
              >
                bibekdon052@gmail.com
              </a>
            </p>
            <p>
              We will respond to privacy requests within 30 days, in line with APP 12.
            </p>
          </Section>

          <p className="text-xs text-muted/50 border-t border-border pt-6">
            This Privacy Policy is governed by the Australian Privacy Act 1988 (Cth) and the
            Australian Privacy Principles. It was last reviewed on {UPDATED}.
          </p>
        </div>
      </div>
    </div>
  )
}

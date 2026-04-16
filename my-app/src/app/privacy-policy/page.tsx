import Link from "next/link"

export const metadata = {
  title: "Privacy Policy | Digital Diary",
  description: "Privacy Policy for ACM SIGCHI Digital Diary",
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <nav className="mb-8">
          <Link href="/" className="text-sm text-muted-foreground hover:underline">
            ← Back to home
          </Link>
        </nav>

        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Last updated: April 16, 2026
        </p>

        <section className="space-y-6 leading-relaxed">
          <p>
            This Privacy Policy describes how ACM SIGCHI Digital Diary (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the Service&rdquo;)
            collects, uses, and protects information when you use our application at
            https://acm-sigchi-digitaldiary.org.
          </p>

          <div>
            <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
            <p className="mb-3">
              <strong>Information you provide.</strong> When you sign in with Google, we
              receive your basic Google profile information (name, email address, Google
              account identifier, and profile picture). We also store the journal
              entries, text, images, audio, and other media and metadata that you
              choose to create or upload to the Service.
            </p>
            <p className="mb-3">
              <strong>Information collected automatically.</strong> When you use the
              Service, our servers automatically record certain information, including
              your IP address, browser type, device information, pages visited,
              referring URLs, timestamps, and diagnostic/usage data used to operate and
              troubleshoot the Service.
            </p>
            <p>
              <strong>Persistent identifiers.</strong> We use session cookies and a
              persistent account identifier tied to your Google account to authenticate
              you and to recognize returning users.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">2. How We Use Information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To authenticate you and maintain your account.</li>
              <li>To store and display your journal entries and associated media.</li>
              <li>To enable features you opt into, such as sharing entries with friends.</li>
              <li>To improve the reliability and functionality of the Service.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">3. Google User Data</h2>
            <p>
              Our use of information received from Google APIs adheres to the{" "}
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Google API Services User Data Policy
              </a>
              , including the Limited Use requirements. We do not sell Google user data
              and do not use it for advertising.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">4. Data Sharing</h2>
            <p className="mb-3">
              We do not sell or rent your personal information. We share data only in
              the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Service providers:</strong> with hosting, database, storage, and
                infrastructure providers that process data on our behalf to operate the
                Service.
              </li>
              <li>
                <strong>Other users:</strong> only when you explicitly choose to share an
                entry (for example, with a friend or publicly).
              </li>
              <li>
                <strong>Legal requirements:</strong> when required by law, subpoena, or
                to protect the rights, safety, or property of users or the public.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">4a. User Rights</h2>
            <p>
              You may access, update, export, or delete your entries at any time from
              within the Service. You may also request deletion of your account and
              associated data by contacting us at the email below.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">5. Data Retention and Deletion</h2>
            <p>
              Your entries are retained until you delete them or delete your account.
              You can request account and data deletion at any time by contacting us at
              the email below.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">6. Security</h2>
            <p>
              We use reasonable technical and organizational measures to protect your
              data. No method of transmission or storage is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">7. Children&apos;s Privacy</h2>
            <p>
              The Service is not directed to children under 13, and we do not knowingly
              collect personal information from children under 13.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Material changes will
              be reflected by updating the &ldquo;Last updated&rdquo; date above.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">9. Contact</h2>
            <p>
              For questions about this Privacy Policy, contact us at{" "}
              <a href="mailto:shanmukh.upad@gmail.com" className="underline">
                shanmukh.upad@gmail.com
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

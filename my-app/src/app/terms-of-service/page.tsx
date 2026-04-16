import Link from "next/link"

export const metadata = {
  title: "Terms of Service | Digital Diary",
  description: "Terms of Service for ACM SIGCHI Digital Diary",
}

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <nav className="mb-8">
          <Link href="/" className="text-sm text-muted-foreground hover:underline">
            ← Back to home
          </Link>
        </nav>

        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Last updated: April 16, 2026
        </p>

        <section className="space-y-6 leading-relaxed">
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of
            ACM SIGCHI Digital Diary (the &ldquo;Service&rdquo;) at
            https://acm-sigchi-digitaldiary.org. By using the Service, you agree to these Terms.
          </p>

          <div>
            <h2 className="text-xl font-semibold mb-2">1. Eligibility</h2>
            <p>
              You must be at least 13 years old to use the Service. By using it, you
              represent that you meet this requirement.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">2. Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account
              credentials and for all activity that occurs under your account. Notify us
              promptly of any unauthorized use.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">3. Your Content</h2>
            <p>
              You retain ownership of the content you create (journal entries, media,
              etc.). By using the Service, you grant us a limited license to store,
              display, and process your content solely to operate the Service for you.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">4. Acceptable Use</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Do not use the Service for unlawful, harmful, or abusive activity.</li>
              <li>Do not attempt to disrupt, reverse-engineer, or gain unauthorized access to the Service.</li>
              <li>Do not upload content that infringes the rights of others.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">5. Termination</h2>
            <p>
              We may suspend or terminate your access to the Service at any time if you
              violate these Terms. You may stop using the Service and delete your
              account at any time.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">6. Disclaimer</h2>
            <p>
              The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
              without warranties of any kind, whether express or implied. We do not
              warrant that the Service will be uninterrupted or error-free.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">7. Intellectual Property</h2>
            <p>
              The Service, including its software, design, text, graphics, and other
              content we provide (excluding your content), is owned by us or our
              licensors and is protected by applicable intellectual property laws.
              You may not copy, modify, distribute, or create derivative works from
              the Service without our prior written permission.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">8. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless ACM SIGCHI Digital
              Diary and its operators from and against any claims, liabilities,
              damages, losses, and expenses (including reasonable legal fees) arising
              out of or in any way connected with your content, your use of the
              Service, or your violation of these Terms or applicable law.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, we will not be liable for any
              indirect, incidental, special, consequential, or punitive damages arising
              from or related to your use of the Service.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">10. Governing Law and Disputes</h2>
            <p>
              These Terms are governed by the laws of the jurisdiction in which the
              Service is operated, without regard to conflict-of-law principles. Any
              disputes arising out of or relating to these Terms or the Service will be
              resolved through good-faith negotiation; if unresolved, through binding
              arbitration or the competent courts of that jurisdiction, except where
              prohibited by applicable law. Users in the EU/UK may also have access to
              mediation and other dispute-resolution remedies available under local law.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">11. Changes to the Terms</h2>
            <p>
              We may update these Terms from time to time. Continued use of the Service
              after changes become effective constitutes acceptance of the updated Terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">12. Contact</h2>
            <p>
              Questions about these Terms? Contact us at{" "}
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

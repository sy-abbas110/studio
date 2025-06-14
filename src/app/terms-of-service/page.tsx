import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto py-12 md:py-20 px-4">
      <Card className="max-w-3xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-headline text-primary">Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-foreground/80">
          <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>

          <h2 className="text-xl font-semibold font-headline text-primary pt-4">1. Agreement to Terms</h2>
          <p>By accessing or using the Jai Bharat Management Hub ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, then you may not access the Service.</p>

          <h2 className="text-xl font-semibold font-headline text-primary pt-4">2. Use of Service</h2>
          <p>The Service is provided to help manage student-related workflows for Jai Bharat Paramedical Institute of Management Groups. You agree to use the Service only for lawful purposes and in accordance with these Terms.</p>
          <p>You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password.</p>

          <h2 className="text-xl font-semibold font-headline text-primary pt-4">3. User Accounts</h2>
          <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
          <p>Admin accounts are subject to approval by institute authorities. The institute reserves the right to refuse service, terminate accounts, remove or edit content in its sole discretion.</p>

          <h2 className="text-xl font-semibold font-headline text-primary pt-4">4. Intellectual Property</h2>
          <p>The Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of Jai Bharat Paramedical Institute of Management Groups and its licensors. The Service is protected by copyright, trademark, and other laws of both India and foreign countries.</p>

          <h2 className="text-xl font-semibold font-headline text-primary pt-4">5. Accuracy of Information</h2>
          <p>While we strive to provide accurate information, we do not warrant that all information on the Service is accurate, complete, or current. We reserve the right to correct any errors, inaccuracies or omissions and to change or update information at any time without prior notice.</p>
          <p>Users are responsible for the accuracy of the data they input into the system, including student details, academic records, and certificate information.</p>

          <h2 className="text-xl font-semibold font-headline text-primary pt-4">6. Termination</h2>
          <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
          <p>Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service or request account deletion through appropriate channels.</p>
          
          <h2 className="text-xl font-semibold font-headline text-primary pt-4">7. Limitation of Liability</h2>
          <p>In no event shall Jai Bharat Paramedical Institute of Management Groups, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>

          <h2 className="text-xl font-semibold font-headline text-primary pt-4">8. Governing Law</h2>
          <p>These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.</p>

          <h2 className="text-xl font-semibold font-headline text-primary pt-4">9. Changes to Terms</h2>
          <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
          <p>By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>

          <h2 className="text-xl font-semibold font-headline text-primary pt-4">10. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at info@jbi.ac.in.</p>
        </CardContent>
      </Card>
    </div>
  );
}

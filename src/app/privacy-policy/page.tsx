import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-12 md:py-20 px-4">
      <Card className="max-w-3xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-headline text-primary">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-foreground/80">
          <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-semibold font-headline text-primary pt-4">1. Introduction</h2>
          <p>Welcome to Jai Bharat Management Hub. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at info@jbi.ac.in.</p>

          <h2 className="text-xl font-semibold font-headline text-primary pt-4">2. Information We Collect</h2>
          <p>We collect personal information that you voluntarily provide to us when you register on the Hub, express an interest in obtaining information about us or our products and services, when you participate in activities on the Hub or otherwise when you contact us.</p>
          <p>The personal information that we collect depends on the context of your interactions with us and the Hub, the choices you make and the products and features you use. The personal information we collect may include the following: names; phone numbers; email addresses; mailing addresses; usernames; passwords; contact preferences; contact or authentication data; student academic records; and other similar information.</p>

          <h2 className="text-xl font-semibold font-headline text-primary pt-4">3. How We Use Your Information</h2>
          <p>We use personal information collected via our Hub for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
          <ul className="list-disc list-inside pl-4 space-y-1">
            <li>To facilitate account creation and logon process.</li>
            <li>To manage student records and academic progress.</li>
            <li>To send administrative information to you.</li>
            <li>To manage your information and accounts.</li>
            <li>To respond to user inquiries/offer support to users.</li>
          </ul>

          <h2 className="text-xl font-semibold font-headline text-primary pt-4">4. Will Your Information Be Shared With Anyone?</h2>
          <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We may process or share your data that we hold based on the following legal basis: Consent, Legitimate Interests, Performance of a Contract, Legal Obligations.</p>
          
          <h2 className="text-xl font-semibold font-headline text-primary pt-4">5. How Long Do We Keep Your Information?</h2>
          <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements).</p>

          <h2 className="text-xl font-semibold font-headline text-primary pt-4">6. How Do We Keep Your Information Safe?</h2>
          <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.</p>

          <h2 className="text-xl font-semibold font-headline text-primary pt-4">7. Your Privacy Rights</h2>
          <p>Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, change that information, or delete it in some circumstances. To request to review, update, or delete your personal information, please contact us.</p>

          <h2 className="text-xl font-semibold font-headline text-primary pt-4">8. Updates To This Notice</h2>
          <p>We may update this privacy notice from time to time. The updated version will be indicated by an updated "Last updated" date and the updated version will be effective as soon as it is accessible.</p>

          <h2 className="text-xl font-semibold font-headline text-primary pt-4">9. How Can You Contact Us About This Notice?</h2>
          <p>If you have questions or comments about this notice, you may email us at info@jbi.ac.in or by post to: Jai Bharat Paramedical Institute of Management Groups, Ghazipur, Uttar Pradesh, India.</p>
        </CardContent>
      </Card>
    </div>
  );
}

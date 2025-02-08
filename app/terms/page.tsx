const TermsAndConditions = () => {
    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>

                <div className="space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold mb-4">1. Agreement to Terms</h2>
                        <p>
                            By accessing or using skillwave.io, you agree to be bound by these Terms and Conditions.
                            If you disagree with any part of the terms, you do not have permission to access the service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4">2. User Accounts</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>You are responsible for maintaining the security of your account</li>
                            <li>You are responsible for all activities that occur under your account</li>
                            <li>You must notify us immediately of any unauthorized use of your account</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4">3. Course Creation and Content</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>You retain ownership of content you create and upload</li>
                            <li>You grant us license to host and display your content</li>
                            <li>You must have rights to content you upload</li>
                            <li>Content must not violate any laws or rights of others</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4">4. Payments and Refunds</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>All payments are processed securely through Stripe</li>
                            <li>Course creators receive payouts according to our payment schedule</li>
                            <li>Refunds are handled according to our refund policy</li>
                            <li>We reserve the right to modify pricing at any time</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4">5. Prohibited Activities</h2>
                        <p className="mb-4">Users may not:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Violate any laws or regulations</li>
                            <li>Infringe on intellectual property rights</li>
                            <li>Share malicious code or content</li>
                            <li>Attempt to gain unauthorized access to our systems</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4">6. Termination</h2>
                        <p>
                            We reserve the right to terminate or suspend accounts for violations of these terms,
                            without prior notice or liability.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-4">7. Contact Information</h2>
                        <p>
                            For any questions about these Terms, please contact us at{' '}
                            <a href="mailto:info@skillwave.io" className="text-blue-500 hover:text-blue-600">
                                info@skillwave.io
                            </a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions; 
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Button } from "@nextui-org/button"
import { CheckCircle } from "lucide-react"

export default function VerifyRequest() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="flex flex-col items-center gap-2 pb-0 pt-6">
                    <CheckCircle className="h-12 w-12 text-success" />
                    <h2 className="text-2xl font-bold">Check your inbox</h2>
                </CardHeader>
                <CardBody className="flex flex-col items-center gap-4 text-center">
                    <p className="text-medium">
                        We&apos;ve sent you a magic link to your email address.
                        Click the link to sign in to your account.
                    </p>
                    <p className="text-small text-default-400">
                        If you don&apos;t see the email, check your spam folder.
                    </p>
                </CardBody>
            </Card>
        </div>
    )
}
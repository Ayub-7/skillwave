import { Button } from "@nextui-org/button"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Divider } from "@nextui-org/divider"
import { FcGoogle } from "react-icons/fc"
import { signIn } from '@/auth';

export default function SignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center gap-4 pb-8 pt-6">
          <h1 className="text-2xl font-bold">Welcome to Skill Wave</h1>
          <p className="text-center text-sm text-default-500">
            Sign in to access your account
          </p>
        </CardHeader>
        <CardBody className="flex flex-col gap-6">
          {/* Google Sign In */}
          <form
            action={async () => {
              "use server"
              await signIn("google", { redirectTo: "/dashboard" })
            }}
          >
            <Button
              startContent={<FcGoogle className="h-5 w-5" />}
              //color="primary"
              variant="flat"
              className="w-full"
              type="submit"
            >
              Continue with Google
            </Button>
          </form>

          <div className="flex items-center gap-2">
            <Divider className="flex-1" />
            <span className="text-sm text-default-400">OR</span>
            <Divider className="flex-1" />
          </div>

          {/* Email Sign In */}
          <form
            action={async (formData) => {
              "use server";
              formData.append("redirectTo", "/dashboard");
              await signIn("resend", formData);
            }}
            className="space-y-4 w-full"
          >
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Button
              type="submit"
              className="w-full px-4 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Continue with Email
            </Button>
          </form>

          <p className="text-center text-sm text-default-400">
            By continuing, you agree to our{" "}
            <a href="/terms" className="text-primary">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-primary">
              Privacy Policy
            </a>
          </p>
        </CardBody>
      </Card>
    </div >
  )
}
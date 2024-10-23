"use client"

import { signInAction } from "@/app/lib/actions"
import { Button } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Divider } from "@nextui-org/divider"
import { Image } from "@nextui-org/image"
import { FcGoogle } from "react-icons/fc"
import { useState } from "react"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState({
    google: false,
    email: false
  })

  const handleGoogleSignIn = async () => {
    setIsLoading(prev => ({ ...prev, google: true }))
    try {
      await signInAction('google')
    } catch (error) {
      console.error('Unexpected error during Google sign-in:', error)
    } finally {
      setIsLoading(prev => ({ ...prev, google: false }))
    }
  }

  const handleEmailSignIn = async () => {
    setIsLoading(prev => ({ ...prev, email: true }))
    try {
      const formData = new FormData()
      formData.append('email', email)
      await signInAction('resend', formData)
    } catch (error) {
      console.error('Unexpected error during email sign-in:', error)
    } finally {
      setIsLoading(prev => ({ ...prev, email: false }))
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center gap-4 pb-8 pt-6">
          <Image
            src="/SW-dark-sm.png" // Replace with your logo path
            alt="Logo"
            width={150}
            height={80}
            className="object-contain"
          />
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-center text-sm text-default-500">
            Sign in to access your account
          </p>
        </CardHeader>
        <CardBody className="flex flex-col gap-6">
          {/* Google Sign In */}
          <Button
            startContent={<FcGoogle className="h-5 w-5" />}
            color="primary"
            variant="flat"
            onPress={handleGoogleSignIn}
            isLoading={isLoading.google}
            className="w-full"
          >
            Continue with Google
          </Button>

          <div className="flex items-center gap-2">
            <Divider className="flex-1" />
            <span className="text-sm text-default-400">OR</span>
            <Divider className="flex-1" />
          </div>

          {/* Email Sign In */}
          <div className="flex flex-col gap-4">
            <Input
              required
              type="email"
              label="Email"
              value={email}
              onValueChange={setEmail}
              variant="bordered"
              classNames={{
                input: "bg-transparent border-none focus:ring-0 space-y-10",
                innerWrapper: "bg-transparent",
                inputWrapper: "bg-transparent shadow-none",
              }}
            />
            <Button
              color="primary"
              onPress={handleEmailSignIn}
              isLoading={isLoading.email}
              className="w-full"
              isDisabled={email === ""}
            >
              Continue with Email
            </Button>
          </div>

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
    </div>
  )
}
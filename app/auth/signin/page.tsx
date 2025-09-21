"use client"
import { logIn } from "@/lib/actions/auth"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function SignInPage() {
  return (
    <main className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm text-white bg-black">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          {/* <Button variant="link">Sign Up</Button> */}
        </CardAction>
      </CardHeader>
      <CardContent>
        <form action={logIn}>
          {/* <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        <Button type="submit" className="w-full">
          Login
        </Button> */}
        <Button variant="outline" className="w-full cursor-pointer text-black hover:bg-gray-200">
          Login with Google
        </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
      </CardFooter>
    </Card>
    </main>
  )
}

    // <main className="flex justify-center items-center h-screen">
    //   <div className="p-6 rounded-lg shadow bg-black text-white">
    //     <h1 className="text-xl font-bold mb-4">Sign in</h1>
    //     <form
    //       action={logIn}
    //     >
    //       <button
    //         type="submit"
    //         className="px-4 py-2 text-white rounded"
    //       >
    //         Sign in with Google
    //       </button>
    //     </form>
    //   </div>
    // </main>
"use client"

// ---------------------Libs---------------------
import { signIn } from "next-auth/react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValues, useForm } from "react-hook-form"
// ---------------------Components---------------------
import { cn } from "@/lib/utils"
import { CgSpinner } from "react-icons/cg"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// ---------------------Icons---------------------
import { FcGoogle } from "react-icons/fc"
import { AiFillGithub } from "react-icons/ai"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(5, { message: "Password must be at least 5 characters" }).max(50),
})
type FormValues = z.infer<typeof schema>

export default function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (input: FieldValues) => {
    await signIn("credentials", {
      email: input.email,
      password: input.password,
      redirect: true,
      callbackUrl: "/",
    })
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              {...register("email")}
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
            {errors.email && <p className="mb-2 text-red-500">{String(errors.email?.message)}</p>}
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              {...register("password")}
              id="password"
              placeholder=""
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
            />
            {errors.password && (
              <p className="mb-2 text-red-500">{String(errors.password?.message)}</p>
            )}
          </div>
          <Button disabled={isLoading}>
            {isLoading && <CgSpinner size={20} className="mr-2 animate-spin" />}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or </span>
        </div>
      </div>

      <Button variant="outline" type="button" disabled={isLoading} onClick={() => signIn("google")}>
        {isLoading ? (
          <CgSpinner size={20} className="mr-2 animate-spin" />
        ) : (
          <FcGoogle size={20} className="mr-2" />
        )}{" "}
        Sign In with Google
      </Button>

      <Button variant="outline" type="button" disabled={isLoading} onClick={() => signIn("github")}>
        {isLoading ? (
          <CgSpinner size={20} className="mr-2 animate-spin" />
        ) : (
          <AiFillGithub size={20} className="mr-2" />
        )}{" "}
        Sign In with Github
      </Button>
    </div>
  )
}

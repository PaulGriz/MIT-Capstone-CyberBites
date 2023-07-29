"use client"

// ---------------------Libs---------------------
import axios from "axios"
import { signIn } from "next-auth/react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValues, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
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
  name: z
    .string()
    .min(4, { message: "Name must be at least 4 characters" })
    .max(50, { message: "Name must be less than 50 characters" }),
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

  const onSubmit = (input: FieldValues) => {
    const data = {
      name: input.name,
      email: input.email,
      password: input.password,
    }
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Registered!")
        // Login User after Successful Register
        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: true,
          callbackUrl: "/",
        })
      })
      .catch((error) => {
        toast.error(error)
      })
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              {...register("name")}
              id="name"
              placeholder="John Doe"
              type="text"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
            />
            {errors.name && <p className="mb-2 text-red-500">{String(errors.name?.message)}</p>}
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
            Sign Up
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
        Sign Up with Google
      </Button>

      <Button variant="outline" type="button" disabled={isLoading} onClick={() => signIn("github")}>
        {isLoading ? (
          <CgSpinner size={20} className="mr-2 animate-spin" />
        ) : (
          <AiFillGithub size={20} className="mr-2" />
        )}{" "}
        Sign Up with Github
      </Button>
    </div>
  )
}

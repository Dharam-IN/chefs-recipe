'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SigninSchema } from '@/schema/SigninSchema'
import axios, { AxiosError } from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { InfoIcon, Loader2 } from 'lucide-react'
import { FaGoogle } from 'react-icons/fa'
import { useState } from 'react'

const SignIn = () => {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      identifier: '',
      password: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof SigninSchema>) => {
    setIsSubmitting(true)
    try {
      const res = await signIn('credentials', {
        redirect: false,
        identifier: data.identifier,
        password: data.password
      })
      console.log(res)
      setIsSubmitting(false)
      if (res?.error) {
        toast({
          title: 'Login failed',
          description: res.error,
          variant: 'destructive'
        })
      } else {
        router.push('/share-recipe')
      }
    } catch (error) {
      console.log(error)
      setIsSubmitting(false)
      toast({
        title: 'An error occurred',
        variant: 'destructive'
      })
    }
  }

  return (
    <div className="flex justify-center items-center md:min-h-[70vh] min-h-[100%] p-10 bg-gray-100 dark:bg-gray-900">
      <div className="w-full md:w-[70%] p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Sign In
          </h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full font-bold">
              {isSubmitting ? (
                <>
                  Wait.. <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                <>Sign In</>
              )}
            </Button>
          </form>
        </Form>
        <p className="flex gap-3">
          <InfoIcon className="w-[20px]" />
          Only users can Sign in with Google, not chefs.
        </p>
        <button
          className={`flex items-center justify-center py-2 px-20 bg-white text-gray-700 dark:bg-gray-700 dark:text-white hover:bg-gray-200 focus:ring-blue-500 focus:ring-offset-blue-200 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-lg border border-primary focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg`}
          onClick={() => signIn('google')}
        >
          <FaGoogle />
          <span className="ml-2">Sign in with Google</span>
        </button>
      </div>
    </div>
  )
}

export default SignIn

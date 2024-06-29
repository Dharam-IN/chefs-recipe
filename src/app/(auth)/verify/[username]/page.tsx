'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTheme } from 'next-themes'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useParams } from 'next/navigation'
import axios, { AxiosError } from 'axios'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ApiResponse } from '@/types/ApiResponse'
import { Loader2 } from 'lucide-react'
import * as z from 'zod'
import { VerifyCodeSchema } from '@/schema/VerifyCode'

const VerifyAccount = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const params = useParams<{ username: string }>()
  const { theme } = useTheme()

  const form = useForm<z.infer<typeof VerifyCodeSchema>>({
    resolver: zodResolver(VerifyCodeSchema),
    defaultValues: {
      code: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof VerifyCodeSchema>) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post('/api/verify-code', {
        username: params.username,
        code: data.code
      })

      toast({
        title: 'Success',
        description: response.data.message,
        variant: 'default'
      })

      router.replace('/signin')
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      const errorMessage = axiosError.response?.data.message
      toast({
        title: 'Error in Verify Code',
        description: errorMessage,
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className={`flex justify-center items-center md:min-h-screen min-h-[70vh] md:px-0 px-5 bg-gray-100 dark:bg-gray-900`}
    >
      <div
        className={`w-full max-w-md p-8 space-y-4 bg-white text-gray-900 dark:bg-gray-800 dark:text-white rounded-lg shadow-md`}
      >
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Verify Your Account
          </h1>
          <p className="mb-4">Enter the verification code sent to your email</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Code" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gray-900 dark:text-white text-white w-full font-bold"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                </>
              ) : (
                'Submit'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default VerifyAccount

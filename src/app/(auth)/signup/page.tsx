"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { SignupSchema } from "@/schema/SignupSchema"
import { useState } from "react"
import axios, { AxiosError } from 'axios'
import { ApiResponse } from "@/types/ApiResponse"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"



export default function Signup() {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast()

    const formSchema = z.object({
        username: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
    })

    const form = useForm<z.infer<typeof SignupSchema>>({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            restaurant: '',
            gender: '',
            usertype: ''
        }
    })

    const userType = form.watch("usertype");
    const onSubmit = async (data: z.infer<typeof SignupSchema>) => {
        console.log(data)
        setIsSubmitting(true);
        try {
            const response = await axios.post<ApiResponse>('/api/signup', data);
            console.log(response)
            toast({
                description: response.data.message,
            })

        } catch (error) {
            console.log(error);
            const axiosError = error as AxiosError<ApiResponse>;
            let errorMessage = axiosError.response?.data.message;
            toast({
                title: errorMessage,
                variant: "destructive"
            })
        }finally{
            setIsSubmitting(false)
        }
    }

    return (
        <div className={`flex justify-center items-center md:min-h-[100vh] min-h-[80vh] md:px-0 px-5 py-5 bg-gray-100 dark:bg-gray-900`}>
            <div className="w-full md:w-[70%] p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Join Chef's Recipe
                    </h1>
                    <p className="mb-4">Sign up to Share Your Knowledge</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="usertype"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>User Type</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Please Select User Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Select</SelectLabel>
                                                    <SelectItem value="chef">Chef</SelectItem>
                                                    <SelectItem value="user">User</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
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
                                        <Input placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Select Your Gender</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Gender" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Select</SelectLabel>
                                                    <SelectItem value="male">Male</SelectItem>
                                                    <SelectItem value="female">Female</SelectItem>
                                                    <SelectItem value="Other">Other</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {userType === "chef" && (
                            <FormField
                                control={form.control}
                                name="restaurant"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Restaurant/Hotel Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Your Current Restaurant/Hotel Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                        {/* <FormField
                            control={form.control}
                            name="restaurant"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Restaurant/Hotel name is only for chefs</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Your Current Restaurant/Hotel Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                        <Button type="submit">{isSubmitting ? (<>Wait.. <Loader2 className="mr-2 h-4 w-4 animate-spin"/></>) : (<>Submit</>)}</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

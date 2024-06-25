import {z} from 'zod'

export const UsernameValidation = z.string()
    .min(3, "Username Must be At least 3 characters")
    .max(20, "Username Must be no more then 20 characters")
    .regex(/^[a-zA-Z0-9]{3,20}$/, "Username must not contain special characters, dots and should be between 3 to 20 characters")



export const SignupSchema = z.object({
    username: UsernameValidation,
    email: z.string().email(),
    password: z.string().min(6, "Password Must be Atleast 6 Characters"),
    restaurant: z.string(),
    gender: z.string(),
    usertype: z.string().min(3, "Please select User Type minim")
})
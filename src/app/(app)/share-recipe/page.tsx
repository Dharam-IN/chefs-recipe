"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Plus, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useDebounceCallback } from "usehooks-ts";
import { RecipeSchema } from "@/schema/RecipeSchema";
import { ApiResponse } from "@/types/ApiResponse";

const ShareRecipe = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof RecipeSchema>>({
        resolver: zodResolver(RecipeSchema),
        defaultValues: {
            title: "",
            description: "",
            author: "",
            tags: [],
            image: "",
            ingredients: [{ name: "", quantity: "" }],
            instructions: [""],
        },
    });

    const { handleSubmit, control, reset } = form;

    const onSubmit = async (data: z.infer<typeof RecipeSchema>) => {
      console.log(data)
        setIsSubmitting(true);
        try {
            const response = await axios.post<ApiResponse>("/api/add-recipe", data);
            console.log(response)
            toast({
                description: "Recipe added successfully!",
            });
            reset();
            // router.push("/recipes");
        } catch (error) {
            console.error(error);
            const axiosError = error as AxiosError<ApiResponse>;
            toast({
                title: axiosError.response?.data.message || "Error adding recipe",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen px-5 py-10 pt-20 bg-gray-100 dark:bg-gray-900">
            <div className="w-full md:w-2/3 lg:w-1/2 p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">Share a New Recipe</h1>
                    <p className="mb-4">Add your delicious recipes to our collection</p>
                </div>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Recipe Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description (Please provide a brief, one-line description)</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="author"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Author</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Author" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="tags"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tags (comma separated)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Tags" {...field} 
                                        onChange={(e) => {
                                          const tagsArray = e.target.value.split(",").map(tag => tag.trim());
                                          field.onChange(tagsArray);
                                      }}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Image URL" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="ingredients"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ingredients</FormLabel>
                                    <FormControl>
                                        <div className="space-y-4">
                                            {field.value.map((ingredient, index) => (
                                                <div key={index} className="flex space-x-4">
                                                    <Input
                                                        placeholder="Ingredient Name"
                                                        value={ingredient.name}
                                                        onChange={(e) => {
                                                            const newIngredients = [...field.value];
                                                            newIngredients[index].name = e.target.value;
                                                            field.onChange(newIngredients);
                                                        }}
                                                    />
                                                    <Input
                                                        placeholder="Quantity"
                                                        value={ingredient.quantity}
                                                        onChange={(e) => {
                                                            const newIngredients = [...field.value];
                                                            newIngredients[index].quantity = e.target.value;
                                                            field.onChange(newIngredients);
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => field.onChange([...field.value, { name: "", quantity: "" }])}
                                            >
                                                Add Ingredient <PlusIcon className="ml-2 w-5"/>
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="instructions"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Instructions</FormLabel>
                                    <FormControl>
                                        <div className="space-y-4">
                                            {field.value.map((instruction, index) => (
                                                <div key={index} className="space-y-2">
                                                    <Textarea
                                                        placeholder="Instruction"
                                                        value={instruction}
                                                        onChange={(e) => {
                                                            const newInstructions = [...field.value];
                                                            newInstructions[index] = e.target.value;
                                                            field.onChange(newInstructions);
                                                        }}
                                                    />
                                                    {field.value.length > 1 && (
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            onClick={() => {
                                                                const newInstructions = [...field.value];
                                                                newInstructions.splice(index, 1);
                                                                field.onChange(newInstructions);
                                                            }}
                                                        >
                                                            Remove
                                                        </Button>
                                                    )}
                                                </div>
                                            ))}
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => field.onChange([...field.value, ""])}
                                            >
                                                Add Instruction <PlusIcon className="ml-2 w-5"/>
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    Wait... <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                                </>
                            ) : (
                                "Submit Recipe"
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default ShareRecipe;

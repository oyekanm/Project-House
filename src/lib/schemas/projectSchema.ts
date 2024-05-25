import { z } from "zod";

const Application = z.object({
    url: z.string(),
    image: z.array(z.string()),
    videoId: z.string().optional(),
  })




export const projectSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    description: z.string().min(10,{message:"Description must be at least 10 characters."}),
    categoryId: z.string().min(5,{message:"Choose a category"}),
    url: z.string(),
    github: z.string(),
    stacks:z.array(z.string()),
    features:z.array(z.string()),
    application:Application.optional() 
  })

 

  
export const projectCategorySchema = z.object({
  name: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
})
export const projectStackSchema = z.object({
  name: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
})

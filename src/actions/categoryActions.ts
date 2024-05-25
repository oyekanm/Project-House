"use server"

import { db } from "@/lib/config/db";
import { projectCategorySchema } from "@/lib/schemas/projectSchema";
import { z } from "zod";


export const createCategory = async(category: z.infer<typeof projectCategorySchema>)=>{
    const result = projectCategorySchema.safeParse(category)

    const cate = result.data!


    if(result.success){
        try {
            // check db for incoming product details
            const unique = await db.category.findFirst({
              where: {
                name: cate?.name,
              },
            });
        
            if (unique) {
              return {
                error: `${unique.name} already exists!, try another name`,
              };
            }
        
            // create products
            const newProduct = await db.category.create({
              data: cate ,
            });
            return { data: newProduct };
          } catch (error) {
            console.log("error prisma",error);

          }
    }else{
        return{error:result.error.format()}
    }
    
    
}
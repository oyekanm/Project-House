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

export const updateCategory = async(category: z.infer<typeof projectCategorySchema>, id:string)=>{
  const result = projectCategorySchema.safeParse(category)

  const cate = result.data!


  if(result.success){
      try {
          // check db for incoming product details
          const unique = await db.category.findFirst({
            where: {
              id,
            },
          });
      
          if (!unique) {
            return {
              error: `unable to update a category that doesn't exist`,
            };
          }
      
          // create products
          const updatedProduct = await db.category.update({
            where:{id},
            data: cate ,
          });
          return { data: updatedProduct };
        } catch (error) {
          console.log("error prisma",error);

        }
  }else{
      return{error:result.error.format()}
  }
  
  
}


export const deleteCategory = async(id:string)=>{


      try {
          // check db for incoming product details
          const unique = await db.category.findFirst({
            where: {
              id,
            },
          });
      
          if (!unique) {
            return {
              error: `unable to delete a category that doesn't exist`,
            };
          }
      
          // create products
          const newProduct = await db.category.delete({
            where:{
              id,
            }
          });
          return { data: newProduct };
        } catch (error) {
          console.log("error prisma",error);

        }
  
  
}
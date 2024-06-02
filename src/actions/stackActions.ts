"use server"

import { db } from "@/lib/config/db";
import { projectStackSchema } from "@/lib/schemas/projectSchema";
import { z } from "zod";


export const createStack = async(stacks: z.infer<typeof projectStackSchema>)=>{
    const result = projectStackSchema.safeParse(stacks)

    const stack = result.data!


    if(result.success){
        try {
            // check db for incoming product details
            const unique = await db.stacks.findFirst({
              where: {
                name: stack?.name,
              },
            });
        
            if (unique) {
              return {
                error: `${unique.name} already exists!, try another name`,
              };
            }
        
            // create products
            const newProduct = await db.stacks.create({
              data: stack ,
            });
            return { data: newProduct };
          } catch (error) {
            console.log("error prisma",error);

          }
    }else{
        return{error:result.error.format()}
    }
    
    
}

export const updateStack = async(category: z.infer<typeof projectStackSchema>, id:string)=>{
  const result = projectStackSchema.safeParse(category)

  const cate = result.data!


  if(result.success){
      try {
          // check db for incoming product details
          const unique = await db.stacks.findFirst({
            where: {
              id,
            },
          });
      
          if (!unique) {
            return {
              error: `unable to update a stack that doesn't exist`,
            };
          }
      
          // create products
          const updatedStack = await db.stacks.update({
            where:{id},
            data: cate ,
          });
          return { data: updatedStack };
        } catch (error) {
          console.log("error prisma",error);

        }
  }else{
      return{error:result.error.format()}
  }
  
  
}


export const deleteStack = async(id:string)=>{


      try {
          // check db for incoming product details
          const unique = await db.stacks.findFirst({
            where: {
              id,
            },
          });
      
          if (!unique) {
            return {
              error: `unable to delete a stack that doesn't exist`,
            };
          }
      
          // create products
          const deletedStack = await db.stacks.delete({
            where:{
              id,
            }
          });
          return { data: deletedStack };
        } catch (error) {
          console.log("error prisma",error);

        }
  
  
}
import { db } from "@/lib/config/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
    const url = new URL(request.url);
  
    const id = url.searchParams.get("id");
  
    if (id) {
      try {
        const projects = await db.application.findFirst({
          where: {
            projectId:id,
          },
          include: {
           image:true,
           Project:{
            include:{
                stacks:true
            }
           },
           video:true
          },
        });
        return NextResponse.json(projects);
      } catch (error) {
        console.log(error);
      }
    } 
  }
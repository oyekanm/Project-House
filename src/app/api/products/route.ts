import { db } from "@/lib/config/db";
import { NextResponse } from "next/server";

// export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const url = new URL(request.url);

  const id = url.searchParams.get("id");

  if (id) {
    try {
      const projects = await db.project.findFirst({
        where: {
          id,
        },
        include: {
          Application: true,
          category: true,
          stacks: true,
        },
      });
      return NextResponse.json(projects);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const projects = await db.project.findMany({
        include: {
          Application: true,
          category: true,
          stacks: true,
        },
        orderBy:[
          {
            createdAt:"asc"
          }
        ]
      });
      return NextResponse.json(projects);
    } catch (error) {
      console.log(error);
    }
  }
}

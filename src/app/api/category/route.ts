import { db } from "@/lib/config/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const category = await db.category.findMany();
    return NextResponse.json(category);
  } catch (error) {
    console.log(error);
  }
}



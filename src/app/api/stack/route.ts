import { db } from "@/lib/config/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const stacks = await db.stacks.findMany();
    return NextResponse.json(stacks);
  } catch (error) {
    console.log(error);
  }
}
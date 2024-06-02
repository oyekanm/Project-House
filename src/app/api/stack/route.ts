import { db } from "@/lib/config/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const stacks = await db.stacks.findMany();
    return Response.json(stacks);
  } catch (error) {
    console.log(error);
  }
}
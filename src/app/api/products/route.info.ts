import { z } from "zod";

export const Route = {
  name: "ApiProducts",
  params: z.object({
  })
};

export const GET = {
  result: z.object({}),
};
export const POST = {
  body: z.object({}),
  result: z.object({}),
};
export const DELETE = {
};

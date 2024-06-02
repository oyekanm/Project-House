import { z } from "zod";

export const Route = {
  name: "ApiCategory",
  params: z.object({
  })
};

export const GET = {
  result: z.object({}),
};

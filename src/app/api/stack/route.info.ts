import { z } from "zod";

export const Route = {
  name: "ApiStack",
  params: z.object({
  })
};

export const GET = {
  result: z.object({}),
};

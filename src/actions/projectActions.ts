"use server";

import { db } from "@/lib/config/db";
import { projectSchema } from "@/lib/schemas/projectSchema";
import { z } from "zod";

export const createProject = async (project: z.infer<typeof projectSchema>) => {
  const results = projectSchema.safeParse(project);

  const projects = results.data!;

  if (results.success) {
    const {
      categoryId,
      description,
      features,
      github,
      name,
      stacks,
      url,
      application,
    } = projects;
    try {
      // check db for incoming product details
      const unique = await db.project.findFirst({
        where: {
          name: projects.name,
        },
      });

      if (unique) {
        return {
          error: `${unique.name} already exists!, try another another name`,
        };
      }

      // create project
      const newProject = await db.project.create({
        data: {
          name,
          description,
          github,
          url,
          categoryId,
          stacks: {
            connect: stacks.map((stack) => ({ id: stack })),
          },
          status: "NOAPP",
          Application: {
            create: {
              url: application!?.url,
              videoId: application?.videoId,
              image: {
                connect: application!?.image.map((app) => ({ id: app })),
              },
            },
          },
          features,
        },
      });
      return { data: newProject };
    } catch (error) {
      console.log(error);
    }
  } else {
    return { error: results.error.format() };
  }
};

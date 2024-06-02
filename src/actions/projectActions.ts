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
      status,
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
          status,
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
export const updateProject = async (
  category: z.infer<typeof projectSchema>,
  id: string
) => {
  const result = projectSchema.safeParse(category);

  const projects = result.data!;

  if (result.success) {
    const {
      categoryId,
      description,
      features,
      github,
      name,
      stacks,
      url,
      application,
      status,
    } = projects;
    try {
      // check db for incoming product details
      const unique = await db.project.findFirst({
        where: {
          id,
        },
      });

      if (!unique) {
        return {
          error: `unable to update a project that doesn't exist`,
        };
      }

      // create products
      const updatedProject = await db.project.update({
        where: { id },
        data: {
          name,
          description,
          github,
          url,
          categoryId,
          stacks: {
            connect: stacks.map((stack) => ({ id: stack })),
          },
          status,
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
      return { data: updatedProject };
    } catch (error) {
      console.log("error prisma", error);
    }
  } else {
    return { error: result.error.format() };
  }
};

export const deleteProject = async (id: string) => {
  try {
    // check db for incoming product details
    const unique = await db.project.findFirst({
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
    const deletedProject = await db.project.delete({
      where: {
        id,
      },
    });
    return { data: deletedProject };
  } catch (error) {
    console.log("error prisma", error);
  }
};

export const createApplication = async (
  category: z.infer<typeof projectSchema>,
  id: string
) => {
  const result = projectSchema.safeParse(category);

  const projects = result.data!;

  if (result.success) {
    const { application } = projects;
    try {
      // create application
      const updatedProject = await db.application.create({
        data: {
          url: application!?.url,
          videoId: application?.videoId,
          image: {
            connect: application!?.image.map((app) => ({ id: app.id })),
          },
          projectId:id
        },
      });
      return { data: updatedProject };
    } catch (error) {
      console.log("error prisma", error);
    }
  } else {
    return { error: result.error.format() };
  }
};

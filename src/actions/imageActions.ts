"use server";

import { db } from "@/lib/config/db";



export async function createImage(image:{
  url: string;
  key: string;
}) {
  

  try {
    // checking product availabilty
    const unique = await db.image.findFirst({
      where: {
        url: image.url,
        key:image.key,

      },
    });



    if (unique) {
      return {
        error: `Image already exists!, operation faild`,
      };
    }

  
    const createdImage = await db.image.create({
      data: image,
    });

    return { data: createdImage };
  } catch (error) {
    console.log(error);
  }
}
export async function createVideo(video:{
  url: string;
  key: string;
}) {
  

  try {
    // checking product availabilty
    const unique = await db.video.findFirst({
      where: {
        url: video.url,
        key:video.key,
      },
    });



    if (unique) {
      return {
        error: `Image already exists!, operation faild`,
      };
    }

  
    const createdVideo = await db.video.create({
      data: video,
    });

    return { data: createdVideo };
  } catch (error) {
    console.log(error);
  }
}
"use server";

import { db } from "@/lib/config/db";



export async function CreateImage(image:{
  url: string;
  key: string;
}[]) {
  

  try {
    // checking product availabilty
    const unique = await db.image.findFirst({
      where: {
        url: image[0].url,
        key:image[0].key,

      },
    });



    if (unique) {
      return {
        error: `Image already exists!, operation faild`,
      };
    }

  
    const createdImage = await db.image.createManyAndReturn({
      data: image?.map((inp) => ({
        key: inp.key,
        url: inp.url,
      })),
    });

    return { data: createdImage };
  } catch (error) {
    console.log(error);
  }
}
export async function CreateVideo(video:{
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
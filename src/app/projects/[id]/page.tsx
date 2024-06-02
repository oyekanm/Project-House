"use client"

import { Button } from '@/components/ui/button'
import { FetchData } from '@/lib/fetchers/getDatas'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type Props = {
    params: { id: string }
}

type Application = {
    id: string,
    url: string,
    image: { id: string, key: string, url: string }[],
    video: { id: string, key: string, url: string },
    Project: { name: string, description: string, stacks: { id: string, name: string }[], features: string[] }
}

export default function ProjectDetail({ params }: Props) {
    const { id } = params
    const { data, isLoading }: { data: Application, isLoading: boolean } = FetchData(`/api/application?id=${id}`)


    if (isLoading) {
        return <div className='Container text-center'>
            <Loader2 className="h-[4rem] w-[4rem] animate-spin mx-auto" />
        </div>
    }

    if (data) {
        const { image, url, video } = data

        return (
            <div className='Container md:w-[80%] mx-auto text-center grid gap-16'>
                <section>
                    <p className='text-[5rem] font-bold uppercase'>{data?.Project.name}</p>
                    <p className='text-[1.5rem] text-start font-medium '>{data?.Project.description}</p>
                </section>
                <section>
                    <p className='text-[1.5rem] '>This Project Was Made Using The Following Stacks</p>
                    <div className='flex gap-8 flex-wrap items-center justify-center w-full mx-auto mt-8'>
                        {
                            data?.Project.stacks.map((skill) => {
                                return (
                                    <span key={skill.id} className="text-white text-[1.2rem] font-semibold uppercase">
                                        {skill.name}
                                    </span>
                                );
                            })
                        }
                    </div>
                </section>
                <section>
                    <p className='text-[2.5rem] font-bold uppercase'>App Image Overview</p>
                    <div className='grid sm:grid-cols-3 gap-8 mt-8'>
                        {
                            image?.map(img => {
                                return <Image key={img.id} src={img.url} alt={img.key} width={200} height={700} className='w-full h-[500px] object-contain animate-in hover:scale-95' />
                            })
                        }
                    </div>
                </section>
                {
                    video &&
                    <section>
                        <p className='text-[2.5rem] font-bold uppercase'>App Video Overview</p>
                        <div className=' mt-8 flex items-center justify-center'>
                            {/* <iframe
                                src='https://firebasestorage.googleapis.com/v0/b/project-house-5421a.appspot.com/o/app%2Fvideos%2FVID-20190602-WA00051717302676772.mp4?alt=media&token=cc51b160-4caf-4007-bf66-0c7351883547'
                                allowFullScreen
                            /> */}
                            <video width="320" height="540" controls preload="none">
                                <source
                                    src={video.url}
                                    // src='https://firebasestorage.googleapis.com/v0/b/project-house-5421a.appspot.com/o/app%2Fvideos%2FVID-20190602-WA00051717302676772.mp4?alt=media&token=cc51b160-4caf-4007-bf66-0c7351883547'
                                    type="video/mp4" />

                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </section>
                }
                {
                    url && 
                    <div>
                        <a href={url}>
                            <Button variant={'ghost'} className='p-12 text-[2rem] font-medium'>
                                Click here to view the app
                            </Button>
                        </a>
                    </div>
                }
            </div>
        )
    }
}

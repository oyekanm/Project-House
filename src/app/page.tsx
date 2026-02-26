"use client"

import React from "react";
import { Loader2 } from "lucide-react";
import MotionSlot from "./_components/reuseable/motionSlot";
import { FetchData } from "@/lib/fetchers/getDatas";
import { AnyMxRecord } from "dns";
import ProjectCard from "./_components/ui/projectCard";
import { Projects } from "@/routes";


export default function Home() {
  const text = "text-[2rem] font-medium leading-[30px]"
  const title = "text-[3rem] font-semibold uppercase "
  const { data: Stacks, error, isLoading } = FetchData("/api/stack")
  const { data: Project, isLoading: ProjectLoading } = FetchData("/api/products")
  return (
    <div className="Container">
      <section className="mb-8">
        <MotionSlot
          className="home"
          initial={{
            clipPath: "polygon(0 100%, 0% 100%, 100% 100%, 100% 100%  )",
            opacity: 0,
          }}
          animate={{
            clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%) ",
            opacity: 1,
          }}
        >
          <p className="text-[1.8rem] font-semibold">Hi,</p>
          <p className="text-[2.5rem] font-semibold">I am Boluwatife</p>
        </MotionSlot>

        <div className="mt-12">
          <p className={title}>about me</p>
          <div className="grid gap-8 mt-4 pl-4 w-[600px] max-w-full">
            <p className={text}>
              I&apos;m a Front-End Engineer from Nigeria, I&apos;m a Graduate of
              University of Lagos.
            </p>
            <p className={text}>I develop Mobile Applications and Websites to enhance your digital presence.</p>
            <p className={text}>I have three years+ experience using various front-end technologies,</p>
            <p className={text}>and i write songs, i&apos;m currently writing a diss track for the people who make me feel discomfort, wait for it!!!</p>
          </div>
        </div>
      </section>
      <div className="my-16 ">
        <a href="mailto:enitanboluwatife5@gmail.com" className="text-[2.5rem] relative font-medium text-gray-400 work">
          Let&apos;s work
        </a>
      </div>

      <section>
        <p className={title}>projects</p>
        <div className="my-4">
          {ProjectLoading && <Loader2 className="h-[4rem] w-[4rem]  animate-spin mx-auto" />}
          <section className='grid sm:grid-cols-2 md:grid-cols-3 gap-8'>
            {
              Project?.slice(0, 5).map((project: any) => {
                return <ProjectCard key={project.id} item={project} />
              })
            }
            {!ProjectLoading && <Projects.Link className={"text-[1.7rem] font-medium flex items-center justify-center"}>
              see more...
            </Projects.Link>}
          </section>
        </div>
      </section>

      <section className="mt-8">
        <p className={title}>Skills & Technoligies</p>
        <p className="text-[1.8rem] font-medium leading-12 mt-4">
          Here are the Technologies and Framework i use, While constantly
          learning to improve my Skills.
        </p>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {isLoading && <Loader2 className="h-[4rem] w-[4rem] animate-spin mx-auto" />}
          {Stacks ? Stacks?.map((skill: any) => {
            return (
              <span key={skill.id} className="text-[1.1rem] sm:text-[1.3rem] md:text-[1.6rem] shadow-[0px_0px_5px_3px_rgba(201,201,201,0.47)] font-bold uppercase bg-slate-900 border-4 border-[#43817e] rounded-[8px] p-4">
                {skill.name}
              </span>
            );
          }) : null}
        </div>
      </section>
    </div>
  );
}


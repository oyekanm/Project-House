import React from "react";
import { Loader2 } from "lucide-react";
import MotionSlot from "./_components/reuseable/motionSlot";


export default function Home() {
  const text = "text-[2rem] font-medium leading-[30px]"
  const title = "text-[3rem] font-semibold uppercase "
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
              I'm a Front-End Developer from Nigeria, I'm an Undergraduate of
              University of Lagos.
            </p>
            <p className={text}>I develop Mobile Applications and Websites to enhance your digital presence.</p>
            <p className={text}>I have two years experience using various front-end technologies,</p>
            <p className={text}>and i write songs, i'm currently writing a diss track for the people who make me feel discomfort, wait for it</p>
          </div>
        </div>
      </section>
      <div className="my-16 ">
        <a href="mailto:enitanboluwatife5@gmail.com" className="text-[2.5rem] relative font-medium text-gray-400 work">
          Let's work
        </a>
      </div>

      <section>
        <p className={title}>projects</p>
        <div className="my-4"></div>
      </section>

      <section className="">
        <p className={title}>Skills & Technoligies</p>
        <p className="text-[1.8rem] font-medium leading-4 mt-4">
          Here are the Technologies and Framework i use, While constantly
          learning to improve my Skills.
        </p>
        <div className="">

        </div>
      </section>
    </div>
  );
}


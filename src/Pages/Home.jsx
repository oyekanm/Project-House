import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Data from "../Data";
import AOS from "aos";
import "aos/dist/aos.css";
import Typewriter from "typewriter-effect";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import GetProject from "../libs/Queries/GetProject";
import GetLanguage from "../libs/Queries/GetLanguage";

const languages = Data.map((item) => item.language);

function Home() {
  const projects = GetProject()
  const {data:languages, loading} = GetLanguage()
  const lang = languages?.getAllLanguage
  const data = projects?.data?.getAllProject
  const [project, setProject] = useState([]);

  // console.log(lang)

  useEffect(() => {
    AOS.init();
    if(data){
      setProject(data.slice(0,5))
      console.log(data)
    }
  }, [data]);
  // const [project, setProject] = useState(Data.slice(17, 22));
  // const [language] = useState(languages);
  // const [newSet, setNewSet] = useState([]);

  // useEffect(() => {
  //   const spreadlang = [];
  //   for (let i = 0; i < language.length; i++) {
  //     spreadlang.push(...language[i]);
  //   }
  //   const spread = [...new Set(spreadlang), "github", "git"];
  //   setNewSet(spread);
  // }, [language]);

  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <section className="container">
      <div className="Header">
        <motion.div
          className="home"
          initial={{
            clipPath: "polygon(0 100%, 0% 100%, 100% 100%, 100% 100%  )",
            opacity: 0,
          }}
          animate={{
            clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%) ",
            opacity: 1,
          }}
          transition={{ duration: 2 }}
        >
          <p className="Header__hello">hello,</p>
          <p className="Header__name">i am Boluwatife</p>
        </motion.div>
        <div className="Header__desc">
          <Typewriter
            options={{
              loop: true,
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString("a front-end developer")
                .pauseFor(5000)
                .deleteAll()
                .typeString("best in running to stack overflow")
                .pauseFor(1000)
                .deleteAll()
                .typeString("LET'S TALK!!!")
                .pauseFor(5000)
                .changeDeleteSpeed(50)
                .start();
            }}
          />
        </div>
        <p className="Header__text">
          it's a{" "}
          <Link to="/projects" className="Mail__message">
            magical
          </Link>{" "}
          something.{" "}
        </p>
        <div className="Header__about">
          <p
            className="Header__info"
            data-aos="fade-up"
            data-aos-duration="3000"
            data-aos-once="true"
            data-aos-delay="3000"
          >
            I'm a Front-End Developer from Nigeria, I'm an Undergraduate of
            University of Lagos. I love designing websites, I have been
            designing websites for quite a while, but that doesn't matter how
            much now!, I rather say i will never stop learning and having
            curiosity.
          </p>
        </div>
      </div>
      <div className="Mail">
        <a href="mailto:enitanboluwatife5@gmail.com" className="Mail__message">
          let's work
        </a>
      </div>

      <p className="Projects__title">projects</p>
      {projects.loading && <Loader2 class="h-[4rem] w-[4rem] animate-spin mx-auto" />}
      {project && <div className="Projects">
      { project.map((project) => {
          const { _id, author, image, name, language, url, github } = project;
          return (
            <div
              key={_id}
              className="Project__summary"
              data-aos="zoom-in"
              data-aos-duration="2000"
            >
              <img src={image} alt={name} className="Project__image" />
              <div className="Project__info">
                <p className="Project__name">{name}</p>
                <div className="Project__language">
                  {language && language.map((skill, index) => {
                    return (
                      <span key={index} className="Project__skills">
                        {skill.name}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="Project__modal">
                <p className="Project__author">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    class="bi bi-person-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>{" "}
                  {author}
                </p>
                <a href={url} target="_blank" rel="noreferrer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="#fff"
                    class="bi bi-link-45deg"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
                    <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
                  </svg>
                </a>
                <a href={github} target="_blank" rel="noreferrer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="#fff"
                    class="bi bi-github"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                </a>
              </div>
            </div>
          );
        })}
        <Link to="/projects" className="Projects__link">
          see more...
        </Link>
      </div>}
      <div className="Skills">
        <p className="Skills__title">Skills & Technoligies</p>
        <p className="Skills__text">
          Here are the Technologies and Framework i use, While constantly
          learning to improve my Skills.
        </p>
        <div className="Skills__grid">
        {loading && <Loader2 class="h-[4rem] w-[4rem] animate-spin mx-auto" />}
          {lang ? lang?.map((skill, index) => {
            return (
              <span key={index} className="Skills__tech">
                {skill.name}
              </span>
            );
          }):null}
        </div>
      </div>
    </section>
  );
}

export default Home;

"use client";

import React, { useState } from "react";
import ProjectCard from "../_components/ui/projectCard";
import { FetchData } from "@/lib/fetchers/getDatas";
import { Loader2 } from "lucide-react";

const projects = [
  {
    id: 23,
    author: "Oyekanmi",
    description:
      "This is a fully functional web app powering an AI WhatsApp chatbot - this website allows users to sign up in order to be able to access and use the WhatsApp chatbot.",
    name: "eko360 react",
    language: [
      "react",
      "css",
      "bootstrap",
      "bootstrap",
      "css",
      "bootstrap",
      "css",
    ],
    category: "react",
    url: "http://eko360-react.vercel.app/",
    Github: "https://github.com/oyekanm/Eko360-React",
    features: [
      "WhatsApp access",
      "Sign in/Sign up",
      "Personalized experience",
      "Fully functional web app",
      "css",
      "bootstrap",
      "Fully functional web app",
    ],
  },
  {
    id: 14,
    author: "Oyekanmi",
    description:
      " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis fugit beatae corrupti sint voluptatum accusamus minus consequuntur cum amet unde illum, accusantium saepe, sapiente aliquid, inventore porro expedita natus. Inventore!",
    name: "fake review comment ",
    language: ["nextjs", "css"],
    category: "nextjs",
    url: "http://my-app-oyekanm.vercel.app/",
    Github: "https://github.com/oyekanm/my-app",
    features: [
      "WhatsApp access",
      "Sign in/Sign up",
      "Personalized experience",
      "Fully functional web app",
      "css",
      "bootstrap",
      "Fully functional web app",
    ],
  },
  {
    id: 15,
    author: "Oyekanmi",
    description:
      " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis fugit beatae corrupti sint voluptatum accusamus minus consequuntur cum amet unde illum, accusantium saepe, sapiente aliquid, inventore porro expedita natus. Inventore!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis fugit beatae corrupti sint voluptatum accusamus minus consequuntur cum amet unde illum, accusantium saepe, sapiente aliquid, inventore porro expedita natus. Inventore!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis fugit beatae corrupti sint voluptatum accusamus minus consequuntur cum amet unde illum, accusantium saepe, sapiente aliquid, inventore porro expedita natus. Inventore!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis fugit beatae corrupti sint voluptatum accusamus minus consequuntur cum amet unde illum, accusantium saepe, sapiente aliquid, inventore porro expedita natus. Inventore!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis fugit beatae corrupti sint voluptatum accusamus minus consequuntur cum amet unde illum, accusantium saepe, sapiente aliquid, inventore porro expedita natus. Inventore!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis fugit beatae corrupti sint voluptatum accusamus minus consequuntur cum amet unde illum, accusantium saepe, sapiente aliquid, inventore porro expedita natus. Inventore!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis fugit beatae corrupti sint voluptatum accusamus minus consequuntur cum amet unde illum, accusantium saepe, sapiente aliquid, inventore porro expedita natus. Inventore!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis fugit beatae corrupti sint voluptatum accusamus minus consequuntur cum amet unde illum, accusantium saepe, sapiente aliquid, inventore porro expedita natus. Inventore!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis fugit beatae corrupti sint voluptatum accusamus minus consequuntur cum amet unde illum, accusantium saepe, sapiente aliquid, inventore porro expedita natus. Inventore!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis fugit beatae corrupti sint voluptatum accusamus minus consequuntur cum amet unde illum, accusantium saepe, sapiente aliquid, inventore porro expedita natus. Inventore!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis fugit beatae corrupti sint voluptatum accusamus minus consequuntur cum amet unde illum, accusantium saepe, sapiente aliquid, inventore porro expedita natus. Inventore!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis fugit beatae corrupti sint voluptatum accusamus minus consequuntur cum amet unde illum, accusantium saepe, sapiente aliquid, inventore porro expedita natus. Inventore!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis fugit beatae corrupti sint voluptatum accusamus minus consequuntur cum amet unde illum, accusantium saepe, sapiente aliquid, inventore porro expedita natus. Inventore!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis fugit beatae corrupti sint voluptatum accusamus minus consequuntur cum amet unde illum, accusantium saepe, sapiente aliquid, inventore porro expedita natus. Inventore!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis fugit beatae corrupti sint voluptatum accusamus minus consequuntur cum amet unde illum, accusantium saepe, sapiente aliquid, inventore porro expedita natus. Inventore!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis fugit beatae corrupti sint voluptatum accusamus minus consequuntur cum amet unde illum, accusantium saepe, sapiente aliquid, inventore porro expedita natus. Inventore!",
    name: "fake review comment ",
    language: ["nextjs", "css"],
    category: "nextjs",
    url: "http://my-app-oyekanm.vercel.app/",
    Github: "https://github.com/oyekanm/my-app",
    features: [
      "WhatsApp access",
      "Sign in/Sign up",
      "Personalized experience",
      "Fully functional web app",
      "css",
      "bootstrap",
      "Fully functional web app",
    ],
  },
];

interface pro {
    id: number;
    author: string;
    description: string;
    name: string;
    language: string[];
    category: string;
    url: string;
    Github: string;
    features: string[];
    status:string
}

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const { data } = FetchData("/api/category");
  const { data: Project, isLoading } = FetchData("/api/products");

  const filteredProject=Project.filter((pro:pro)=>{
    if(filter === "all"){
      return pro
    }
    if(filter === "web"){
      return pro.status === "NOAPP"
    }
    if(filter === "mobile app"){
      return pro.status === "APP"
    }
  })


  return (
    <div className="Container mt-8">
      {isLoading && (
        <Loader2 className="h-[4rem] w-[4rem]  animate-spin mx-auto" />
      )}
     {Project && <div className="filter-container">
        {["all", "web", "mobile app"].map((tab) => {
          return (
            <button
              key={tab}
              onClick={()=>setFilter(tab)}
              className={`filter-button ${tab === filter ? "active" : ""} capitalize`}
            >
              {tab}
            </button>
          );
        })}

      </div>}
      <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mt-16">
        {filteredProject?.map((project: any) => {
          return <ProjectCard key={project.id} item={project} />;
        })}
      </section>
    </div>
  );
}

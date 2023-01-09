import React from "react";
import { FaReact } from "react-icons/fa";
import { SiTailwindcss, SiExpress } from "react-icons/si";
import { DiMongodb } from "react-icons/di";

function About() {
  return (
    <div className="text-center">
      <h2 className="mt-5 text-4xl font-bold ">Support Ticket System</h2>
      <p className="mt-5 text-2xl">
        A small application in which users can log in support tickets and add
        comments. Written in
      </p>

      <div className="inline-flex text-8xl">
        <FaReact />
        <SiTailwindcss />
        <DiMongodb />
        <SiExpress />
      </div>
    </div>
  );
}

export default About;

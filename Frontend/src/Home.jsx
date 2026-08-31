import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Typewriter } from "react-simple-typewriter";
import Loading from "./Loading";

import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PublishIcon from "@mui/icons-material/Publish";

import { userUrl, projectUrl, skillUrl, timeLineUrl, messageUrl } from "./Api";
import Project from "./subComponect/Project";
import Timeline from "./subComponect/Timeline";
import AboutMe from "./subComponect/AboutMe";
import Skills from "./subComponect/Skills";
import { motion } from "framer-motion";
import { Skeleton } from "boneyard-js/react";

function Home() {
  const [section, setSection] = useState("profile");
  const [user, setUser] = useState({});
  const [timeLines, setTimeLines] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [userLoading, setUserLoading] = useState(true);
  const [skillLoading, setSkillLoading] = useState(true);
  const [timeLineLoading, setTimeLineLoading] = useState(true);
  const [projectLoading, setProjectLoading] = useState(true);

  const ref = useRef({
    user: false,
    timeline: false,
    skills: false,
    projects: false,
  });

  const [contactForm, setContactForm] = useState({
    senderName: "",
    email: "",
    message: "",
  });

  const aboutMeDescription = user?.aboutMe?.split(".");

  const handleChangeContactForm = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleContactSumbit = () => {
    setLoading(true);
    messageUrl
      .post("/send", contactForm)
      .then((res) => {
        toast.success(res?.data?.message);
        setLoading(false);
        setContactForm({
          senderName: "",
          email: "",
          message: "",
        });
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        setLoading(false);
        console.log(err?.response);
      });
  };

  const fetchUser = () => {
    setUserLoading(true);
    userUrl
      .get("/me/portfolio")
      .then((res) => {
        setUser(res?.data?.user);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        setUserLoading(false);
      });
  };

  const fetchTimeline = () => {
    setTimeLineLoading(true);
    timeLineUrl
      .get("/all")
      .then((res) => {
        setTimeLines(res?.data?.allTimeLine);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        setTimeLineLoading(false);
      });
  };

  const fetchSkills = () => {
    setSkillLoading(true);
    skillUrl
      .get("/all")
      .then((res) => {
        setSkills(res?.data?.skills);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        console.log(err.response);
      })
      .finally(() => {
        setSkillLoading(false);
      });
  };

  const fetchProjects = () => {
    setProjectLoading(true);
    projectUrl
      .get("/all")
      .then((res) => {
        setProjects(res?.data?.projects);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        setProjectLoading(false);
      });
  };

  return (
    <div className="w-full flex justify-center p-1 font-serif">
      <div className="w-full max-w-[900px] flex text-sm sm:text-lg flex-wrap">
        <nav className="flex sticky top-0 justify-end w-full gap-3 group py-2 border-b mb-4 bg-black z-3 ">
          <a
            href="#aboutMe"
            className={`px-2 rounded-lg hover:text-yellow-500 group-hover:blur-[0.5px] hover:!blur-none `}
            onClick={() => setSection("profile")}
          >
            Profile
          </a>
          <a
            href="#skill"
            className={`px-2 rounded-lg hover:text-yellow-500 group-hover:blur-[0.5px] hover:!blur-none`}
            onClick={() => setSection("skill")}
          >
            Skill
          </a>
          <a
            href="#project"
            className={`px-2 rounded-lg hover:text-yellow-500 group-hover:blur-[0.5px] hover:!blur-none`}
            onClick={() => setSection("project")}
          >
            Project
          </a>
          <a
            href="#contactMe"
            className={`px-2 rounded-lg hover:text-yellow-500 group-hover:blur-[0.5px] hover:!blur-none`}
            onClick={() => setSection("contactMe")}
          >
            Contact Me
          </a>
        </nav>

        <div className="w-full flex px-2 flex-wrap gap-5 mt-15">
          <Skeleton name="hero" loading={userLoading}>
            <motion.div
              onViewportEnter={() => {
                if (ref.current.user) return;
                ref.current.user = true;
                fetchUser();
              }}
              viewport={{ once: true }}
              id="hero"
              className="mb-10 w-full overflow-x-hidden"
            >
              <div className="text-sm flex gap-1 items-center mb-3">
                <span className="bg-green-400 h-2 w-2 rounded-full"></span>
                <span className="font-extralight font-mono text-[12px]">
                  Online
                </span>
              </div>
              <div className="w-full">
                <span className="tracking-[2px] mb-3 text-lg sm:text-xl">
                  Hey, I'm {user?.fullName}
                </span>
                <h1 className="text-2xl tracking-[15px] animate-pulse mb-3">
                  <Typewriter
                    words={user?.iAm}
                    loop={100}
                    typeSpeed={70}
                    deleteSpeed={70}
                    cursor
                  />
                </h1>

                <div className="flex gap-4">
                  <div
                    id="links"
                    className="outline-1 w-fit flex gap-2 px-2 bg-white rounded-2xl items-center justify-center mb-3"
                  >
                    {user?.githubUrl && (
                      <Link
                        to={user?.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" hover:scale-120 active:scale-120 group text-black"
                      >
                        <GitHubIcon style={{ fontSize: "25px" }} />
                      </Link>
                    )}

                    {user?.instagramUrl && (
                      <Link
                        to={user?.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" hover:scale-120 active:scale-120 group text-red-600"
                      >
                        <InstagramIcon />
                      </Link>
                    )}

                    {user?.linkedInUrl && (
                      <Link
                        to={user?.linkedInUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" hover:scale-120 active:scale-120 group text-blue-600"
                      >
                        <LinkedInIcon />
                      </Link>
                    )}
                  </div>

                  <div className="w-fit h-fit px-2  rounded-2xl bg-white text-black">
                    <a
                      className="hover:font-bold"
                      href={user?.resume?.url}
                      download
                      rel="noopener noreferrer"
                    >
                      <OpenInNewIcon />
                      <span className="text-xs">Resume</span>
                    </a>
                  </div>
                </div>

                <ul className="list-disc list-inside text-white marker:text-blue-700">
                  {aboutMeDescription?.map(
                    (el, idx) => el?.trim() != "" && <li key={idx}>{el}.</li>,
                  )}
                </ul>
              </div>
            </motion.div>
          </Skeleton>

          <motion.div
            onViewportEnter={() => {
              if (ref.current.timeline) return;
              ref.current.timeline = true;
              fetchTimeline();
            }}
            viewport={{ once: true }}
            id="timeline"
            className="mb-10 w-full overflow-x-hidden"
          >
            <div className="relative flex justify-center items-center mb-3">
              <div className=" z-2 bg-black">
                <h1 className="animate-pulse tracking-[4px] md:tracking-[8px] text-3xl md:text-5xl font-extrabold font-mono">
                  Timeline
                </h1>
              </div>

              <span className="border-1 w-full absolute"></span>
            </div>
            <Skeleton name="timeline" loading={timeLineLoading}>
              <Timeline timeLines={timeLines} />
            </Skeleton>
          </motion.div>

          <motion.div id="aboutMe" className="mb-10 w-full overflow-x-hidden">
            <div className="relative w-full flex justify-center items-center mb-3">
              <div className="bg-black z-2">
                <h1 className="animate-pulse tracking-[4px] md:tracking-[8px] text-3xl md:text-5xl font-extrabold font-mono">
                  ABOUT ME
                </h1>
              </div>
              <span className="absolute border-1 w-full"></span>
            </div>
            <p className="text-center relative -top-3 opacity-60 text-sm">
              ALLOW ME TO INTRODUCE MYSELF
            </p>
            <Skeleton name="aboutme" loading={userLoading}>
              <AboutMe user={user} aboutMeDescription={aboutMeDescription} />
            </Skeleton>
          </motion.div>

          <motion.div
            onViewportEnter={() => {
              if (ref.current.skills) return;
              ref.current.skills = true;
              fetchSkills();
            }}
            viewport={{ once: true }}
            id="skill"
            className="mb-10 w-full"
          >
            <div className="relative w-full flex justify-center items-center mb-3">
              <div className="bg-black z-2">
                <h1 className="animate-pulse tracking-[4px] md:tracking-[8px] text-3xl md:text-5xl font-extrabold font-mono">
                  SKILLS
                </h1>
              </div>
              <span className="absolute border w-full"></span>
            </div>

            <Skeleton name="skills" loading={skillLoading}>
              <Skills skills={skills} />
            </Skeleton>
          </motion.div>

          <motion.div
            onViewportEnter={() => {
              if (ref.current.projects) return;
              ref.current.projects = true;
              fetchProjects();
            }}
            viewport={{ once: true }}
            id="project"
            className="mb-10 w-full overflow-x-hidden"
          >
            <div className="relative w-full flex justify-center items-center mb-8">
              <div className="bg-black z-2">
                <h1 className="animate-pulse tracking-[4px] md:tracking-[8px] text-3xl md:text-5xl font-extrabold font-mono">
                  PROJECTS
                </h1>
              </div>
              <span className="absolute border w-full"></span>
            </div>

            <Skeleton name="project" loading={projectLoading}>
              {projects?.map((project) => (
                <Project key={project._id} project={project} />
              ))}
            </Skeleton>
          </motion.div>

          <div id="contactMe" className="mb-10 w-full">
            <div className="relative w-full flex justify-center items-center mb-8">
              <div className="bg-black z-2">
                <h1 className="animate-pulse tracking-[4px] md:tracking-[8px] text-3xl md:text-5xl font-extrabold font-mono">
                  Contact Me
                </h1>
              </div>
              <span className="absolute border-1 w-full"></span>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full md:w-4/10 text-3xl font-semibold flex justify-center flex-col">
                <div className="flex gap-2 md:block flex-wrap">
                  <h1 className="mb-3">Have a Query?</h1>
                  <h1 className="mb-3">Let's Talk!</h1>
                </div>
                <button
                  disabled={
                    contactForm.senderName?.trim() == "" ||
                    contactForm.email?.trim() == "" ||
                    contactForm.message?.trim() == "" ||
                    loading
                  }
                  onClick={handleContactSumbit}
                  className="blur-[0.5px] hover:blur-none active:blur-none disabled:bg-gray-200 disabled:cursor-not-allowed disabled cursor-pointer hidden md:inline-block outline-1 px-5 py-1 bg-blue-400 w-fit hover:bg-blue-800 text-black hover:text-white hover:rounded-2xl active:bg-blue-800 active:text-white active:rounded-2xl rounded-lg"
                >
                  Submit <PublishIcon />
                </button>
              </div>
              <div className="w-full md:w-6/10 flex flex-wrap gap-5">
                <div className="flex flex-wrap w-full">
                  <label htmlFor="name" className="w-full">
                    Name{" "}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="senderName"
                    value={contactForm.senderName}
                    placeholder="Enter Your Name"
                    onChange={handleChangeContactForm}
                    className="w-full rounded-lg p-2 hover:border-b-5 hover:border-l-5 active:border-b-5 active:border-l-5 border-b-2 border-l-2 outline-none border-blue-700 "
                  />
                </div>
                <div className="flex flex-wrap w-full">
                  <label htmlFor="email" className="w-full">
                    Email{" "}
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={contactForm.email}
                    placeholder="Enter Your Email ID"
                    onChange={handleChangeContactForm}
                    className="w-full rounded-lg p-2 hover:border-b-5 hover:border-l-5 active:border-b-5 active:border-l-5 border-b-2 border-l-2 outline-none border-blue-700 "
                  />
                </div>
                <div className="flex flex-wrap w-full">
                  <label htmlFor="message" className="w-full">
                    Message{" "}
                  </label>
                  <textarea
                    rows={5}
                    id="message"
                    name="message"
                    value={contactForm.message}
                    placeholder="Enter Your Message"
                    onChange={handleChangeContactForm}
                    className="w-full rounded-lg p-2 hover:border-b-5 hover:border-l-5 active:border-b-5 active:border-l-5 border-b-2 border-l-2 outline-none border-blue-700 "
                  />
                </div>
                <div className="w-full text-end text-lg font-semibold">
                  <button
                    disabled={
                      contactForm.senderName?.trim() == "" ||
                      contactForm.email?.trim() == "" ||
                      contactForm.message?.trim() == "" ||
                      loading
                    }
                    onClick={handleContactSumbit}
                    className="disabled:blur-[0.7px] hover:blur-none active:blur-none disabled:bg-gray-200 disabled:cursor-not-allowed cursor-pointer md:hidden inline-block outline-1 px-5 py-1 bg-blue-400 w-fit hover:bg-blue-800 text-black hover:text-white active:bg-blue-800 active:text-white rounded-lg"
                  >
                    Submit <PublishIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <nav className="flex justify-end w-full gap-3 group py-2 border-b mb-4 bg-black z-3 ">
            <a
              href="#aboutMe"
              className={`px-2 rounded-lg hover:text-yellow-500 group-hover:blur-[0.5px] hover:!blur-none `}
              onClick={() => setSection("profile")}
            >
              Profile
            </a>
            <a
              href="#skill"
              className={`px-2 rounded-lg hover:text-yellow-500 group-hover:blur-[0.5px] hover:!blur-none`}
              onClick={() => setSection("skill")}
            >
              Skill
            </a>
            <a
              href="#project"
              className={`px-2 rounded-lg hover:text-yellow-500 group-hover:blur-[0.5px] hover:!blur-none`}
              onClick={() => setSection("project")}
            >
              Project
            </a>
            <a
              href="#contactMe"
              className={`px-2 rounded-lg hover:text-yellow-500 group-hover:blur-[0.5px] hover:!blur-none`}
              onClick={() => setSection("contactMe")}
            >
              Contact Me
            </a>
          </nav>

          <div id="footer" className="mb-5 relative flex items-center w-full">
            <div className="bg-black z-2">
              <h1 className="text-xl animate-pulse">Thank you for Scrolling</h1>
            </div>
            <span className="w-full border-b-2 block absolute"></span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;

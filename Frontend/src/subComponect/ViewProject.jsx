import React from "react";
import { useParams, Link } from "react-router-dom";
import { projectUrl } from "../Api";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import GitHubIcon from "@mui/icons-material/GitHub";

function ViewProject() {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [description, setDescription] = useState([]);

  useEffect(() => {
    projectUrl
      .get(`/single/${id}`)
      .then((res) => {
        setProject(res?.data?.project);
        const desc = res?.data?.project?.description
          ?.split(".")
          .filter((item) => item !== "");
        setDescription(desc);
      })
      .catch((err) => toast.error(err?.response?.data?.message));
  }, []);

  return (
    <div className="h-screen font-serif flex justify-center">
      {/* <div className=" flex flex-wrap md:justify-evenly "> */}
      <div className="w-full md:w-[50%] p-2">
        <p className=" rounded-lg p-3 mb-3 w-full h-fit font-semibold text-2xl border-b-2 border-l-2">
          {project.title}
        </p>

        <div className="rounded-lg mb-3 sm:h-1/2 w-full flex justify-center ">
          <video
            src={project?.image?.url}
            autoPlay
            muted
            loop
            alt="Project"
            className="rounded-lg h-full outline-1"
          />
        </div>

        <div className="flex flex-col justify-between w-full h-fit mb-3">
          <p className="font-bold mb-3 underline">Description</p>

          {description.length ? (
            <ul className="list-disc list-inside">
              {description?.map((desc, idx) => (
                <li key={idx}>{desc}.</li>
              ))}
            </ul>
          ) : (
            ""
          )}
        </div>

        <div className="mb-4">
          <p className="font-bold mb-1 underline">Stack</p>
          <p className="rounded-lg w-full text-xs">{project.stack}</p>
        </div>

        <div className="mb-4">
          <p className="font-bold mb-1 underline">Deployed</p>
          <p className="rounded-lg w-full text-xs">
            {project.deployed ? "YES" : "NO"}
          </p>
        </div>

        {project?.gitHubUrl ? (
          <div className="mb-4">
            <p className="font-bold mb-1 underline">
              Github Repository Link <GitHubIcon />
            </p>
            <Link
              to={project.gitHubUrl}
              target="_blank"
              className="rounded-lg w-full text-sm text-blue-400 hover:underline active:underline cursor-pointer"
            >
              {project.gitHubUrl}
            </Link>
          </div>
        ) : (
          ""
        )}

        {project?.projectUrl ? (
          <div className="mb-4">
            <p className="font-bold mb-1 underline">Project Link</p>
            <Link
              to={project?.projectUrl}
              target="_blank"
              className="rounded-lg w-full text-sm text-blue-400 hover:underline active:underline cursor-pointer"
            >
              {project?.projectUrl}
            </Link>
          </div>
        ) : (
          ""
        )}

        <div className="flex flex-col justify-between w-full h-fit mb-3">
          <p className="font-bold mb-3 underline">Used Technologies</p>
          <ul className="list-disc list-inside">
            {project?.technologies?.map((tech, idx) => (
              <li key={idx}>{tech.skillName}</li>
            ))}
          </ul>
        </div>

        <div className="h-25"></div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ViewProject;

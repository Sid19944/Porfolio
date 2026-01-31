import React from "react";
import { Link } from "react-router-dom";

function RightImage({ project }) {
  const description = project?.description?.split(".");
  return (
    <div className="flex p-4 mb-8 border border-gray-500 rounded-lg flex-wrap-reverse items-center">
      <h1 className="text-lg md:text-2xl font-bold tracking-[2px] mb-3 sm:block text-center w-full">
        {project?.title}
      </h1>

      <Link to={`/view/${project?._id}`} className="">
        <img
          src={project?.image?.url}
          alt="Project Image"
          className="h-full shadow-[0px_0px_5px_5px] shadow-blue-600 rounded-lg"
        />
        <p className="text-gray-500 text-center">click to view more detail</p>
      </Link>
    </div>
  );
}

export default RightImage;

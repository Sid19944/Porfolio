import React from "react";
import { Link } from "react-router-dom";

function RightImage({ project }) {
  const description = project?.description?.split(".");
  return (
    <div className="flex p-1 mb-8 border-b border-b-gray-700  flex-wrap-reverse">
      <div className="w-full sm:w-6/10 p-2">
        <h1 className="text-2xl font-bold tracking-[2px] mb-3 sm:block">
          {project?.title}
        </h1>
        <ul className="pl-4 hidden sm:block">
          {description?.map(
            (el, idx) =>
              el?.trim() != "" && (
                <li key={idx} className="list-disc">
                  {el}
                </li>
              ),
          )}
        </ul>
      </div>
      <div className="w-full sm:w-4/10 max-h-60 p-3 flex justify-center">
        <Link to={`/view/${project?._id}`}>
          <img
            src={project?.image?.url}
            alt="Project Image"
            className="h-full"
          />
        </Link>
      </div>
    </div>
  );
}

export default RightImage;

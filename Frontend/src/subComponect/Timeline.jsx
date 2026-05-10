import React from "react";

function Timeline({ timeLines }) {
  return (
    <div id="timeline" className="mb-10 w-full overflow-x-hidden">
      <div className="relative flex justify-center items-center mb-3">
        <div className=" z-2 bg-black">
          <h1 className="animate-pulse tracking-[4px] md:tracking-[8px] text-3xl md:text-5xl font-extrabold font-mono">
            Timeline
          </h1>
        </div>

        <span className="border-1 w-full absolute"></span>
      </div>
      <ol className="relative border-s border-default ms-2 border-blue-600">
        {timeLines?.map((timeLine) => (
          <li key={timeLine?._id} className="mb-5  ms-5">
            <span className="h-2 w-2 bg-blue-600 absolute rounded-full -left-[4.5px] shadow-[0px_0px_3px_3px] shadow-blue-600"></span>
            <p className="relative -top-2">{timeLine.name}</p>
            <p className="text-xs opacity-50 relative -top-3">
              {timeLine.from} - {timeLine.to}
            </p>
            <p className="relative -top-2 text-sm opacity-80">
              {timeLine?.about}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Timeline;

import React from "react";

function AboutMe({ user, aboutMeDescription }) {
  return (
    <div id="aboutMe" className="mb-10 w-full overflow-x-hidden">
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

      <div className="flex leading-relaxed">
        <div className="p-8">
          <div className="flex justify-center w-fit float-start">
            <img
              src={user?.avatar?.url}
              alt="avatar"
              className="shadow-[0px_0px_4px_4px] w-full max-w-35 md:max-w-40 mb-4 mx-20 rotate-15"
            />
          </div>
          <p className="font-bold">{user?.fullName}</p>
          <ul className="list-disc list-inside text-white marker:text-blue-700">
            {aboutMeDescription?.map(
              (el, idx) => el?.trim() != "" && <li key={idx}>{el}.</li>,
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;

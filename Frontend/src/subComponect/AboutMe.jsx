import React from "react";

function AboutMe({ user, aboutMeDescription }) {
  return (
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
  );
}

export default AboutMe;

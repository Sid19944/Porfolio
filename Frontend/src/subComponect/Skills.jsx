import React from "react";

function Skills({skills}) {
  return (
    <div id="skill" className="mb-10 w-full">
      <div className="relative w-full flex justify-center items-center mb-3">
        <div className="bg-black z-2">
          <h1 className="animate-pulse tracking-[4px] md:tracking-[8px] text-3xl md:text-5xl font-extrabold font-mono">
            SKILLS
          </h1>
        </div>
        <span className="absolute border w-full"></span>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-6 h-fit gap-2 md:gap-3 outline-1 p-3 md:p-2 rounded-lg outline-gray-600">
        {skills?.map((skill) => (
          <div
            key={skill?._id}
            className=" outline-1 rounded-lg overflow-hidden"
          >
            <img
              src={skill?.skillImage?.url}
              className="object-cover h-[70%] w-full rounded-t-lg"
            />
            <p className="text-center">{skill?.skillName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;

import React, { useState, useEffect } from "react";
import { projectApi, skillApi } from "../../Api";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "../utils/Loading";

import Button from "@mui/material/Button";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import SendIcon from "@mui/icons-material/Send";

function AddTechForUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [techs, setTechs] = useState([]);
  const [allTechs, setAllTechs] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleAdd = (id) => {
    setTechs([...techs, id]);
  };

  const handleRemove = (id) => {
    setTechs((techs) => techs.filter((tech) => tech !== id));
  };

  const handleSubmit = () => {
    setLoading(true);
    projectApi
      .put(`/${id}/add/new/tech`, techs, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message, { position: "bottom-left" });
        setTimeout(() => {
          navigate(`/update/project/${id}`);
        }, 2000);
        setTechs([]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.error(err.response.data.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    skillApi
      .get("/all")
      .then((res) => {
        setAllTechs(res.data.skills);
      })
      .catch((err) => toast.error(err.response.data.message));
  }, []);
  return (
    <div className="h-screen font-serif flex justify-center">
      <div className="w-full md:w-[50%] p-2">
        <div className="outline-1 rounded-2xl mb-4 p-2 flex justify-between items-center">
          <span className="font-bold text-2xl overflow-hidden">Technology</span>{" "}
          <span>
            Added <span className="text-xl">{techs.length}</span>
          </span>
          <Button
            disabled={loading || techs.length === 0}
            variant="contained"
            onClick={handleSubmit}
            className="disabled:bg-gray-400 disabled:cursor-not-allowed"
            endIcon={<SendIcon />}
          >
            {loading ? "Adding" : "Send"}
          </Button>
        </div>
        {allTechs.map((skill) => (
          <div
            className="outline-1 w-full  mb-4 p-1 h-fit flex justify-around items-center flex-wrap rounded-xl"
            key={skill._id}
          >
            <img
              src={skill.skillImage.url}
              className="object-cover w-[20%] outline-2 outline-black max-h-[70px] max-w-[90px]"
            />
            <span className=" text-center text-2xl p-2 ">
              {skill.skillName}
            </span>
            <div className="flex gap-2.5">
              {techs.includes(skill._id) ? (
                <button
                  onClick={() => handleRemove(skill._id)}
                  variant="contained"
                  className="outline-1 w-fit  text-center bg-blue-400 font-semibold px-4 py-1 rounded-2xl  hover:rounded-lg hover:bg-blue-600 text-white cursor-pointer hover:shadow-xl/30 "
                >
                  Remove <RemoveOutlinedIcon />
                </button>
              ) : (
                <button
                  onClick={() => handleAdd(skill._id)}
                  variant="contained"
                  className="outline-1 w-fit  text-center bg-blue-400 font-semibold px-4 py-1 rounded-2xl  hover:rounded-lg hover:bg-blue-600 text-white cursor-pointer hover:shadow-xl/30 "
                >
                  Add <AddCircleOutlineOutlinedIcon />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
      {loading ? <Loading text="Adding..." /> : ""}
    </div>
  );
}

export default AddTechForUpdate;

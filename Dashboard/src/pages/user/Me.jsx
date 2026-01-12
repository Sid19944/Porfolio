import { useEffect, useState } from "react";
import { userApi } from "../../Api";
import { ToastContainer, toast } from "react-toastify";

function Me() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [resume, setResume] = useState(null);
  const [username, setUsername] = useState("");
  const [aboutMe, setAboutMe] = useState("");

  const [user, setUser] = useState({});

  useEffect(() => {
    userApi
      .get("/me", { withCredentials: true })
      .then((res) => {
        // console.log(res.data);
        // setEmail(data.user.email);
        // setAboutMe(data.user.aboutMe);
        // setFullName(data.user.fullName);
        // setPhone(data.user.phone);
        // setAvatar(data.user.avatar.url);
        // setResume(data.user.resume.url);
        // setUsername(data.user.username);
        // toast.success(data.message, { position: "bottom-left" });
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  console.log(user);

  return (
    <div className="rounded-lg  h-screen p-2 ">
      <div className="flex justify-between">
        <img
          src={user?.avatar?.url}
          className="w-50 h-50 rounded-full outline-1 oject-cover mb-4  "
        />
        {/* <img src={resume} className="w-45 h-45  border-1 oject-cover mb-4  " /> */}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Me;

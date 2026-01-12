import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { userApi } from "../../Api";
import Loading from "../utils/Loading";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await userApi.post("/forgot/password", { email });
      console.log(res);
      toast.success(res.data.message, { position: "bottom-left" });
    } catch (err) {
      toast.error(err.response.data.message, {
        position: "bottom-left",
      });
      console.log(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" h-screen font-serif flex ">
      <div className="w-full lg:w-1/2 border-1 border-solid flex justify-center items-center">
        <form className="border-2 border-solid rounded-lg p-8 h-70  m-8  w-full md:w-4/5 lg:w-3/4 shadow-lg shadow-black">
          <h2 className="text-center">Forgot Your Password</h2>
          <div className="my-6">
            <label htmlFor="email" className="font-semibold">
              Email ID
            </label>
            <input
              required
              type="email"
              id="email"
              placeholder="Enter Email ID"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name="email"
              className="border-b-1  focus:border-b-indigo-500 focus:border-b-3 focus:outline-hidden  p-3 w-full  invalid:border-red-500 invalid:ring-red-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading || email === ""}
            onClick={handleSubmit}
            className="w-full block text-center bg-blue-400 font-semibold py-2 text-black hover:rounded-lg hover:bg-blue-600 hover:text-white cursor-pointer disabled:cursor-not-allowed"
          >
            Send Mail
          </button>
        </form>
      </div>
      <img
        src="/hero.png"
        alt="Image"
        className="lg:w-1/2 object-cover hidden lg:block"
      />
      <ToastContainer />
      {loading ? <Loading text="Sending..." /> : ""}
    </div>
  );
}

export default ForgotPassword;

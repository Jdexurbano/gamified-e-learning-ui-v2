import { FaUser, FaLock } from "react-icons/fa6";
import { Input, Button, Alert } from "@material-tailwind/react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { PORT } from "../../utils/constant";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post(`${PORT}/login`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        switch (user.role) {
          case "student":
            navigate("/student/home");
            break;
          case "teacher":
            navigate("/teacher/home");
            break;
          case "admin":
            navigate("/admin/home");
            break;
          default:
            console.error("Invalid role!");
            break;
        }
      }
    } catch (error) {
      setOpen(true);
      setLoading(false);
    }
  };

  return (
    <>
      <main className="w-full h-screen grid grid-cols-1 md:grid-cols-[2fr_2fr]">
        {/* left column */}
        <div className="hidden md:block bg-purple-200/10 px-16">
          <div className="flex items-center gap-2 mt-10">
            <img src="./images/logo.png" alt="" className="w-20 h-20" />
            <div className="text-left text-gray-800">
              <h3 className="font-bold text-lg">
                Malasiqui Adventist School, Inc.
              </h3>
              <p className="font-medium text-1xl">Malasiqui, Pangasinan</p>
            </div>
          </div>
          <div className="mt-14 flex flex-col gap-5 ">
            <h1 className="font-bold text-6xl text-gray-900 tracking-wider">
              Welcome to
            </h1>
            <h1 className="font-bold text-6xl text-purple-700 tracking-wider">
              Gamified E-
            </h1>
            <h1 className="font-bold text-6xl text-purple-700 tracking-wider">
              Learning
            </h1>
            <h1 className="font-bold text-6xl text-purple-700 tracking-wider">
              Platform
            </h1>
          </div>
        </div>

        {/* right column */}
        <div className="bg-purple-700 flex flex-col items-center md:rounded-l-2xl">
          {/* School Logo and Location (visible on mobile) */}
          <div className="md:hidden flex items-center gap-2 mt-10 text-gray-200">
            <img src="./images/logo.png" alt="" className="w-16 h-16" />
            <div className="text-left">
              <h3 className="font-bold text-lg">
                Malasiqui Adventist School, Inc.
              </h3>
              <p className="text-sm">Malasiqui, Pangasinan</p>
            </div>
          </div>

          <div className="w-[90%] md:w-[69vh] flex flex-col justify-center items-center gap-4 bg-gray-50 mt-20 md:mt-40 px-5 pt-8 pb-10 rounded-md shadow-2xl">
            <div className="self-start text-left ml-3">
              <h1 className="font-semibold text-2xl text-purple-400">
                Welcome Back!
              </h1>
              <p className="text-gray-700 mt-2">Login your Account</p>
            </div>
            <form
              onSubmit={handleLogin}
              className="w-full flex flex-col items-center gap-3 mt-2"
            >
              <div className="w-full">
                <Input
                  color="purple"
                  icon={<FaUser />}
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="w-full">
                <Input
                  color="purple"
                  icon={<FaLock />}
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                loading={loading}
                className="w-full flex justify-center items-center mt-4"
                color="purple"
                variant="gradient"
                type="submit"
              >
                <p>Login</p>
              </Button>
            </form>
          </div>
        </div>
        <Alert
          open={open}
          onClose={() => setOpen(false)}
          color="red"
          className="fixed top-5 right-5 w-72"
          animate={{ mount: { x: 0 }, unmount: { x: 50 } }}
        >
          Wrong Credentials!
        </Alert>
      </main>
    </>
  );
}

export default LoginPage;

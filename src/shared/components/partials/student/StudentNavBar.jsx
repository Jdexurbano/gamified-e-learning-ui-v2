import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import {
  FaChartColumn,
  FaClipboardList,
  FaGamepad,
  FaArrowRightFromBracket,
  FaBook,
  FaFilm,
} from "react-icons/fa6";
function StudentNavBar() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const links = [
    {
      name: "Activities",
      route: "/student/home",
      icon: <FaGamepad size={24} color="white" />,
    },
    {
      name: "Announcements",
      route: "/student/announcement",
      icon: <FaClipboardList size={24} color="white" />,
    },
    {
      name: "Activity History",
      route: "/student/history",
      icon: <FaChartColumn size={24} color="white" />,
    },
    {
      name: "Lessons",
      route: "/student/lessons",
      icon: <FaBook size={24} color="white" />,
    },
    {
      name: "Videos",
      route: "/student/videos",
      icon: <FaFilm size={24} color="white" />,
    },
  ];
  return (
    <>
      <div className="h-full px-2 py-4 bg-purple-700">
        <div className="flex flex-col gap-2 items-center">
          <img
            src="../images/logo.png"
            alt=""
            className="w-32 h-w-32 rounded-full border-2 border-gray-50"
          />
          <div className="text-center text-gray-50">
            <p className="font-semibold text-lg"></p>
            <p>Student</p>
          </div>
        </div>

        <ul className=" flex flex-col justify-center gap-5 mt-3">
          {links.map((data, index) => {
            return (
              <Link to={data.route} key={index}>
                <li
                  className={`flex items-center gap-3 px-5 py-2 rounded-lg hover:bg-[#FFFFFF80] ${
                    location.pathname.startsWith(data.route)
                      ? "bg-[#FFFFFF80]"
                      : ""
                  } `}
                >
                  {data.icon}

                  <p className="font-normal text-gray-50">{data.name}</p>
                </li>
              </Link>
            );
          })}

          <li
            onClick={handleNavigate}
            className="cursor-pointer flex items-center gap-3 px-5 py-2 rounded-lg hover:bg-[#FFFFFF80]"
          >
            <FaArrowRightFromBracket size={24} color="white" />
            <p className="font-normal text-gray-50">Logout</p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default StudentNavBar;

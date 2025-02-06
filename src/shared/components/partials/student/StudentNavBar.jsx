import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";

function StudentNavBar() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const links = [
    {
      name: "Courses",
      route: "/student/home",
    },
    {
      name: "Announcements",
      route: "/student/announcement",
    },
    {
      name: "Activity History",
      route: "/student/history",
    },
  ];
  return (
    <>
      <nav className=" bg-purple-700  flex items-center justify-between px-20">
        <img src="../images/logo.png" alt="" className="w-20 h-w-20" />

        <ul className="flex items-center justify-evenly gap-10">
          {links.map((data, index) => {
            return (
              <Link key={index} to={data.route}>
                <li
                  className={`font-semibold text-base w-44 py-2 px-3 text-center rounded-md text-white hover:bg-[#FFFFFF80] ${
                    location.pathname.startsWith(data.route)
                      ? "bg-[#FFFFFF80]"
                      : ""
                  }`}
                >
                  {data.name}
                </li>
              </Link>
            );
          })}
        </ul>
        <Button variant="gradient" color="white" onClick={handleNavigate}>
          <p className="text-purple-700">Logout</p>
        </Button>
      </nav>
    </>
  );
}

export default StudentNavBar;

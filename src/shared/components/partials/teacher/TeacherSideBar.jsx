import { Link, useNavigate } from "react-router-dom";
import {
  FaHouse,
  FaUserGroup,
  FaClipboardList,
  FaGamepad,
  FaArrowRightFromBracket,
  FaBook,
} from "react-icons/fa6";

function TeacherSideBar() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  console.log(location.pathname);
  const link = [
    {
      name: "Home",
      icon: <FaHouse size={24} color="white" />,
      route: "/teacher/home",
    },
    {
      name: "Student List",
      icon: <FaUserGroup size={24} color="white" />,
      route: "/teacher/student",
    },

    {
      name: "Announcements",
      icon: <FaClipboardList size={24} color="white" />,
      route: "/teacher/announcement",
    },
    {
      name: "Activities",
      icon: <FaGamepad size={24} color="white" />,
      route: "/teacher/courses",
    },
    {
      name: "Lessons",
      icon: <FaBook size={24} color="white" />,
      route: "/teacher/lessons",
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
            <p className="font-semibold text-lg">Anna B. Sancho</p>
            <p>Teacher</p>
          </div>
        </div>

        <ul className=" flex flex-col justify-center gap-5 mt-3">
          {link.map((data, index) => {
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

export default TeacherSideBar;

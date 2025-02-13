import StudentCourseCard from "../../../components/student/courses/StudentCourseCard";
import StartGameModal from "../../../components/student/courses/StartGameModal";
import { useState, useEffect } from "react";
import axios from "axios";
import { PORT } from "../../../utils/constant";
function StudentHomePage() {
  const [course, setCourses] = useState([]);
  // const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  // const handleOpen = (data) => {
  //   setName(data.name);
  //   setDescription(data.description);
  //   setCode(data.code);
  //   setOpen(!open);
  // };
  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${PORT}/games`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCourses(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <>
      <main
        className="w-full max-w-screen-xl mx-auto px-4 py-10 overflow-y-auto"
        style={{ scrollbarWidth: "none" }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-purple-700 mb-6">
          Activities
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {course.map((data) => {
            return (
              <StudentCourseCard
                key={data.id}
                data={data}
                // handleOpen={handleOpen}
              />
            );
          })}
        </div>
      </main>
    </>
  );
}

export default StudentHomePage;

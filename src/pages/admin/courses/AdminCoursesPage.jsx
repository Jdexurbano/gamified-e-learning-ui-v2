import CourseCard from "../../../components/teacher/courses/CourseCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { PORT } from "../../../utils/constant";

function AdminCoursesPage() {
  const [course, setCourses] = useState([]);

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
          Courses
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {course.map((data) => {
            return (
              <CourseCard
                key={data.id}
                data={data}
                id={data.id}
                fetchCourses={fetchCourses}
              />
            );
          })}
        </div>
      </main>
    </>
  );
}

export default AdminCoursesPage;

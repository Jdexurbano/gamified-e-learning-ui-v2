import { useEffect, useState } from "react";
import axios from "axios";
import { PORT } from "../../../utils/constant";
import StudentLessonCard from "../../../components/student/lessons/StudentLessonCard";
function StudentLessonsPage() {
  const [lessons, setLessons] = useState([]);

  const fetchLessons = async () => {
    try {
      const response = await axios.get(`${PORT}/student/lessons`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLessons(response.data);
      //   console.log(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);
  return (
    <>
      <main
        className="w-full max-w-screen-xl mx-auto px-4 py-10 overflow-y-auto"
        style={{ scrollbarWidth: "none" }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-purple-700 mb-6">
          Lessons
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {lessons.map((data) => (
            <StudentLessonCard key={data.id} data={data} />
          ))}
        </div>
      </main>
    </>
  );
}

export default StudentLessonsPage;

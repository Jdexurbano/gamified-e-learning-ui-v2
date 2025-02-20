import axios from "axios";
import { PORT } from "../../../utils/constant";
import { useEffect, useState } from "react";
import TeacherLessonCard from "../../../components/teacher/lessons/TeacherLessonCard";
import { FaBook } from "react-icons/fa6";
import { Button, Alert } from "@material-tailwind/react";
import TeacherAddLessonModal from "../../../components/teacher/lessons/TeacherAddLessonModal";
function TeacherLessonsPage() {
  const [lessons, setLessons] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [openAlert, setOpenAlert] = useState(false);
  const fetchLessons = async () => {
    try {
      const response = await axios.get(`${PORT}/lessons`, {
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
        <div className=" flex justify-between items-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-purple-700">
            Videos
          </h1>

          <Button
            size="sm"
            className="flex items-center gap-2 rounded-md bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 shadow-md transition-all duration-300"
            onClick={handleOpen}
          >
            <FaBook size={18} />
            Add Videos
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {lessons.map((data) => {
            return (
              <TeacherLessonCard
                key={data.id}
                data={data}
                fetchLessons={fetchLessons}
                id={data.id}
              />
            );
          })}
        </div>
        <TeacherAddLessonModal
          open={open}
          handleOpen={handleOpen}
          fetchLessons={fetchLessons}
          setOpenAlert={setOpenAlert}
        />

        <Alert
          open={openAlert}
          onClose={() => setOpenAlert(false)}
          color="light-green"
          className="fixed top-5 right-5 w-72"
          animate={{ mount: { x: 0 }, unmount: { x: 50 } }}
        >
          Lesson has been added successfully!
        </Alert>
      </main>
    </>
  );
}

export default TeacherLessonsPage;

import { Outlet } from "react-router-dom";
import TeacherSideBar from "../../partials/teacher/TeacherSideBar";
function TeacherLayout() {
  return (
    <>
      <div className="grid grid-cols-[1fr_4fr] h-screen">
        <TeacherSideBar />
        <Outlet />
      </div>
    </>
  );
}

export default TeacherLayout;

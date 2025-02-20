import React from "react";
import { Outlet } from "react-router-dom";
import StudentNavBar from "../../partials/student/StudentNavBar";
function StudentLayout() {
  return (
    <>
      <main className="grid grid-cols-[1fr_4fr] h-screen">
        <StudentNavBar />
        <Outlet />
      </main>
    </>
  );
}

export default StudentLayout;

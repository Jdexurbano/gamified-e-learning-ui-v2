import React from "react";
import { Outlet } from "react-router-dom";
import StudentNavBar from "../../partials/student/StudentNavBar";
function StudentLayout() {
  return (
    <>
      <main className="w-full h-screen">
        <StudentNavBar />
        <Outlet />
      </main>
    </>
  );
}

export default StudentLayout;

import { Outlet } from "react-router-dom";
import AdminSideBar from "../../partials/admin/AdminSideBar";

function AdminLayout() {
  return (
    <>
      <div className="grid grid-cols-[1fr_4fr] h-screen">
        <AdminSideBar />
        <Outlet />
      </div>
    </>
  );
}

export default AdminLayout;

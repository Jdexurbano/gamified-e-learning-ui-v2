import { Card, Typography, Button, Alert } from "@material-tailwind/react";
import { FaUserPlus } from "react-icons/fa6";
import { useState, useEffect } from "react";
import axios from "axios";
import { PORT } from "../../../utils/constant";
import AddTeacherModal from "../../../components/admin/teacher_list/AddTeacherModal";
import UpdateTeacherModal from "../../../components/admin/teacher_list/UpdateTeacherModal";
import DeleteTeacherModal from "../../../components/admin/teacher_list/DeleteTeacherModal";
function AdminTeacherListPage() {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openUpdateAlert, setOpenUpdateAlert] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const handleOpen = () => setOpen(!open);
  const TABLE_HEAD = ["First Name", "Last Name", "ID", "Address", ""];
  const [teachers, setTeachers] = useState([]);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(`${PORT}/teachers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setTeachers(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchTeachers();
  }, []);
  return (
    <>
      <main className="px-6 pt-8">
        {/* Add Teacher Button */}
        <Button
          size="sm"
          className="flex items-center gap-2 rounded-md bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 shadow-md transition-all duration-300"
          onClick={handleOpen}
        >
          <FaUserPlus size={18} />
          Add Teacher
        </Button>

        {/* Table Card */}
        <Card className="w-full overflow-y-auto max-h-[30rem] mt-4 shadow-lg rounded-xl">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr className="bg-purple-600 text-white">
                {[
                  "First Name",
                  "Last Name",
                  "Student No.",
                  "Address",
                  "Actions",
                ].map((head) => (
                  <th key={head} className="p-4 text-center font-semibold">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teachers.map((data, index) => (
                <tr
                  key={index}
                  className="even:bg-gray-100 hover:bg-purple-50 transition duration-200 text-center"
                >
                  <td className="p-4">
                    <Typography
                      variant="small"
                      className="text-gray-700 font-medium"
                    >
                      {data.first_name}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      className="text-gray-700 font-medium"
                    >
                      {data.last_name}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      className="text-gray-700 font-medium"
                    >
                      {data.student_No}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      className="text-gray-700 font-medium"
                    >
                      {data.address}
                    </Typography>
                  </td>
                  <td className="p-2 flex items-center justify-center gap-3">
                    <UpdateTeacherModal
                      data={data}
                      fetchTeachers={fetchTeachers}
                      id={data.id}
                      setOpenUpdateAlert={setOpenUpdateAlert}
                    />
                    <DeleteTeacherModal
                      id={data.id}
                      fetchTeachers={fetchTeachers}
                      setOpenDeleteAlert={setOpenDeleteAlert}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Add Teacher Modal */}
        <AddTeacherModal
          open={open}
          handleOpen={handleOpen}
          fetchTeachers={fetchTeachers}
          setOpenAlert={setOpenAlert}
        />

        {/* Alerts */}
        <Alert
          open={openAlert}
          onClose={() => setOpenAlert(false)}
          color="light-green"
          className="fixed top-5 right-5 w-72 shadow-lg"
        >
          Teacher has been added successfully!
        </Alert>

        <Alert
          open={openUpdateAlert}
          onClose={() => setOpenUpdateAlert(false)}
          color="light-green"
          className="fixed top-5 right-5 w-72 shadow-lg"
        >
          Updates were successful!
        </Alert>

        <Alert
          open={openDeleteAlert}
          onClose={() => setOpenDeleteAlert(false)}
          color="red"
          className="fixed top-5 right-5 w-72 shadow-lg"
        >
          Teacher has been deleted successfully!
        </Alert>
      </main>
    </>
  );
}

export default AdminTeacherListPage;
